/**
 * Created by Chris on 7/5/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {Halo5API} from '../../../services/halo5API';
import {Season} from '../../../model/season.model';

@Component({
  selector: 'season-dropdown',
  pipes: [],
  properties:[],
  providers: [Halo5API],
  directives: [ ROUTER_DIRECTIVES,SeasonDropdown ],
  templateUrl: './season-dropdown.html',
})
export class SeasonDropdown implements OnInit{
  public seasonData : Array<Season>;
  constructor(public haloAPI: Halo5API) {};
  ngOnInit() {
    //this.haloAPI.getSeasonMetadata();
    this.haloAPI.getSeasonMetadata()
      .subscribe(
        // the first argument is a function which runs on success
        data => { this.seasonData = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => {
        }
      );
  }
}

