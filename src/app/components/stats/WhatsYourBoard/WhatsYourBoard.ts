/**
 * Created by Chris on 7/18/16.
 * Looking at your last 100 games, how do you do on each board?
 */
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
import {Observable} from 'rxjs/Observable';
import {SeasonDropdown} from '../../metadata/season-dropdown/season-dropdown';
import {MatchOverview} from '../../../model/MatchOverview.model'
@Component({
  selector: 'whats-your-board',
  pipes: [],
  providers: [Halo5API],
  directives: [ROUTER_DIRECTIVES, SeasonDropdown],
  templateUrl: './WhatsYourBoard.html',
})


export class WhatsYourBoard {
  public pMatchOver:Array<MatchOverview>;

  constructor(public haloAPI:Halo5API) {
  };

  ngOnInit() {
    this.makeAPICall("MrPierceClayton", "");
  }

  //ToDo: Get last 100 games, group by board, show stats by board (best game/worst game/average game)
  makeAPICall(playerName:string, seasonFilter:string) {
    //this.haloAPI.getSeasonMetadata();
    this.haloAPI.getMatchesForPlayer(playerName, "arena", 1, 25)
      .subscribe(
        // the first argument is a function which runs on success
        data => {
          console.log(data.Results);
          this.pMatchOver = data.Results.map(function (x) {
              return new MatchOverview().deserialize(x);
            }
          );
          console.log(data.Results[0].MapId);
          console.log(data.Results[0].Players[0].Rank);
          console.log(this.pMatchOver);
        },
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => {
          this.getDistinctMaps();
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
    console.log(distinctMaps);
    console.log(distinctMapArray);
    return (distinctMapArray);
  }

}

