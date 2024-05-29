import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BankingComponent } from '../banking.component';
import { BankingService } from 'src/app/services/banking.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


// export interface PeriodicElement {
//   date: any
//   name:any
//   amount:any
// }

// class Countries implements PeriodicElement{
//   date: any
//   name:any
//   amount:any
//   constructor(  date: any,
//     name:any,amount:any){
// this.date = date
// this.name=name
// this.amount = amount
//   }
// }

const ELEMENT_DATA:any = [
  {position: 1, name: 'Paul Lokende', weight: 200000},
  {position: 2, name: 'Mostofa', weight: 40026},
  {position: 3, name: 'Mostofa', weight: 6941}
];
@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
  providers:[DatePipe]
})
export class DebitComponent implements OnInit, AfterViewInit {
  isShowFiltersDebit=false;
  currentDate: string|null;
  oneYearBeforeDate: string|null;
  options:any=[]; 
  filterDropdownData: any;
  accountInfo:any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['date', 'id', 'amount'];
  dataSource :any;
  // clickedRows = new Set<PeriodicElement>();
  constructor(private formBuilder:FormBuilder,private datePipe:DatePipe, private bankingService:BankingService){
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'MM-dd-yyyy');

    // Calculate the date one year before
    const oneYearBefore = new Date();
    oneYearBefore.setFullYear(today.getFullYear() - 1);
    this.oneYearBeforeDate = this.datePipe.transform(oneYearBefore, 'MM-dd-yyyy');
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

  optionDetails = this.formBuilder.group({
    period:[null],
    filter:[null],
    fromAccount:[null],
    toAmount:[null],
    groups:[null],
    channel:[null],
    direction:[null],
    orderBy:[null]
  })

  ngOnInit(): void {
    
    this.bankingService.getDropdownForFilter().subscribe({
      next:(res:any)=>{
        console.log('filterDropdownData:', res);
        this.filterDropdownData=res;
        this.channels=res.channels;
        this.preselectedPeriods=res.preselectedPeriods;
        this.transferFilters=res.transferFilters;
        this.groups=res.groups;
      }
    })

    this.bankingService.getTableData().subscribe({

      next:(res:any)=>{
        // let arr = [];
        // for(let i =0 ;i<res.length;i++){
        //   let c= new Countries(res[i].date,res[i].relatedAmount.kind=='system'?res[i].relatedAmount.type.name:res[i].relatedAmount.user.display,res[i].amount);
        //   arr.push(c)
        // }
        console.log('tabledata:', res);
        this.dataSource=res
        this.dataSource.paginator = this.paginator;
        
      }

    })

    this.bankingService.getAccountInfo().subscribe({
      next:(res:any)=>{
        console.log('accountInfo:',res.status);
        this.accountInfo= res.status;
      }
    })
  }

 getBalanceClass(value: number): string {
    return value < 0 ? 'negative-balance' : 'positive-balance';
  }

  showFiltersDebit(){
    this.isShowFiltersDebit=true;
  }
  hideFiltersDebit(){
    this.isShowFiltersDebit=false;
  }



}
