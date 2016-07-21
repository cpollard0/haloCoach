/**
 * Created by Chris on 7/18/16.
 */
import {PlayerClass} from './player.model';
export class PlayerMatchStats {

  public PostMatchRatings:string;
  public PreMatchRatings:number;
  public Rank:number;
  public Result:number;
  public TeamId:number;
  public TotalAssists:number;
  public TotalDeaths:number;
  public TotalKills:number;
  public Player:PlayerClass;

  public constructor() {
    // this.TierName = this.getTierName();
  }


  deserialize(input) {

    this.PostMatchRatings = input.PostMatchRatings;
    this.PreMatchRatings = input.PreMatchRatings;
    this.Rank = input.Rank;
    this.Result = input.Result;
    this.TeamId = input.TeamId;
    this.TotalAssists = input.TotalAssists;
    this.TotalDeaths = input.TotalDeaths;
    this.TotalKills = input.TotalKills;
    if (input.Player != null)
      this.Player = new PlayerClass().deserialize(input.Player);
    return this;
  }
}
