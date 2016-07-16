/**
 * Created by Chris on 7/10/16.
 */

export class CsrClass {

  public DesignationName:string;

  public constructor(public Csr:number,
                     public DesignationId:number,
                     public  PercentToNextTier:number,
                     public  Rank:number,
                     public Tier:number,
                     public  TierName:string) {
    // this.TierName = this.getTierName();
    this.DesignationName = "Testing";
  }

  getTierName() {
    var tierName:string;
    switch (this.Tier) {
      case 1:
        tierName = "Crappy";
        break;
      case 2:
        tierName = "Better";
        break;
      default:
        tierName = "You stink";

    }
    return tierName;
  }
}
