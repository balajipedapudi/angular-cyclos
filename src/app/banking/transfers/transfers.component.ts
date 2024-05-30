import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankingService } from 'src/app/services/banking.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent {
  stateObjFromDebit_Org:any=history.state;

  isLoading:any;
  amount:any;
  date:any;
  fromAccount:any;
  toAccount:any;
  paymentType:any;
  channel:any;
  chargeBackId:any;
  pdfId:any;
  constructor(private bankingServices:BankingService, private datePipe:DatePipe,private router:Router,private toastr:ToastrService){

  }
  transformDate(date: string): any {
    return this.datePipe.transform(date, 'MM-dd-yyyy hh:mm a');
  }
  ngOnInit(): void{
this.isLoading=true;
    console.log(this.stateObjFromDebit_Org.id);
     console.log(this.stateObjFromDebit_Org.route_Url);
    this.bankingServices.getTransfersDetails(this.stateObjFromDebit_Org.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.amount=res.amount;
        this.date=this.transformDate(res?.date);
        this.fromAccount=res.from;
        this.toAccount=res.to;
        this.paymentType=res.type;
        this.chargeBackId=res.id;
        this.channel=res.channel;
        this.pdfId=res.id;
        this.isLoading=false;
      },
      error:(err)=>{
        this.isLoading=false;
        this.toastr.error('Network Error');
      }
    })
   

    
  }
  goBackToBanking(){
this.router.navigate([this.stateObjFromDebit_Org.route_Url])
  }
  print(){
this.bankingServices.printTransfersPdf(this.pdfId).subscribe({
  next:(res:any)=>{
    console.log(res);
    
  },
  error:(err)=>{
    console.log(err);
   
  }
})
  }
}
