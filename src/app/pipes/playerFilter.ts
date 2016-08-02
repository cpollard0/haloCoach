/**
 * Created by Chris on 7/31/16.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export default class FilterPipe implements PipeTransform {
  transform(value:any, args:string[]):any {
    let filter = args[0];

    if (filter && Array.isArray(value)) {
      let filterKeys = Object.keys(filter);
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
        memo && item[keyName] === filter[keyName], true));
    } else {
      return value;
    }
  }
}
