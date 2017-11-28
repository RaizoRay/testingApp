import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

// Third Party imports
import { NgPipesModule } from 'ngx-pipes';
// import { SelectModule } from 'ng2-select/';

import { AppComponent } from './app.component';

import { GetdataService } from './services/get-data.service';
import { DsearchDirective } from './dsearch.directive';

import { NgSelectModule } from './ng-select/ng-select.module';

@NgModule({
  declarations: [
    AppComponent,
    DsearchDirective,
  ],
  imports: [
    BrowserModule,
    // SelectModule,
    FormsModule,
    NgPipesModule, 
    HttpModule,
    NgSelectModule
  ],
  providers: [GetdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
