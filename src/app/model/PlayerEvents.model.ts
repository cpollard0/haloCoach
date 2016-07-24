/**
 * Created by Chris on 7/17/16.
 */

import {MatchEvent} from './matchEvent.model'

export class PlayerEvents {
  PlayerName:string;
  PlayerEvent:Array<MatchEvent>;

  constructor(pName?:string) {
    this.PlayerName = pName;
  }
}
