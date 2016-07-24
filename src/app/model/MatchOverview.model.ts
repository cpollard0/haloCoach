/**
 * Created by Chris on 7/18/16.
 */


import {PlayerMatchStats} from './PlayerMatchStats.model';
export class MatchOverview {

  public GameBaseVariantId:string;
  public MapId:string;
  public Players:Array<PlayerMatchStats>;
  public PostMatchRatings:string;
  public PreMatchRatings:number;
  public Rank:number;
  public Result:number;
  public TeamId:number;
  public TotalAssists:number;
  public TotalDeaths:number;
  public TotalKills:number;

  constructor() {
    // this.TierName = this.getTierName();
  }


  deserialize(input) {

    //this.DesignationName = input.DesignationName;
    this.GameBaseVariantId = input.GameBaseVariantId;
    this.MapId = input.MapId;
    this.Players = input.Players.map(function (x) {
        return new PlayerMatchStats().deserialize(x);
      }
    );
    this.PostMatchRatings = input.Players[0].PostMatchRatings;
    this.PreMatchRatings = input.Players[0].PreMatchRatings;
    this.Rank = input.Players[0].Rank;
    this.Result = input.Players[0].Result;
    this.TeamId = input.Players[0].TeamId;
    this.TotalAssists = input.Players[0].TotalAssists;
    this.TotalDeaths = input.Players[0].TotalDeaths;
    this.TotalKills = input.Players[0].TotalKills;
    return this;
  }
}
