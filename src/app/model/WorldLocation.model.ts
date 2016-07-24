/**
 * Created by Chris on 7/10/16.
 */
export class WorldLocation {
  public x:number;
  public y:number;
  public z:number;

  constructor() {
  }

  deserialize(input) {
    this.x = input.x;
    this.y = input.y;
    this.z = input.z;
    return this;
  }


}
