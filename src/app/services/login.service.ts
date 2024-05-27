import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http:HttpClient) { }
  
  logIn(userAgentId:any,authId:any){
    const url="http://localhost:3000/test"
    // const url = `https://cyclos.parezapay.com/api/auth/session?cookie=true&fields=sessionToken&fields=identityProviderNotLinkReason&userAgentId=${userAgentId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':authId,
      'Principal-Type':'username'
    });
    const options = {headers:headers};
    // return this.http.post(url,null,options);
    return this.http.get(url);
  }

}
