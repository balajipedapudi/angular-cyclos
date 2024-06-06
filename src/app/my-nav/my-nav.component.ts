import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';


// export const userResolver: ResolveFn<boolean> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//         inject(UserService).getUserData().subscribe((userData: any) => {
//             console.log(' resolve user data');

//             sessionStorage.setItem('userData', userData.id);
//             sessionStorage.setItem('userName',userData.firstName+" "+userData.lastName);
//             sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
//             sessionStorage.setItem('profilePic',userData.profilePicture)
//         });
        
//        return true;
    
// };


@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],

})
export class MyNavComponent implements OnInit {
constructor(private router:Router, private logInServices:LoginService,private toastr:ToastrService){
//  if(localStorage.getItem('token') &&localStorage.getItem('token')!='undefined'){
  if(localStorage.getItem('token')){
  this.isShow=true;
 }else{
  this.isShow=false
 }
}
  ngOnInit(): void {
  
  }
  public isShow=false;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public displayPic = sessionStorage.getItem('profilePic');
  public displayName=sessionStorage.getItem('userName');
  
   logout(){
    this.logInServices.logOut().subscribe({
      next:(response:any)=>{
        console.log(response);
        if(response.statusCode==200){
          localStorage.removeItem('token');
          localStorage.removeItem('cookie');
         
         this.isShow=false
         this.router.navigate(['/login'])
        }else{
          this.toastr.error('Oops something went wrong. Please try again in sometime');
        }
        
      },
      error:(err)=>{
        this.toastr.error('Oops something went wrong. Please try again in sometime');
      }
    })
    
  }

}

