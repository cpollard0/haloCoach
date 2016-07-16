/**
 * Created by Chris on 7/6/16.
 */

import {Serializable} from './Serializable.helper';

export class Playlist implements Serializable<Playlist> {
  name:string;
  contentId:string;
  description:string;
  gameMode:string;
  id:string;
  imageUrl:string;
  isActive:boolean;
  isRanked:boolean;
  thing:string;

  constructor() {
  }

  deserialize(input) {

    this.name = input.name;
    this.contentId = input.contentId;
    this.description = input.description;
    this.gameMode = input.gameMode;
    this.id = input.id;
    return this;
  }
}
