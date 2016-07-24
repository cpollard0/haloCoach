/**
 * Created by Chris on 7/11/16.
 */
export class Weapon {
  contentId:string;
  description:string;
  id:number;
  isUsableByPlayer:boolean;
  largeIconImageUrl:string;
  name:string;
  smallIconImageUrl:string;
  type:string;

  constructor() {
  }


  deserialize(input) {
    //this.DesignationName = input.DesignationName;
    this.contentId = input.contentId;
    this.description = input.description;
    this.id = input.id;
    this.isUsableByPlayer = input.isUsableByPlayer;
    this.largeIconImageUrl = input.largeIconImageUrl;
    this.name = input.name;
    this.smallIconImageUrl = input.smallIconImageUrl;
    this.type = input.type;
    return this;
  }

  getNameById(weaponId) {
    if (this.id == weaponId) return this.description;

  }

}
