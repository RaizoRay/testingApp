import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { List } from './list';
import { GetdataService } from '../services/get-data.service';

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
  @Input() public list: Array<List>[];
  constructor(public getdataService: GetdataService) { }

  ngOnInit() {
    // this.getdataService.newCribSubject.subscribe(data => console.log('List of data : ' + data))
  }

  ngAfterContentChecked() {
    console.log('List : ' + this.list);
  }

}
