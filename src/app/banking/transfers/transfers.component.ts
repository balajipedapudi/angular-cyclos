import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BankingService } from 'src/app/services/banking.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent {
  stateObjFromDebit_Org:any=history.state;

  amount:any;
  date:any;
  fromAccount:any;
  toAccount:any;
  paymentType:any;
  channel:any;
  chargeBackId:any
  constructor(private bankingServices:BankingService, private datePipe:DatePipe){

  }
  transformDate(date: string): any {
    return this.datePipe.transform(date, 'MM-dd-yyyy hh:mm a');
  }
  ngOnInit(): void{
    console.log(this.stateObjFromDebit_Org.id);
    this.bankingServices.getTransfersDetails(this.stateObjFromDebit_Org.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.amount=res.amount;
        this.date=this.transformDate(res.date);
        this.fromAccount=res.from;
        this.toAccount=res.to;
        this.paymentType=res.type;
        this.chargeBackId=res.id;
        this.channel=res.channel;
      }
    })
   

    
  }
}
