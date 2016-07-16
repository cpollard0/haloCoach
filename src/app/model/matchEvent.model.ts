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
  DistanceBetweenLocations:WorldLocation;
  WeaponName:string;
  WeaponStockId:string;
  Thing:string;

  constructor() {

  }

  deserialize(input) {
    //this.DesignationName = input.DesignationName;
    this.EventName = input.EventName;
    this.IsDeath = false;
    this.Thing = "2452";
    //this.IsDeath = this.EventName ==  "40Death";
    this.TimeSinceStart = input.TimeSinceStart;
    this.ShotsFired = input.ShotsFired;
    this.TimeWeaponActiveAsPrimary = input.TimeWeaponActiveAsPrimary;
    //this.Assistants = input.PlayerClass;
    this.IsDeath = input.IsDeath;
    this.IsAssassination = input.IsAssassination;
    this.IsGroundPound = input.IsGroundPound;
    this.IsHeadshot = input.IsHeadshot;
    this.IsMelee = input.IsMelee;
    this.IsShoulderBash = input.IsShoulderBash;
    this.IsWeapon = input.IsWeapon;
    //this.Killer = input.PlayerClass;
    this.KillerAgent = input.KillerAgent;
    //this.Victim = input.PlayerClass;
    this.VictimAgent = input.VictimAgent;
    if (input.KillerWorldLocation != null)
      this.KillerWorldLocation = new WorldLocation().deserialize(input.KillerWorldLocation);
    //this.KillerWorldLocation = input.KillerWorldLocation;
    if (input.VictimWorldLocation != null)
      this.VictimWorldLocation = new WorldLocation().deserialize(input.VictimWorldLocation);
    this.WeaponName = input.WeaponName;
    /*if (input.VictimWorldLocation != null && input.KillerWorldLocation != null)
     {
     this.DistanceBetweenLocations.x = this.KillerWorldLocation.x - this.VictimWorldLocation.x;
     this.DistanceBetweenLocations.y = this.KillerWorldLocation.y - this.VictimWorldLocation.y;
     this.DistanceBetweenLocations.z = this.KillerWorldLocation.z - this.VictimWorldLocation.z;
     }*/
    this.WeaponStockId = input.WeaponStockId;
    return this;
  }
}
