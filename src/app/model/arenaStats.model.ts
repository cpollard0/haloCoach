/**
 * Created by Chris on 7/6/16.
 */


import {ArenaStatsResultsClass} from './arenaStats.Results.model';

export class ArenaStatsClass {
  Results:Array<ArenaStatsResultsClass>;
  constructor() {
  }

  deserialize(input) {

    this.Results = input.Results.map(function (x) {
        return new ArenaStatsResultsClass().deserialize(x);
      }
    );
    return this;
  }
}
