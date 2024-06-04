import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BankingComponent } from '../banking.component';
import { BankingService } from 'src/app/services/banking.service';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  displayedColumns: string[] = ['icon','date', 'id', 'amount'];

  isLoading:any;
 
  // clickedRows = new Set<PeriodicElement>();
  constructor(private formBuilder:FormBuilder,private datePipe:DatePipe, private bankingService:BankingService, private router:Router, private route:ActivatedRoute,private toastr:ToastrService){
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

  downloadFormat(format:any){
    
    this.bankingService.downloadReport(format,"debit").subscribe({
      next:(res:any)=>{
        console.log(res);

        if(format=="pdf"){
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
  
        console.log('PDF downloaded');
        }else if(format=="csv") {
          const blob = new Blob([res], { type: 'text/csv' });

          // Create a link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `report.${format}`;
  
          // Append the link to the body
          document.body.appendChild(link);
  
          // Programmatically click the link to trigger the download
          link.click();
  
          // Clean up and remove the link
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
  
          console.log('CSV downloaded');
        }
      }
    })
  }

  preselectedPeriods:any =[];
  transferFilters:any=[];
  groups:any=[];
  channels:any=[];
  // exportFormats:any=[];
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
    orderBy:[null],
    user:[null] 
  })
  // users: string[] = ['One', 'Two', 'Three'];


  users:any=[];
  ngOnInit(): void {
    //  this.isLoading = true;
   
  
    this.bankingService.getDropdownForDebitFilter().pipe(
      tap((res: any) => {
        this.filterDropdownData = res;
        this.channels = res.channels;
        this.preselectedPeriods = res.preselectedPeriods;
        this.transferFilters = res.transferFilters;
        this.groups = res.groups;
      }),
      switchMap(() => this.bankingService.getDebitTableData()),
      tap((res: any) => {
        this.dataSource = new MatTableDataSource<Payment>(res);
        this.dataSource.paginator = this.paginator;
      }),
      switchMap(() => this.bankingService.getDebitAccountInfo()),
      tap((res: any) => {
        this.accountInfo = res.status;
        // this.isLoading = false;
      })
    ).subscribe({
      error: (err) => {
        console.error('An error occurred:', err);
        this.isLoading = false;
        this.toastr.error('Oops something went wrong. Please try again in sometime');
      }
    });
    this.optionDetails.get('user')?.valueChanges.subscribe(value=>{

      this.bankingService.findUsers(value).subscribe({
        next:(res)=>{
          this.users=res
        }
      })
     })
  }
  

 getBalanceClass(value: number): string {
    return value < 0 ? 'negative-balance' : 'positive-balance';
  }
  formatAmount(amount: number): string {
    return amount > 0 ? `+${amount}` : `${amount}`;
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
