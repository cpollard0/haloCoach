/**
 * Created by Chris on 7/24/16.
 */
export class MapStats {
  public MapId:string;
  public MostKills:number;
  public LeastKills:number;
  public MostDeaths:number;
  public LeastDeaths:number;
  public BestKDSpread:number;
  public WorstKDSpread:number;
  public TotalMatches:number;
  public TotalWins:number;
  public TotalKills:number;
  public TotalDeaths:number;
  public TotalAssists:number;
  public MapName:string;
  public MapImageUrl:string;

  public constructor(input) {
    this.MapId = input;
  }
}
