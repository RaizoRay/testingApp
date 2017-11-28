import { Directive, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appDsearch]'
})
export class DsearchDirective {

  constructor(public eRef: ElementRef) { }
  @HostListener('click', ['$event.target.className', '$event.target.tagName']) doSomething(e1, e2) {
    var sliced = e1.slice(0, 6);
    var host = this.eRef.nativeElement
    alert(e2 + " " + sliced);
    alert(host);
  }
}
