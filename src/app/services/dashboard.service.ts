import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import urls from 'src/urls';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  homePage(cookie:any,token:any){
    console.log(cookie,token);
    
    const url=urls.home;
   // const url1="http://localhost:3000/chart";
    const body:any={
      "screenSize":"desktop",
      "Cookie":cookie,
      "Token":token
  }
   return this.http.post(url,body)
 // return this.http.get(url1)
  }
}
