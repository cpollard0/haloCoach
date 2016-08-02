/**
 * Created by Chris on 7/10/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
//import {FilterPipe} from '../../../filters/playerFilter'
import {Injectable, Pipe, PipeTransform} from '@angular/core';

import {MatchEvent} from '../../../model/matchEvent.model'
import {Weapon} from '../../../model/Weapon.model'
import {PlayerEvents} from '../../../model/PlayerEvents.model'
import {WorldLocation} from '../../../model/WorldLocation.model'

@Pipe({
  name: 'filterByPlayer'
})
class filterByPlayer implements PipeTransform {
  transform(value:any, args:string[]):any {
    if (args[0] == args[Object.keys(args).toString()] || args[Object.keys(args).toString()] === '0: undefined') {
      return value;
    }
    let filter = args;

    if (filter && Array.isArray(value)) {
      let filterKeys = Object.keys(args);
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
        memo && (item[keyName] === filter[keyName] || (item['Killer'] && item['Killer'] === filter[keyName]) || (item['Victim'] && item['Victim'] === filter[keyName])), true));
    } else {
      return value;
    }
  }
}

@Pipe({
  name: 'convertMatchTime'
})
class convertMatchTime implements PipeTransform {
  transform(value:string):any {
    var seconds;
    var minutes;
    var time;
    if (value.indexOf('M') != -1) {
      seconds = value.substring(value.indexOf('M') + 1, value.indexOf('S') + 1);
      minutes = value.substring(value.indexOf('PT') + 2, value.indexOf('M'));
      seconds = parseFloat(seconds).toFixed(2);
      if (seconds < 10) seconds = '0' + seconds;
      time = minutes + ':' + seconds;
    }
    else {
      seconds = value.substring(value.indexOf('PT') + 2, value.indexOf('S'));
      time = parseFloat(seconds).toFixed(2);
    }
    return (time);
  }
}
@Pipe({
  name: 'filterByEvent'
})
class filterByEvent implements PipeTransform {
  transform(value:any, args:string[]):any {
    if (args[0] == args[Object.keys(args).toString()] || args[Object.keys(args).toString()] === '0: undefined') {
      return value;
    }
    let filter = args;

    if (filter && Array.isArray(value)) {
      let filterKeys = Object.keys(args);
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
        memo && (item[keyName] === filter[keyName]), true));
    } else {
      return value;
    }
  }
}

@Component({
  selector: 'match-events',
  pipes: [filterByPlayer, filterByEvent, convertMatchTime],
  providers: [Halo5API],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './match-events.html',
})

export class MatchEvents {

  constructor(public haloAPI:Halo5API) {
  };

  public EventTypes:Array<String>;
  public Weapons:Array<Weapon>;
  public GameEvents:Array<MatchEvent>;
  public originalGameEvents:Array<MatchEvent>;
  public killsDeaths:Array<MatchEvent>;
  public playerMatchEvents:Array<PlayerEvents>;

  public playerEvents:Array<String>;
  public matchEventTypes:Array<String>;

  makeAPICall(matchId:string) {
    this.haloAPI.getMatchEvents(matchId)
      .subscribe(
        // the first argument is a function which runs on success
        data => {

          this.GameEvents = data.GameEvents.map(function (x) {
              return new MatchEvent().deserialize(x);
            }
          );
          this.originalGameEvents = this.GameEvents;
        },
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => {
          console.log(this.GameEvents);
          this.haloAPI.getWeapons()
            .subscribe(
              // the first argument is a function which runs on success
              data => {
                this.Weapons = data.map(function (x) {
                  return new Weapon().deserialize(x);
                });
              },
              // the second argument is a function which runs on error
              err => console.error(err),
              // the third argument is a function which runs on completion
              () => {
                this.addWeaponToEvent();
                //this.analyzePlayerMatch("MrPierceClayton");
                //this.getDeathStreak("MrPierceClayton");
                this.playerEvents = this.getDistinctPlayers();
                this.matchEventTypes = this.getDistinctEvents();
              }
            );
        }
      );

  };

  ngOnInit() {
    this.makeAPICall("");

  }

  addWeaponToEvent() {
    this.GameEvents.forEach(s=> {
      if (!s.WeaponStockId) {
      } else {
        s.WeaponName = this.getWeaponNameById(s.WeaponStockId);
      }
      if (!s.KillerWeaponStockId) {
      } else {
        //console.log(s.KillerWeaponStockId);
        s.KillerWeaponName = this.getWeaponNameById(s.KillerWeaponStockId);
      }
    });
    console.log(this.GameEvents);
  }

  getWeaponNameById(weapId:number) {
    //console.log(weapId);
    let result = this.Weapons.filter(item => item.id == weapId)[0];
    if (result == null) {
      return 'Unknown after search';
    }
    else
      return result.name;

  };

  //Gets a list of distinct players in a match; everyone should have at least spawns
  //ToDo: Figure out why I have to return an array and can't just set final values in here
  public getDistinctPlayers() {
    var distinctPlayersArray = [];
    //distinctPlayersArray.push("All Players");
    var distinctPlayers = {};
    var newPlaces = this.GameEvents.filter(function (entry) {
      if (entry.Player == null)
        return false;
      if (distinctPlayers[entry.Player]) {
        return false;
      }
      distinctPlayers[entry.Player] = true;
      distinctPlayersArray.push(entry.Player);
      return true;
    });
    return (distinctPlayersArray);
  }


  public getDistinctEvents() {
    var distinctEventsArray = [];
    //distinctEventsArray.push("All Events");
    var distinctEvents = {};
    var newPlaces = this.GameEvents.filter(function (entry) {
      if (entry.EventName == null)
        return false;
      if (distinctEvents[entry.EventName]) {
        return false;
      }
      distinctEvents[entry.EventName] = true;
      distinctEventsArray.push(entry.EventName);
      return true;
    });
    distinctEventsArray.sort();
    return (distinctEventsArray);
  }

  /*ToDo:Once I'm able to get all the player filtered, analyze the match.
   Things to look for:
   Quickdeath: You were the first die;
   Awkward Combination: You had the combination of X gun and Y gun at the same time...(i.e. 2 close range, 2
   distance, etc...)
   Distance from Death: You are dying an average of Killer X - Victim X, Killer Y- Victim Y distance
   Running to your death: You spawned and died in less then Y seconds
   Flee the scene of the crime: you died close to when/where you got a kill. Kills attract teammates; flee the scene!
   Lifes no fun when your'e going 2 v 1: lots of your deaths were assisted.
   Not making it far from spawn: You died very close to your spawn point. Spawn deaths happen
   Distance from spawn / time = you ran to your death
   Kill Streaks vs Death Streaks: let's go streaking! stop the bleeding if you get a bunch in a row
   Death from above; having the high ground helps! you died X times when the enemy was higher then you and got Y kills
   DPK - Damage per kills is off; you're not finishing off kills! Figure out how much damage it takes for a single kill
   */
  public analyzePlayerMatch($event) {
    //this.GameEvents = this.originalGameEvents;
    var playerName = $event.target.value.substring(3);
    this.timeBetweenEvents(playerName);
    if (playerName != 'All Players') {

      /*this.GameEvents = this.GameEvents.filter(function (gameEvent) {
       if (
       (gameEvent.Player != null && gameEvent.Player == playerName) ||
       (gameEvent.Killer != null && gameEvent.Killer == playerName) ||
       (gameEvent.Victim != null && gameEvent.Victim == playerName))
       return true;

       }
       );*/
      //console.log(this.GameEvents);
      var currentWeapons = [];
      this.GameEvents.map(function (gameEvent) {
        if (gameEvent.Player != null && gameEvent.Player == playerName) {
          if (gameEvent.EventName == "WeaponPickup") {
            currentWeapons.push(gameEvent.WeaponName);
          }
          if (gameEvent.EventName == "WeaponDrop") {
            currentWeapons = currentWeapons.filter(function (e) {
              return e !== gameEvent.WeaponName
            });

          }
          //console.log(gameEvent.EventName);
          //console.log(currentWeapons);
        }

        if (gameEvent.EventName == "Death" && gameEvent.Victim != null && gameEvent.Victim == playerName) {
          var one = 1;
          // console.log("You died with " + currentWeapons);
        }

      })
    }
  }

  public filterByEventType($event) {
    var eventName = $event.target.value.substring(3);
    this.GameEvents = this.GameEvents.filter(function (gameEvent) {
        if (
          (gameEvent.EventName != null && gameEvent.EventName == eventName))
          return true;

      }
    );


  }

  public getMatchStats(playerName:string) {
    var kills = this.GameEvents.reduce(function (total, o) {
      if (o.Killer != null && o.Killer == playerName)
        return total + 1;
      else return total;
    }, 0);

    var deaths = this.GameEvents.reduce(function (total, o) {
      if (o.Victim != null && o.Victim == playerName)
        return total + 1;
      else return total;
    }, 0);
    //Todo: Figure out how to get assists; a death may have multiple assistants
    return ("Kills: " + kills + " Deaths: " + deaths + " Assists: figureout")
  }

  public getDeathStreak(playerName:string) {

    var currentDeathStreak = 0;
    var currentKillStreak = 0;
    var worstDeathStreak = 0;
    var bestKillStreak = 0;
    var lastWorldLocation = new WorldLocation();

    //first pull out all this users death
    this.killsDeaths = this.GameEvents.filter(function (gameEvent) {
        if (gameEvent.EventName == "Death" && gameEvent.Killer != null && gameEvent.Victim != null && (gameEvent.Killer == playerName || gameEvent.Victim == playerName))
          return true;

      }
    );
    this.killsDeaths.map(function (gameEvent) {
        if (gameEvent.Killer != null && gameEvent.Killer == playerName) {
          currentDeathStreak = 0;
          currentKillStreak = currentKillStreak + 1;
          if (currentKillStreak > bestKillStreak) bestKillStreak = currentKillStreak;
        }
        if (gameEvent.Victim != null && gameEvent.Victim == playerName) {
          currentDeathStreak = currentDeathStreak + 1;
          currentKillStreak = 0;
          if (currentDeathStreak > worstDeathStreak) worstDeathStreak = currentDeathStreak;
        }
        //console.log("Kill Streak: " + currentKillStreak + " Death Streak " + worstDeathStreak);
      }
    );
    return ("Best Kill Streak: " + bestKillStreak + " Worst Death Streak: " + worstDeathStreak);
  }


  public convertTimeSinceStartToNumber(tss:string) {
    var seconds;
    var minutes;
    var time;
    if (tss.indexOf('M') != -1) {
      seconds = tss.substring(tss.indexOf('M') + 1, tss.indexOf('S') + 1);
      minutes = tss.substring(tss.indexOf('PT') + 2, tss.indexOf('M'));
      time = parseFloat(minutes) * 60 + parseFloat(seconds);
    }
    else {
      seconds = tss.substring(tss.indexOf('PT') + 2, tss.indexOf('S'));
      time = parseFloat(seconds).toFixed(2);
    }
    return parseFloat(time).toFixed(2);
  }

  public timeBetweenEvents(playerName:string) {
    this.GameEvents[0].TimeBetweenEvents = 0;
    this.GameEvents[0].TimeSinceSpawn = 0;
    var spawnTime = this.convertTimeSinceStartToNumber(this.GameEvents[0].TimeSinceStart);
    for (var i = 1; i < this.GameEvents.length; i++) {
      if (
        (this.GameEvents[i].Killer != null && this.GameEvents[i].Killer == playerName) ||
        (this.GameEvents[i].Victim != null && this.GameEvents[i].Victim == playerName) ||
        (this.GameEvents[i].Player != null && this.GameEvents[i].Player == playerName)
      ) {
        if (this.GameEvents[i].EventName == "PlayerSpawn") {
          spawnTime = this.convertTimeSinceStartToNumber(this.GameEvents[i].TimeSinceStart);
        }

        this.GameEvents[i].TimeSinceSpawn = (this.convertTimeSinceStartToNumber(this.GameEvents[i].TimeSinceStart) - spawnTime).toPrecision(2);

        this.GameEvents[i].TimeBetweenEvents = (this.convertTimeSinceStartToNumber(this.GameEvents[i].TimeSinceStart) - this.convertTimeSinceStartToNumber(this.GameEvents[i - 1].TimeSinceStart)).toPrecision(2)

      }
    }
  }

}
