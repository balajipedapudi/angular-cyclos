import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BankingComponent } from './banking/banking.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

import { DebitComponent } from './banking/debit/debit.component';
import { OrganizationComponent } from './banking/organization/organization.component';
import { TransfersComponent } from './banking/transfers/transfers.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
  {path:'banking', component:BankingComponent,canActivate:[authGuard], children:[
    { path: '', redirectTo: 'debit', pathMatch: 'full' },
    { path: 'debit', component: DebitComponent },
    { path: 'organization', component: OrganizationComponent },
    { path: 'transfers', component: TransfersComponent }
  ]},
  {path:'login',component:LoginComponent,canActivate:[loginGuard]},
  {path:'',redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
