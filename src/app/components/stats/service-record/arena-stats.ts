/**
 * Created by Chris on 7/6/16.
 */
/**
 * Created by Chris on 7/5/16.
 */
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
import {Observable} from 'rxjs/Observable';
import {SeasonDropdown} from '../../metadata/season-dropdown/season-dropdown';
import {ArenaStatsClass} from '../../../model/arenaStats.model';
import {ArenaPlaylistStats} from '../../../model/arenaStats.Results.Result.ArenaStats.ArenaPlaylistStats.model'

@Component({
  selector: 'arena-stats',
  pipes: [],
  providers: [Halo5API],
  directives: [ ROUTER_DIRECTIVES,SeasonDropdown ],
  templateUrl: './arena-stats.html',
})


export class ArenaStats{
  public arenaStats : ArenaStatsClass;
  //public playlistStats : Array<ArenaPlaylistStats>;

  public playlistStats:ArenaPlaylistStats[];
  constructor(public haloAPI: Halo5API) {};
  ngOnInit() {
    this.makeAPICall("MrPierceClayton","");
  }

  makeAPICall(playerName:string,seasonFilter:string) {
    //this.haloAPI.getSeasonMetadata();
    this.haloAPI.getArenaRecord(playerName,seasonFilter)
      .subscribe(
        // the first argument is a function which runs on success
        data => { this.arenaStats = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () =>
        {
          var plist = this.arenaStats.Results[0].Result.ArenaStats.ArenaPlaylistStats.map(function (x) {
              return new ArenaPlaylistStats().deserialize(x);
            }
          );
          /*var test = this.arenaStats.Results.map(function (x){
           return new ArenaStatsClass().deserialize(x);
           });*/
          console.log(plist);
          //  console.log(this.arenaStats.Results[0].Result.ArenaStats[0].ArenaPlaylistStats);
          this.playlistStats = plist;
        }
      );
  };


  seasonChanged($event,val)
  {
    this.makeAPICall("MrPierceClayton",$event.target.value.substring(3));
    //Todo: change this from a hacky substring to just get the value
  }
}

