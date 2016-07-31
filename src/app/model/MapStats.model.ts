/**
 * Created by Chris on 7/24/16.
 */
export class MapStats {
  public MapData:any;
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
  public KDA:number;

  public constructor(input) {
    this.MapId = input;
  }

  public calcKDA(TotalKills:number, TotalAssists:number, TotalDeaths:number, TotalMatches:number) {
    this.KDA = (TotalKills + (1 / 3) * TotalAssists - TotalDeaths) / TotalMatches;
  }
}
