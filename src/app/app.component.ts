import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { GetdataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  public vpCustomersData: any[];
  public vpcCodes:Array<any> = [];
  public showOption: boolean = false;
  selectedVpc: string = '';
  vpcCoda: string = '';
  vpcPlaceholder: string = 'Select VPC Code';
  vpcId: number = 205;


  constructor(private getdataService: GetdataService, private _eref: ElementRef) { }

  @ViewChild('dsearch') el:ElementRef;

  ngOnInit() {
    this.getVpCustomersDetails();

  }

  getVpCustomersDetails() {
    let errMessage: any = [];
    this.getdataService.getVpCustomersData()
        .subscribe(
          (vpCustomers) => {
            this.vpCustomersData = vpCustomers;
            // this.getdataService.addCrib(this.vpCustomersData);
            this.initItems();
          },
          errorMsg => errMessage = <any>errorMsg
        );
  }

  public initItems() {
    this.vpCustomersData.forEach((item) => {
      this.vpcCodes.push({ id: item.vpcId, text: item.vpcCode });
    });

    console.log(this.vpcCodes); // data shows up but doesnt get initialized
  }

  public selectedValue(data: any){
    this.showOption = false;
    this.selectedVpc = data.vpcCode;
    this.vpcCoda = data.vpcCode;
    if(data){
      this.vpcPlaceholder = '';
    }
    else{
      this.vpcPlaceholder = 'Select VPC Code';
    }
  }

  public clearValues() {
    this.selectedVpc = '';
  }

  @HostListener('click', ['$event']) onClick(event) {
    // if (!this._eref.nativeElement.contains(event.target)){
    //   this.showOption = false;
    // }
    // alert(this.el.nativeElement + ' ' + this._eref.nativeElement + ' ' + event.target);
    if ((this.el.nativeElement !== event.target)) {
      this.showOption = false;
    }
    // var host = this._eref.nativeElement;
    // var hElement: HTMLElement = this._eref.nativeElement;
    // var allDivs = hElement.getElementsByClassName('inText');
    // var indexNum = className.indexOf(' ');
    // var sliced = className.slice(0, indexNum);
    // alert(tagName + " " + sliced);
    // alert(this._eref.nativeElement);
  //   do {
  //     if ( tagName !== host ) {
  //       this.showOption = false;
  //     }
  //     tagName = tagName.parentNode;
  // } while ( tagName );
  // alert('Element Name : ' + allDivs);
  // alert(this._eref.nativeElement);
   }

   @HostListener('document:click', ['$event']) onClickDoc(event) {
    if ((this.el.nativeElement !== event.target)) {
      this.showOption = false;
    }
   }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    // event.preventDefault();
    // event.stopPropagation();
    if (event.code === 'Tab') {
      this.showOption = false;
    }
    if (event.shiftKey === true && event.code === 'Tab') {
      this.clearValues();
    }
  }

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  public list: Array<any> = [
    {id: 1, text: 'Rahul Bansode'},
    {id: 2, text: 'Sai Purnima'},
    {id: 3, text: 'Sri Lakshmi'},
    {id: 4, text: 'Jyotshna'},
    {id: 5, text: 'Manoj Kumar'},
    {id: 6, text: 'Shiva'},
    {id: 7, text: 'Narasimha Reddy'},
  ];

  public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
  'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
  'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
  'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
  'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
  'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
  'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
  'Zagreb', 'Zaragoza', 'Łódź'];

}




