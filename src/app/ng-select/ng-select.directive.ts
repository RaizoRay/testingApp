import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NgSelect]'
})
export class NgSelectDirective {

  constructor(public _eref: ElementRef) { }

  @HostListener('click') onClick() {
    alert('It Worked');
  }
}
