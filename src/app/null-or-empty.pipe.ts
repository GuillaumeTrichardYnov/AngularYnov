import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullOrEmpty'
})
export class NullOrEmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == "unknown" || value == "n/a" || value == "" || value == undefined || value == null)
    {
      return "Données manquante";
    }
    return value;
  }
}
