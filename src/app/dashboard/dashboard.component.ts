import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { LoginService } from '../services/login.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   cookie:any=localStorage.getItem('cookie');
   token=localStorage.getItem('token')
  quickAccessWithIcons: any[] = [];
  chartDataDebitY: number[] = [];
  chartCategoriesDebitX: string[] = [];
  chartDataOrgY: number[] = [];
  chartCategoriesOrgX: string[] = [];
  debitAccBalance="";
  organizationAccBalance="";
  constructor(private http:HttpClient,private dashboardServices:DashboardService){
   
  }
  ngOnInit() {
     this.dashboardServices.homePage(this.cookie,this.token).subscribe({
      next: (response:any) => {
        console.log('API Response:', response);

        const icons = [
          'account_circle','checkbook','payments','payments', 'person_search','account_balance_wallet','person_check',
          'contacts_product','person_add','travel_explore','person','key','settings','notifications_active','contrast'
        ];

        this.quickAccessWithIcons = response.quickAccess.map((item:any, index:any) => ({
          ...item,
          icon: icons[index] || 'defaultIcon'
        }));

        console.log('new', this.quickAccessWithIcons);

        this.extractChartDataDebit(response.accounts[0].balanceHistory);
        this.debitAccBalance=response.accounts[0].balance;
        this.extractChartDataOrg(response.accounts[1].balanceHistory);
        this.organizationAccBalance=response.accounts[1].balance;
        this.initializeChart(this.chartDataDebitY,this.chartCategoriesDebitX);
        this.initializeChartOrg(this.chartDataOrgY,this.chartCategoriesOrgX);
      },
      error: err => {
        console.error('API call error:', err);
      }
    });
    
  }
  extractChartDataDebit(balanceHistory: { amount: string, date?: string }[]) {
    this.chartDataDebitY = balanceHistory.map(item => parseFloat(item.amount));
    this.chartCategoriesDebitX = balanceHistory.map(item => {
      if (item.date) {
        const date = new Date(item.date);
        return date.toLocaleString('default', { month: 'short' });
      } else {
        return 'Now';
      }
    });
  }
  extractChartDataOrg(balanceHistory: { amount: string, date?: string }[]) {
    this.chartDataOrgY = balanceHistory.map(item => parseFloat(item.amount));
    this.chartCategoriesOrgX = balanceHistory.map(item => {
      if (item.date) {
        const date = new Date(item.date);
        return date.toLocaleString('default', { month: 'short' });
      } else {
        return 'Now';
      }
    });
  }
  initializeChart(data: number[],data2:any) {
    var options = {
      series: [{
        name: "Desktops",
        data: data
      }],
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: data2,
      },
      yaxis: {
        tickAmount: 5  
      }
    };
   

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

  }
  initializeChartOrg(data: number[],data2:any) {
   
    var options1 = {
      series: [{
        name: "Desktops",
        data: data
      }],
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: data2,
      },
      yaxis: {
        tickAmount: 5  
      }
    };


    var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();
  }

  

}
