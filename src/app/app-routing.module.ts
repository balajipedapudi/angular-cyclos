import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BankingComponent } from './banking/banking.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'banking', component:BankingComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
