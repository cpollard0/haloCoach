/**
 * Created by Chris on 7/10/16.
 */

import {ArenaStatsArenaResultClass} from './arenaStats.Results.Result.model';
export class ArenaStatsResultsClass {
  Id:string;
  ResultCode:number;
  Result: ArenaStatsArenaResultClass;
  constructor() {
  }

  deserialize(input) {

    this.Id = input.Id;
    this.ResultCode = input.ResultCode;
    this.Result = input.Result.map(function (x) {
        return new ArenaStatsArenaResultClass().deserialize(x);
      }
    );
    return this;
  }
}
