/**
 * Created by Chris on 7/17/16.
 */

import {Pipe} from '@angular/core';
import {PipeTransform} from '@angular/core';
import {Injectable} from '@angular/core';
@Pipe({
  name: 'filterPip'
})
@Injectable()
export class filterPip implements PipeTransform {
  transform(items:any[], args:any[]):any {
    console.log("in this bitch");
    // filter items array, items which match and return true will be kept, false will be filtered out
    //return items.filter(item => item.title.indexOf(args[0].title) !== -1);
  }
}

