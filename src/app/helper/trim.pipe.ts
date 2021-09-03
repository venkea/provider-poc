import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string): any {
    
    if(value.length > 0) {
      console.log("in trim method", value)
      return value;
    } else {
      return null;
    }
  }

}