import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http:HttpClient) { }

  getDropdownForFilter(){
    const cookie = localStorage.getItem('cookie');
    const token = localStorage.getItem('token');
    const url ="http://10.175.1.21:18080/api/gateway/api/debitAccount/dataForHistory"
    const body:any={
      "Cookie":cookie,
      "Token":token
  }
    return this.http.post(url,body);
  }

  getTableData(){

    const url ="http://10.175.1.21:18080/api/gateway/api/accounts/debit/history";
    const body:any={
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "orderBy":"dateDesc",
      "page":"0",
      "pageSize":"40",
      "datePeriod":"2024-04-27T00:00:00.000+01:00",
      "lowAmountRange":"",
      "highAmountRange":"",
      "SystemFilter":"",
      "userFilter":"",
      "direction": "",
      "groups": "",
      "channels":""
  }
  return this.http.post(url, body);
  }

  getAccountInfo(){
    const url = "http://10.175.1.21:18080/api/gateway/api/accounts/accountype/debit";
    const body ={
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "fields":"status",
      "page":"0",
      "pageSize":"40",
      "fromDatePeriod":"2024-04-27T00:00:00.000+01:00",
      "toDatePeriod":"2024-05-29T23:59:59.999"
    }

    return this.http.post(url,body);
  }

  getTransfersDetails(id:any){
    const url="http://10.175.1.21:18080/api/gateway/api/transfer/key";
    const body={
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "key":id
  }
  return this.http.post(url,body);
  }
}
