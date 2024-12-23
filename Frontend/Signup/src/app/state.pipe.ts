import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {
  
  transform(value: any, ...args: any[]): string {
    var stateList:{[key:string]:string}={"in":"India","kl":"Kerala","tn":"TamilNadu"};
    return stateList[value.toLowerCase()];
  }

}
