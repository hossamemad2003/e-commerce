import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(product: any[], searchTerm: string): any[] {
    return product.filter((el) => {
      return el.title
        .split(' ')
        .slice(0, 2)
        .join(' ')
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });
  }
}
