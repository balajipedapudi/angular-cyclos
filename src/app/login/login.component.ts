import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyNavComponent } from '../my-nav/my-nav.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, MatIconModule]
})
export class LoginComponent {
constructor(private formBuilder:FormBuilder, private loginServices:LoginService,private router:Router,private route:ActivatedRoute, private comp:MyNavComponent){

}
private isShow=false;
loginDetails=this.formBuilder.group({
username:[null],
password:[null]
})
private randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
getUserAgentId(): string {
  let userAgentId = localStorage.getItem('userAgentId');
  if (!userAgentId) {
    userAgentId = this.randomString(32) + "_" + new Date().getTime();
    localStorage.setItem("userAgentId", userAgentId);
  }
  console.log(userAgentId);
  
  return userAgentId;
}

signIn(){
  console.log(this.loginDetails.value.username);
  let userAgent=this.getUserAgentId();
  console.log(userAgent);
  
  // Your username and password
const username = this.loginDetails.value.username;
const password = this.loginDetails.value.password;


const credentials = `${username}:${password}`;


const base64Credentials = btoa(credentials);

const authorizationHeader = `${base64Credentials}`;

// user agent id
this.loginServices.logIn(userAgent, authorizationHeader).subscribe((response:any)=>{
  console.log(response);
  localStorage.setItem('cookie',response.Cookie)
  localStorage.setItem('token',response.Token)
  if(localStorage.getItem('token')){
    this.comp.isShow=true;
  }
  this.router.navigate(['/dashboard'])
});

}
redirectToDashboard(){

}

}
