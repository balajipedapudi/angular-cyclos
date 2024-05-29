import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BankingComponent } from './banking/banking.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
  {path:'banking', component:BankingComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent,canActivate:[loginGuard]},
  {path:'',redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
