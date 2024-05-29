import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyNavComponent } from '../my-nav/my-nav.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, MatIconModule]
})
export class LoginComponent {
constructor(private formBuilder:FormBuilder, private loginServices:LoginService,private router:Router,private route:ActivatedRoute, private comp:MyNavComponent, private toastr:ToastrService){

}
private isShow=false;
loginDetails=this.formBuilder.group({
username:[null,Validators.required],
password:[null,Validators.required]
})

passwordFieldType: string = 'password';
passwordFieldIcon: string = 'visibility';
togglePasswordVisibility(): void {
  if (this.passwordFieldType === 'password') {
    this.passwordFieldType = 'text';
    this.passwordFieldIcon = 'visibility_off';
  } else {
    this.passwordFieldType = 'password';
    this.passwordFieldIcon = 'visibility';
  }
}
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
  if(this.loginDetails.valid){
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
  console.log(localStorage.getItem('token'));
  
  if(localStorage.getItem('token') && localStorage.getItem('token')!='undefined'){
    this.comp.isShow=true;
  }else{
    this.comp.isShow=false;
  }
  if(response.statusCode==401){
    this.toastr.error('Invalid Credentials');
  }else{
  this.router.navigate(['/dashboard'])
  }
});
  }else{
    this.toastr.error('Please Enter Your Credentials');
  }
}
redirectToDashboard(){

}

}
