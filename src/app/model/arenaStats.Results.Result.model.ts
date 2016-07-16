/**
 * Created by Chris on 7/10/16.
 */

import {PlayerClass} from './player.model';
import {ArenaStatsClass} from './arenaStats.Results.Result.ArenaStats.model';

export class ArenaStatsArenaResultClass {

  SpartanRank:number;
  XP:number;
  PlayerId:PlayerClass;
  ArenaStats:Array<ArenaStatsClass>;
  constructor() {

  }


  deserialize(input) {

    this.SpartanRank = input.SpartanRank;
    this.XP = input.XP;
    this.ArenaStats = input.ArenaStats.map(function (x) {
        return new ArenaStatsClass().deserialize(x);
      }
    );
    return this;
  }
}
