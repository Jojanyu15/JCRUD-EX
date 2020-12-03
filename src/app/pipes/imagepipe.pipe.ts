import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagepipe',
})
export class ImagepipePipe implements PipeTransform {
  transform(value: any): any {
    if (value === undefined) {
      return 'https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    } else {
      return value;
    }
  }
}
