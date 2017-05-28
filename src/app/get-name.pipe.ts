import { Pipe, PipeTransform } from '@angular/core';
import  { DataService } from './services/data.service';
@Pipe({
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {

  constructor(private dataService : DataService) {
  }

  transform(value: any, args?: any): any {
    //
    //Pipe async qui renvoie dirrectement un Observable a la vue
    //
    return this.dataService.getNameByUrl(value);
  }
}
