import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategories'
})
export class FilterPipePipe implements PipeTransform {

  transform(list: any[], args?: string): any {
    if (!args || args === null || args === '')
      return [];
    else
      return list.filter(x => (x.categoryName as string).includes(args))
  }

}
