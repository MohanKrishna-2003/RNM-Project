import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSample]',
  standalone: true
})
export class SampleDirective {
  //  for a single directive
  // constructor(private el : ElementRef) { 
  //   this.el.nativeElement.style.backgroundColor='yellow';
    
  // }

  //in the about i want red colour and contact i want red colour means we need to use the component interactoin
  @Input() color = "red";
  constructor(private el : ElementRef) { 
    console.log(this.color);
 }

 ngOnInit():void{
  console.log(this.color);
  this.el.nativeElement.style.backgroundColor=this.color;
 }
  
 }


