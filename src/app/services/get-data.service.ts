import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetdataService {
  baseUrl: any = 'https://apidev.vpdcs.com/';
  url: any;
  headers: Headers;
  requestOptions: RequestOptions;
  locationType = {};
  page: any = 1;
  startIndex: any;
  endIndex: any;
  totalRecords: any;
  totalPages: any;
  tempData: any = [];

  public newCribSubject = new Subject<any>();

  constructor(private http: Http) { }

  getVpCustomersData(): Observable<any> {
    if (this.baseUrl) {
      this.url = this.baseUrl + 'vpcustomers';
    }

    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    requestOptions.search.set('offset', JSON.stringify(0));
    requestOptions.search.set('limit', JSON.stringify(99999));
    requestOptions.search.set('sort', 'vpcCode');
    requestOptions.search.set('active', 'true');
    requestOptions.search.set('finishedGoods', 'true');

    return this.http
      .get(this.url, requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // addCrib(data) {
  //   this.newCribSubject.next(data);
  // }

  getPromotionData(offsetIndex?, promotionSearch?): Observable<any> {
    const page = 1;
    const perPage = 50;
    this.totalPages = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    this.totalRecords = 0;
    this.tempData = [];

    if (this.baseUrl) {
      this.url = this.baseUrl + 'promotions';
    }
    const requestOptions = new RequestOptions({
      search: new URLSearchParams()
    });
    if (promotionSearch) {
      requestOptions.search.set(promotionSearch.fieldValue, JSON.stringify({ $like: `${promotionSearch.textValue}%` }));
    }
    if (promotionSearch.radioValue === true) {
      requestOptions.search.set('active', JSON.stringify({ $like: `${1}%` }));
    }
    if (offsetIndex !== null) {
      requestOptions.search.set('offset', JSON.stringify(parseInt(offsetIndex, 0)));
      requestOptions.search.set('limit', JSON.stringify(perPage));
      requestOptions.search.set('sort', 'vpcCode');
    }
    return this.http.get(this.url, requestOptions)
                    .map((response: Response) => {
                      const contentRange = response.headers.get('Content-Range');
                      if (contentRange) {
                        const pattern = /(\d+)-(\d+)\/(\d+)/g;
                        const match = pattern.exec(contentRange);
                        this.startIndex = +(match[1]);
                        this.endIndex = +(match[2]);
                        this.totalRecords = +(match[3]);
                        this.totalPages = Math.floor((this.totalRecords / perPage) + 1);
                      }
                    this.tempData.push(
                        this.extractData(response),
                        this.startIndex,
                        this.endIndex,
                        this.totalRecords,
                        this.totalPages
                    );
                    return this.tempData;
                    })
                    .catch(this.handleError);
  }

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
