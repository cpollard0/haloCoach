/**
 * Created by Chris on 7/16/16.
 */

import {CsrClass} from './csr.model';

export class ArenaPlaylistStats {
  PlaylistId:string;
  MeasurementMatchesLeft:number;
  Csr:CsrClass;
  CsrPercentile:number;
  FastestMatchWin:number;
  HighestCsr:CsrClass;
  TotalAssassinations:number;
  TotalAssists:number;
  TotalDeaths:number;
  TotalGamesCompleted:number;
  TotalGamesLost:number;
  TotalGamesTied:number;
  TotalGamesWon:number;
  TotalGrenadeDamage:number;
  TotalGrenadeKills:number;
  TotalGroundPoundDamage:number;
  TotalGroundPoundKills:number;
  TotalHeadshots:number;
  TotalKills:number;
  TotalMeleeDamage:number;
  TotalPowerWeaponDamage:number;

  constructor() {

  }
}
