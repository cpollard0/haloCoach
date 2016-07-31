/**
 * Created by Chris on 7/17/16.
 */

import {Pipe} from '@angular/core';
import {PipeTransform} from '@angular/core';
import {Injectable} from '@angular/core';
@Pipe({
  name: 'filterPipe'
})
@Injectable()
export class filterPipe implements PipeTransform {
  transform(items:any[], args:any[]):any {
    console.log("in this bitch");
    let filter = args[0].toLocaleLowerCase();

    return filter ? items.filter(matchEvent=> matchEvent.Killer.GamerTag.toLocaleLowerCase().indexOf(filter) != -1) : items;
    // filter items array, items which match and return true will be kept, false will be filtered out
    //return items.filter(item => item.title.indexOf(args[0].title) !== -1);
  }
}

