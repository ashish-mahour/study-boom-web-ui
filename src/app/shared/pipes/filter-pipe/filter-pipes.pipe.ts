import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(list: any[], args?: string): any {
    if (!args || args === null || args === ''|| typeof(args) !== 'string')
      return [];
    else
      return list.filter(x => (x.categoryName as string).toLowerCase().includes(args.toLowerCase()))
  }

}

@Pipe({
  name: 'filterSubCategories'
})
export class FilterSubCategoriesPipe implements PipeTransform {

  transform(list: any[], args?: string): any {
    if (!args || args === null || args === ''|| typeof(args) !== 'string')
      return [];
    else
      return list.filter(x => (x.subCategoryName as string).toLowerCase().includes(args.toLowerCase()))
  }

}
