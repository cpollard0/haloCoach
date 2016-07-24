/**
 * Created by Chris on 7/18/16.
 */
export class TeamsClass {

  public Id:string;
  public Score:number;
  public Rank:number;

  public constructor() {
    // this.TierName = this.getTierName();
  }


  deserialize(input) {

    //this.DesignationName = input.DesignationName;
    this.Id = input.Id;
    this.Score = input.Score;
    this.Rank = input.Rank;
    return this;
  }
}
