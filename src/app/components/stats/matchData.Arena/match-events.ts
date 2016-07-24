/**
 * Created by Chris on 7/10/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
import {MatchEvent} from '../../../model/matchEvent.model'
import {Weapon} from '../../../model/Weapon.model'
import {PlayerEvents} from '../../../model/PlayerEvents.model'
import {WorldLocation} from '../../../model/WorldLocation.model'
import {filterPip} from '../../../PipeFilter'

@Component({
  selector: 'match-events',
  pipes: [],
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
  public killsDeaths:Array<MatchEvent>;
  public playerMatchEvents:Array<PlayerEvents>;

  public playerEvents:Array<String>;

  makeAPICall(matchId:string) {
    this.haloAPI.getMatchEvents(matchId)
      .subscribe(
        // the first argument is a function which runs on success
        data => {

          this.GameEvents = data.GameEvents.map(function (x) {
              return new MatchEvent().deserialize(x);
            }
          );
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
                this.analyzePlayerMatch("MrPierceClayton");
                this.getDeathStreak("MrPierceClayton");
                this.playerEvents = this.getDistinctPlayers();
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
    distinctPlayersArray.push("All Players");
    var distinctPlayers = {};
    var newPlaces = this.GameEvents.filter(function (entry) {
      if (entry.Player == null)
        return false;
      if (distinctPlayers[entry.Player.Gamertag]) {
        return false;
      }
      distinctPlayers[entry.Player.Gamertag] = true;
      distinctPlayersArray.push(entry.Player.Gamertag);
      return true;
    });
    return (distinctPlayersArray);
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
  public analyzePlayerMatch(playerName:string) {
    var currentWeapons = [];
    this.GameEvents.map(function (gameEvent) {
      if (gameEvent.Player != null && gameEvent.Player.Gamertag == playerName) {
        if (gameEvent.EventName == "WeaponPickup") {
          currentWeapons.push(gameEvent.WeaponName);
        }
        if (gameEvent.EventName == "WeaponDrop") {
          currentWeapons = currentWeapons.filter(function (e) {
            return e !== gameEvent.WeaponName
          });

        }
        console.log(gameEvent.EventName);
        console.log(currentWeapons);
      }

      if (gameEvent.EventName == "Death" && gameEvent.Victim != null && gameEvent.Victim.Gamertag == playerName) {
        console.log("You died with " + currentWeapons);
      }
    })
  }


  getDeathStreak(playerName:string) {
    var currentDeathStreak = 0;
    var currentKillStreak = 0;
    var lastWorldLocation = new WorldLocation();

    //first pull out all this users death
    //ToDo: figure out why this gives me an error in the console
    this.killsDeaths = this.GameEvents.filter(function (gameEvent) {
        if (gameEvent.EventName == "Death" && gameEvent.Killer != null && gameEvent.Victim != null && (gameEvent.Killer.Gamertag == playerName || gameEvent.Victim.Gamertag == playerName))
          return gameEvent;

      }
    );

    console.log(this.killsDeaths);
    this.killsDeaths.map(function (gameEvent) {
        if (gameEvent.Killer != null && gameEvent.Killer.Gamertag == playerName) {
          currentDeathStreak = 0;
          currentKillStreak = currentKillStreak + 1;
        }
        if (gameEvent.Victim != null && gameEvent.Victim.Gamertag == playerName) {
          currentDeathStreak = currentDeathStreak + 1;
          currentKillStreak = 0;
        }
        //console.log("Kill Streak: " + currentKillStreak + " Death Streak " + currentDeathStreak)
      }
    )
  }
}
