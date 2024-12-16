import { Pipe, PipeTransform } from '@angular/core';
import { Dvd } from '../component/modals/customer';

@Pipe({
  name: 'searchdvd',
  standalone: true
})
export class SearchdvdPipe implements PipeTransform {

  transform(dvds: Dvd[], searchTerm: string): Dvd[] {
    if (!searchTerm) {
      return dvds;
    }
    searchTerm = searchTerm.toLowerCase();
    return dvds.filter(dvd =>
      dvd.title.toLowerCase().includes(searchTerm) || dvd.price.toString().includes(searchTerm)
    );
  }

}
