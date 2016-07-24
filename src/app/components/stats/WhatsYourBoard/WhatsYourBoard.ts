/**
 * Created by Chris on 7/18/16.
 * Looking at your last 100 games, how do you do on each board?
 */
import {Component, Pipe, PipeTransform} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
import {Observable} from 'rxjs/Observable';
import {SeasonDropdown} from '../../metadata/season-dropdown/season-dropdown';
import {MatchOverview} from '../../../model/MatchOverview.model'
import {MapStats} from '../../../model/MapStats.model';
import {MapMetadata} from '../../../model/MapMetadata.model';

@Component({
  selector: 'whats-your-board',
  pipes: [],
  providers: [Halo5API],
  directives: [ROUTER_DIRECTIVES, SeasonDropdown],
  templateUrl: './WhatsYourBoard.html',
})


export class WhatsYourBoard {
  public pMatchOver:Array<MatchOverview>;
  private totalRecords:number = 75;
  public mapStats:MapStats;
  public MapData:Array<MapMetadata>;
  public mapStatsArray:Array<MapStats>;

  constructor(public haloAPI:Halo5API) {
  };

  ngOnInit() {
    this.getMapMetadata();
    this.getMatchData("MrPierceClayton", "", 1, 25);
  }

  private getMapMetadata() {
    this.haloAPI.getMapData()
      .subscribe
      (
        data => {

          this.MapData = data.map(function (x) {
            return new MapMetadata().deserialize(x);
          });
        },
        err => console.error(err),
        () => {
          console.log(this.MapData);
        }
      )
  }
  //ToDo: Get last 100 games, group by board, show stats by board (best game/worst game/average game)
  getMatchData(playerName:string, seasonFilter:string, startCount:number, endCount:number) {
    //this.haloAPI.getSeasonMetadata();
    this.haloAPI.getMatchesForPlayer(playerName, "arena", startCount, endCount)
      .subscribe(
        // the first argument is a function which runs on success
        data => {

          var results = data.Results.map(function (x) {
              return new MatchOverview().deserialize(x);
            }
          );
          //this.pMatchOver.push.apply(this.pMatchOver,results);
          //this.pMatchOver = results;
          // console.log(results);
          if (this.pMatchOver != null) {
            this.pMatchOver.push.apply(this.pMatchOver, data.Results.map(function (x) {
                return new MatchOverview().deserialize(x);
              }
            ));
          }
          else {
            this.pMatchOver = data.Results.map(function (x) {
                return new MatchOverview().deserialize(x);
              }
            );
          }
          //this.pMatchOver.push(results);
        },
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => {
          if (endCount < this.totalRecords) {
            this.getMatchData(playerName, seasonFilter, startCount + 25, endCount + 25);
          }
          else {

            this.getDistinctMaps();
          }
          //this.getDistinctMaps();
        }
      );
  };

  public getDistinctMaps() {
    var distinctMapArray = [];
    var distinctMaps = {};
    this.pMatchOver.filter(function (entry) {
      if (entry.MapId == null)
        return false;
      if (distinctMaps[entry.MapId]) {
        return false;
      }
      distinctMaps[entry.MapId] = true;
      distinctMapArray.push(entry.MapId);
      return true;
    });
    var highestKills = 0;
    var leastKills = 0;
    var mostDeaths = 0;
    var bestKDSpread = 0;
    var matchEvents;
    var totalGames = 0;
    var avgKDSpread = 0;
    var totalKills = 0;
    var totalDeaths = 0;

    var mpArrLocal = new Array<MapStats>();

    this.mapStatsArray = mpArrLocal;
    distinctMapArray.forEach(
      function (matchId) {
        matchEvents = this.pMatchOver.filter(function (gameEvent) {
            if (gameEvent.MapId == matchId)
              return gameEvent.TotalKills;

          }
        );
        //this.mapStats.MapId = matchId;

        var mpLocal = new MapStats(matchId);
        mpLocal.MostKills = Math.max.apply(Math, matchEvents.map(function (o) {
          return o.TotalKills;
        }));
        mpLocal.LeastKills = Math.min.apply(Math, matchEvents.map(function (o) {
          return o.TotalKills;
        }));

        mpLocal.MostDeaths = Math.max.apply(Math, matchEvents.map(function (o) {
          return o.TotalDeaths;
        }));
        mpLocal.LeastDeaths = Math.min.apply(Math, matchEvents.map(function (o) {
          return o.TotalDeaths;
        }));

        mpLocal.BestKDSpread = Math.max.apply(Math, matchEvents.map(function (o) {
          return o.TotalKills - o.TotalDeaths;
        }));
        mpLocal.WorstKDSpread = Math.min.apply(Math, matchEvents.map(function (o) {
          return o.TotalKills - o.TotalDeaths;
        }));

        mpLocal.TotalKills = matchEvents.reduce(function (total, o) {
          return total + o.TotalKills;
        }, 0);
        mpLocal.TotalDeaths = matchEvents.reduce(function (total, o) {
          return total + o.TotalDeaths;
        }, 0);
        mpLocal.TotalMatches = matchEvents.length;
        mpLocal.TotalWins = matchEvents.reduce(function (total, o) {
          if (o.Result == 3)
            return total + 1;
          else return total;
        }, 0);
        mpLocal.MapName = this.MapData.filter(item => item.contentId == matchId)[0];
        console.log(matchEvents);
        mpArrLocal.push(mpLocal);
        //mapRcd.mapId = matchOutcome;
        //mapRcd.wins = 5;
      }
      , this);
    this.mapStatsArray = mpArrLocal;
    console.log(mpArrLocal);
  }

}

