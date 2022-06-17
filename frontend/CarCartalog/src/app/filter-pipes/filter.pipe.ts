import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: any) {
    return value.filter(function (search: any) {
      return search.name.indexOf(filterString) > -1
    })
  }

}
