/**
 * Created by Chris on 7/16/16.
 */
import {ArenaPlaylistStats} from './arenaStats.Results.Result.ArenaStats.ArenaPlaylistStats.model';

export class ArenaStatsClass {
  TotalAssists:string;
  TotalGamesWon:number;
  ArenaPlaylistStats:Array<ArenaPlaylistStats>;

  constructor() {
  }

  deserialize(input) {

    this.TotalAssists = input.TotalAssists;
    this.TotalGamesWon = input.TotalGamesWon;
    this.ArenaPlaylistStats = input.ArenaPlaylistStats.map(function (x) {
        return new ArenaPlaylistStats().deserialize(x);
      }
    );
    return this;
  }
}
