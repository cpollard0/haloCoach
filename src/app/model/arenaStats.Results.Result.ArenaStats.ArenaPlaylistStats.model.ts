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

  deserialize(input) {
    this.PlaylistId = input.PlaylistId;
    this.MeasurementMatchesLeft = input.MeasurementMatchesLeft;
    if (input.Csr != null)
      this.Csr = new CsrClass().deserialize(input.Csr);
    this.CsrPercentile = input.CsrPercentile;
    this.FastestMatchWin = input.FastestMatchWin;
    if (input.HighestCsr != null)
      this.HighestCsr = new CsrClass().deserialize(input.HighestCsr);
    this.TotalAssassinations = input.TotalAssassinations;
    this.TotalAssists = input.TotalAssists;
    this.TotalDeaths = input.TotalDeaths;
    this.TotalGamesCompleted = input.TotalGamesCompleted;
    this.TotalGamesLost = input.TotalGamesLost;
    this.TotalGamesTied = input.TotalGamesTied;
    this.TotalGamesWon = input.TotalGamesWon;
    this.TotalGrenadeDamage = input.TotalGrenadeDamage;
    this.TotalGrenadeKills = input.TotalGrenadeKills;
    this.TotalGroundPoundDamage = input.TotalGroundPoundDamage;
    this.TotalGroundPoundKills = input.TotalGroundPoundKills;
    this.TotalHeadshots = input.TotalHeadshots;
    this.TotalKills = input.TotalKills;
    this.TotalMeleeDamage = input.TotalMeleeDamage;
    this.TotalPowerWeaponDamage = input.TotalPowerWeaponDamage;
    return this;
  }

}
