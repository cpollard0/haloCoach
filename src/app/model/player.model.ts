/**
 * Created by Chris on 7/10/16.
 */

export class PlayerClass {

  Gamertag:string;
  Xuid:string;

  constructor() {
  }


  deserialize(input) {

    this.Gamertag = input.Gamertag;
    this.Xuid = input.Xuid;
    return this;
  }
}
