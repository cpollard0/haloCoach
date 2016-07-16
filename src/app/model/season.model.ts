/**
 * Created by Chris on 7/6/16.
 */
import {Playlist} from './playlist.model';
export class Season {
  name:string;
  startDate:string;
  endDate:string;
  iconUrl:string;
  contentId:string;
  thing:string;
  playlists:Array<Playlist>;
  constructor(seasonInfo:any) {
    this.name = seasonInfo.name;
    this.startDate = seasonInfo.startDate;
    this.endDate = seasonInfo.endDate;
    this.iconUrl = seasonInfo.iconUrl;
    this.contentId = seasonInfo.contentId;
    this.playlists = seasonInfo.playlists;
    this.thing = "Test";
  }
}
