import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http:HttpClient) { }
  
  logIn(userAgentId:any,authId:any){
    //const url="http://localhost:3000/test"
     const url = `http://10.175.1.21:18080/api/gateway/api/auth/session`;
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization':authId,
    //   'Principal-Type':'username'
    // });
    //const options = {headers:headers};
    const body={
      "userAgentId":userAgentId,
      "key":authId
   }
     return this.http.post(url,body);
    //return this.http.get(url);
  }

  

}
