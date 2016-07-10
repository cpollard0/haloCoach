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

  getEmblemImage(playerName:string) {
    return this.makeRequest('profile/h5/profiles/' + playerName + '/emblem');
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
