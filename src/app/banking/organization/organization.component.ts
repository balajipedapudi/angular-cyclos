import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BankingService } from 'src/app/services/banking.service';


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
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers:[DatePipe]
})
export class OrganizationComponent implements OnInit{
  isShowFiltersOrg=false;
  currentDate: string|null;
  oneYearBeforeDate: string|null;
  options:any=[];
  filterDropdownData: any;
  accountInfo:any;

  constructor(private formBuilder:FormBuilder,private datePipe:DatePipe,private bankingService:BankingService ){
     // this.currentDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
     const today = new Date();
     this.currentDate = this.datePipe.transform(today, 'MM-dd-yyyy');
 
     // Calculate the date one year before
     const oneYearBefore = new Date();
     oneYearBefore.setFullYear(today.getFullYear() - 1);
     this.oneYearBeforeDate = this.datePipe.transform(oneYearBefore, 'MM-dd-yyyy');
  }
  ngOnInit(): void {
    
    this.bankingService.getDropdownForDebitFilter().subscribe({
      next:(res:any)=>{
        console.log('filterDropdownData:', res);
        this.filterDropdownData=res;
        this.channels=res.channels;
        this.preselectedPeriods=res.preselectedPeriods;
        this.transferFilters=res.transferFilters;
        this.groups=res.groups;
      }
    })

    this.bankingService.getDebitTableData().subscribe({

      next:(res:any)=>{
        // let arr = [];
        // for(let i =0 ;i<res.length;i++){
        //   let c= new Countries(res[i].date,res[i].relatedAmount.kind=='system'?res[i].relatedAmount.type.name:res[i].relatedAmount.user.display,res[i].amount);
        //   arr.push(c)
        // }
        console.log('tabledata:', res);
        this.dataSource=res
        // this.dataSource.paginator = this.paginator;
        
      }

    })

    this.bankingService.getDebitAccountInfo().subscribe({
      next:(res:any)=>{
        console.log('accountInfo:',res.status);
        this.accountInfo= res.status;
      }
    })
  }

  
  transformDate(date: string): any {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  
  preselectedPeriods:any =[];
  transferFilters:any=[];
  groups:any=[];
  channels:any=[];
  directions:any=[
    {
      id:1,
      name:"Incoming"
    },
    {
      id:2,
      name:"Outgoing"
    }
  ];
  orderBy:any=[
    {
      id:1,
      name:"Date(newest first)"
    },
    {
      id:2,
      name:"Date(oldest first)"
    },
    {
      id:3,
      name:"Amount(lowest first)"
    },
    {
      id:2,
      name:"Amount(highest first)"
    }

  ];

  optionDetails=this.formBuilder.group({
    period:[null],
    filter:[null],
    fromAccount:[null],
    toAmount:[null],
    groups:[null],
    channel:[null],
    direction:[null],
    orderBy:[null]
    })

  showFiltersOrg(){
    this.isShowFiltersOrg=true;
  }
  hideFiltersOrg(){
    this.isShowFiltersOrg=false;
  }
  displayedColumns: string[] = ['date', 'id', 'amount'];
  dataSource :any;
}
