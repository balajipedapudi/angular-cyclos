import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


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
export class OrganizationComponent {
  isShowFiltersOrg=false;
  currentDate: string|null;
  oneYearBeforeDate: string|null;
options:any=[];

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

  showFiltersOrg(){
    this.isShowFiltersOrg=true;
  }
  hideFiltersOrg(){
    this.isShowFiltersOrg=false;
  }
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}
