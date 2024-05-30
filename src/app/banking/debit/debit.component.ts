import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BankingComponent } from '../banking.component';
import { BankingService } from 'src/app/services/banking.service';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

interface Type {
  id: string;
  internalName: string;
  name: string;
}

interface User {
  display: string;
  id: string;
}

interface RelatedAccount {
  id: string;
  kind: string;
  type: Type;
  user?: User;
}

interface Transaction {
  id: string;
  kind: string;
}

interface Payment {
  amount: string;
  date: string;
  id: string;
  relatedAccount: RelatedAccount;
  type: Type;
  transaction?: Transaction;
}


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

const ELEMENT_DATA:Payment[] = [
 
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
  selectedRow:any;

   @ViewChild(MatPaginator) paginator: MatPaginator|any;
   dataSource = new MatTableDataSource<Payment>(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['date', 'id', 'amount'];

  isLoading:any;
 
  // clickedRows = new Set<PeriodicElement>();
  constructor(private formBuilder:FormBuilder,private datePipe:DatePipe, private bankingService:BankingService, private router:Router, private route:ActivatedRoute){
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
     this.isLoading=true;
    this.bankingService.getDropdownForDebitFilter().subscribe({
      next:(res:any)=>{
       
        console.log('filterDropdownData:', res);
        this.filterDropdownData=res;
        this.channels=res.channels;
        this.preselectedPeriods=res.preselectedPeriods;
        this.transferFilters=res.transferFilters;
        this.groups=res.groups;
        this.isLoading=false;
      }
    })

    this.bankingService.getDebitTableData().subscribe({

      next:(res:any)=>{
        console.log('tabledata:', res);
        this.dataSource= new MatTableDataSource<Payment>(res);
        this.dataSource.paginator = this.paginator;
        
      }

    })

    this.bankingService.getDebitAccountInfo().subscribe({
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

  showTransfers(row:any){
    console.log(row);
    console.log(this.router.url);
    this.router.navigate(['banking/transfers'],{state:{id:row.id,route_Url:this.router.url}})
    this.selectedRow = row;

    
  }

}
