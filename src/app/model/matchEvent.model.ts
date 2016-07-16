/**
 * Created by Chris on 7/10/16.
 */

import {PlayerClass} from './player.model';
import {WorldLocation} from './WorldLocation.model'
export class MatchEvent {
  EventName:string;
  TimeSinceStart:string;
  Player:PlayerClass;
  ShotsFired:number;
  ShotsLanded:number;
  TimeWeaponActiveAsPrimary:string;
  Assistants:PlayerClass;
  IsDeath:boolean;
  IsAssassination:boolean;
  IsGroundPound:boolean;
  IsHeadshot:boolean;
  IsMelee:boolean;
  IsShoulderBash:boolean;
  IsWeapon:boolean;
  Killer:PlayerClass;
  KillerAgent:number;
  Victim:PlayerClass;
  VictimAgent:number;
  KillerWorldLocation:WorldLocation;
  VictimWorldLocation:WorldLocation;
  WeaponName:string;
  WeaponStockId:string;
  constructor() {
    //  if (this.EventName = 'Death') this.IsDeath = true;
  }
}
