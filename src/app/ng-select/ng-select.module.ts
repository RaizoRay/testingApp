import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectDirective } from './ng-select.directive';
import { NgSelectComponent } from './ng-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgSelectDirective, NgSelectComponent],
  exports: [NgSelectDirective, NgSelectComponent]
})
export class NgSelectModule { }
