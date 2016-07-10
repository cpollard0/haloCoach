/**
 * Created by Chris on 7/6/16.
 */
  
  
export class Playlist {
  name:string;
  contentId:string;
  description:string;
  gameMode:string;
  id:string;
  imageUrl:string;
  isActive:boolean;
  isRanked:boolean;
  constructor(playlistInfo:any) {
    this.name = playlistInfo.name; 
  }
}
