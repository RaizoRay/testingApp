import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'ng-select',
  template: `
    <p NgSelect>
      ng-select works!
    </p>
  `,
  styles: []
})
export class NgSelectComponent implements OnInit, AfterContentChecked {
  @Input() public list: Array<any>[];
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentChecked() {
    console.log('List : ' + this.list);
  }

}
