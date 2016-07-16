/**
 * Created by Chris on 7/10/16.
 */

export class CsrClass {

  public DesignationName:string;
  public Csr:number;
  public DesignationId:number;
  public PercentToNextTier:number;
  public Rank:number;
  public Tier:number;
  public TierName:string;

  public constructor() {
    // this.TierName = this.getTierName();
  }


  deserialize(input) {

    //this.DesignationName = input.DesignationName;
    this.Csr = input.Csr;
    this.DesignationId = input.DesignationId;
    this.PercentToNextTier = input.PercentToNextTier;
    this.Rank = input.Rank;
    this.Tier = input.Tier;
    this.DesignationName = this.getDesignationName();
    return this;
  }


  getDesignationName() {
    var tierName:string;
    switch (this.DesignationId) {
      case 0:
        tierName = "Iron";
        break;
      case 1:
        tierName = "Bronze";
        break;
      case 2:
        tierName = "Silver";
        break;
      case 3:
        tierName = "Gold";
        break;
      case 4:
        tierName = "Platinum";
        break;
      case 5:
        tierName = "Diamond";
        break;
      case 6:
        tierName = "Onyx";
        break;
      default:
        tierName = "You stink";

    }
    return tierName;
  }
}
