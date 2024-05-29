import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Paul Lokende', weight: 200000},
  {position: 2, name: 'Mostofa', weight: 40026},
  {position: 3, name: 'Mostofa', weight: 6941}
];
@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css'],
  providers: [DatePipe]
})
export class BankingComponent {
  currentDate: string|null;
  oneYearBeforeDate: string|null;
options:any=[];
   isShowFiltersDebit=false;
   isShowFiltersOrg=false;
   isShowDebitAcc=true;
   isShowOrgAcc=false;
    menuItem= [
        {
            routerLink:'debit',
            name: "Debit Account",
            icon:''
        },
        {
            routerLink:'organization',
            name:"Organization Account",
            icon:''
        }]

  constructor(private formBuilder:FormBuilder,private datePipe:DatePipe){
    // this.currentDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'MM-dd-yyyy');

    // Calculate the date one year before
    const oneYearBefore = new Date();
    oneYearBefore.setFullYear(today.getFullYear() - 1);
    this.oneYearBeforeDate = this.datePipe.transform(oneYearBefore, 'MM-dd-yyyy');
  }
  optionDetails=this.formBuilder.group({
    options:[null]
    })
  ngOnInit(){
    this.getDetails()
  }
  showDebitAccSection(){
    this.isShowDebitAcc=true;
    this.isShowOrgAcc=false;
  }
  showOrgAccSection(){
    this.isShowDebitAcc=false;
    this.isShowOrgAcc=true;
  }
  getDetails(){
    fetch("http://localhost:3000/getDetails")
    .then(response=>{return response.json()})
    .then(data=>{
      console.log(data);
      this.options=data.list;
      console.log(this.options);
      
    })
  }
  showFiltersDebit(){
    this.isShowFiltersDebit=true;
  }
  hideFiltersDebit(){
    this.isShowFiltersDebit=false;
  }
 
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}
