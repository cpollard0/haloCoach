/**
 * Created by Chris on 7/5/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../app.constants'

@Injectable()
export class Halo5API {

  private headers:Headers;

  constructor(private http:Http) {
    this.headers = new Headers();

    this.headers.append('Ocp-Apim-Subscription-Key', 'c2a9961279f34f89b478c962a083b2eb');
  }

  getSeasonMetadata() {
    return this.makeRequest('metadata/h5/metadata/seasons');
  };

  getMapData() {
    return this.makeRequest('/etadata/h5/metadata/maps');
  };
  getEmblemImage(playerName:string) {
    return this.makeRequest('profile/h5/profiles/' + playerName + '/emblem');
  };

  getMatchesForPlayer(playerName:string, mode:string, startMatch:number, endMatch:number) {
    return this.makeRequest('stats/h5/players/' + playerName + '/matches?modes=' + mode + '&start=' + startMatch + '&count=' + endMatch)

  }
  getWeapons() {
    return this.makeRequest('metadata/h5/metadata/weapons');
  };
  getMatchEvents(matchId:string) {
    //Todo: Remove this; just for testing
    matchId = '47b69f6c-69e7-4ff7-a1ea-4f92aefd0739';
    return this.makeRequest('stats/h5/matches/' + matchId + '/events');
  };
  getArenaPostGameCarnageReport(matchId:string) {
    //Todo: Remove this; just for testing
    matchId = '98ed38e1-da15-4fed-803d-46563a33e40b';
    return this.makeRequest('stats/h5/arena/matches/' + matchId);
  };
  getArenaRecord(playerName:string,season:string|'')
  {
    return this.makeRequest('stats/h5/servicerecords/arena?players=' + playerName + '&seasonId=' + season);
  };

  private makeRequest(path:string) {
    //this.http.headers = new(Headers);

    let url = 'https://www.haloapi.com/' + path;
    //this.config.ApiUrl + '/${ path }';
    return this.http.get(url, {headers: this.headers})
      .map(res => res.json());
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }
}
