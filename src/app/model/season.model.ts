/**
 * Created by Chris on 7/6/16.
 */
import {Playlist} from './playlist.model';

export class Season {
  thing:string;
  name:string;
  startDate:string;
  endDate:string;
  iconUrl:string;
  contentId:string;
  playlists:Array<Playlist>;

  deserialize(input) {

    this.name = input.name;
    this.contentId = input.contentId;
    this.startDate = input.startDate;
    this.endDate = input.endDate;
    this.iconUrl = input.iconUrl;
    this.playlists = input.playlists.map(function (x) {
        return new Playlist().deserialize(x);
      }
    );
    return this;
  }

  public getPlaylistName() {
    return "test";
  };

  constructor() {
    this.thing = "Test";
  }
}
