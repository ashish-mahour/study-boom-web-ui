import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findSubcategories'
})
export class FindSubcategoriesPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (!args || args === null)
      return value[0].subCategories
    return value.find(x => x.categoryId.toString() === args.toString()).subCategories;
  }

}
