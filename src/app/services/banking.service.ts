import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import urls from 'src/urls';
@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http:HttpClient) { }

  getDropdownForDebitFilter(){
    const cookie = localStorage.getItem('cookie');
    const token = localStorage.getItem('token');
  //   const url =urls.dataForHistory
  //   const body:any={
  //     "Cookie":cookie,
  //     "Token":token
  // }
  const url =urls.dataForHistory
  const body:any={
    "Cookie": localStorage.getItem('cookie'),
   "Token": localStorage.getItem('token'),
   "orderBy":"dateDesc",
   "page":"0",
   "pageSize":"40",
   "datePeriod":"2024-04-27T00:00:00.000+01:00",
   "lowAmountRange":1,
   "highAmountRange":22000,
   "SystemFilter":"",
   "userFilter":"",
   "direction": "",
   "groups": "",
   "channels":"",
   "accountType":"debit"
}
    return this.http.post(url,body);
  }

  getDebitTableData(){

    const url =urls.history;
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
      "channels":"",
      "accountType":"debit"
  }
  return this.http.post(url, body);
  }

  getDebitAccountInfo(){
    const url = urls.accounts;
    const body ={  
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
        "fields":"status",
        "page":"0",
        "pageSize":"40",
        "fromDatePeriod":"2024-04-27T00:00:00.000+01:00",
        "toDatePeriod":"2024-05-29T23:59:59.999",
          "accountType":"debit"
    }
  
    return this.http.post(url,body);
  }

  getTransfersDetails(id:any){
    const url=urls.transfers;
    const body={
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "key":id
  }
  return this.http.post(url,body);
  }
  
  getDropdownForOrgFilter(){
    const url =urls.dataForHistory
    const body:any={
      "Cookie": localStorage.getItem('cookie'),
     "Token": localStorage.getItem('token'),
     "orderBy":"dateDesc",
     "page":"0",
     "pageSize":"40",
     "datePeriod":"2024-04-27T00:00:00.000+01:00",
     "lowAmountRange":1,
     "highAmountRange":22000,
     "SystemFilter":"",
     "userFilter":"",
     "direction": "",
     "groups": "",
     "channels":"",
     "accountType":"organization"
 }
    return this.http.post(url,body);
  }

  getOrgTableData(){
    const url =urls.history;

    const body:any=
  
{
  "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
     "orderBy":"dateDesc",
     "page":"0",
     "pageSize":"40",
     "datePeriod":"2024-04-27T00:00:00.000+01:00",
     "lowAmountRange":1,
     "highAmountRange":20000,
     "SystemFilter":"",
     "userFilter":"",
     "direction": "",
     "groups": "",
     "channels":"main",
     "accountType":"organization"
 }
  return this.http.post(url, body);
  }

  getOrgAccountInfo(){
    const url = urls.accounts;
    const body ={  
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
        "fields":"status",
        "page":"0",
        "pageSize":"40",
        "fromDatePeriod":"2024-04-27T00:00:00.000+01:00",
        "toDatePeriod":"2024-05-29T23:59:59.999",
          "accountType":"organization"
    }

    return this.http.post(url,body);
  }
printTransfersPdf(id:any){
  const url="http://10.175.1.21:18080/api/gateway/api/transfer/exportPdf";
  const body={
    "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "key":id
  }
  return this.http.post(url,body)
}


  findUsers(keyword:any){
    
    const url = urls.searchUser;

    const body={
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
      "keywords":keyword
    }
    return this.http.post(url, body);
  }

  downloadReport(format:any, accountType:string):any{
    const url = urls.downloadReport;
    const body ={
      "accountType":accountType,
      "Cookie": localStorage.getItem('cookie'),
      "Token": localStorage.getItem('token'),
       "format":format,
      "orderBy":"dateDesc",
      "page":"0",
      "pageSize":"40",
      "datePeriod":"2024-04-27T00:00:00.000+01:00",
      "lowAmountRange":1,
      "highAmountRange":20000,
      "SystemFilter":"",
      "userFilter":"",
      "direction": "",
      "groups": "",
      "channels":""
   
  }

    const options = {responseType:'blob' as 'json'};
    return this.http.post(url, body, options);
  }


}
