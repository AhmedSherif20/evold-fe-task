import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kNumbers',
})
export class KNumbersPipe implements PipeTransform {
  transform(num: any, ...args: unknown[]): any {
    return Math.abs(num) > 999
      ? `${Math.sign(num) * parseInt((Math.abs(num) / 1000).toFixed())}K`
      : Math.sign(num) * Math.abs(num);
  }
}
