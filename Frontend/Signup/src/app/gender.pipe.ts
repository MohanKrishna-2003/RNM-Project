import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    console.log((args[0])); //in currency pipe the $ and the position for $ is 0 will be default for our pipe we need to 
    let title=(args[0]=='boy'?"Mr ":"Miss");
    console.log(value);
    
    return title + " " +value;
    
  }

  

}
