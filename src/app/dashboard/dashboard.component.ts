import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { LoginService } from '../services/login.service';
import { DashboardService } from '../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
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
  htmlContent: string = '';
  isLoading:any;
  constructor(private http:HttpClient,private dashboardServices:DashboardService, private cdr: ChangeDetectorRef,private toastr:ToastrService){
   
  }
  ngOnInit() {
     this.isLoading=true;
     this.dashboardServices.homePage(this.cookie,this.token).subscribe({
      next: (response:any) => {
        console.log('API Response:', response);
       
        this.htmlContent = response.content.content?response.content?.content['@value']:'';
       
          
        
        const iconsMapping:any = {
          account: ['account_circle','Account'],
          transfersOverview: ['checkbook','Transfers Overview'],
          payUser: ['payments','Pay User'],
          paySystem: ['payments','Pay System'],
          searchUsers: ['person_search','Search Users'],
          balancesOverview: ['account_balance_wallet','Balances Overview'],
          pendingUsers: ['person_check','Pending Users'],
          contacts: ['contacts_product','Contacts'],
          registerUser: ['person_add','Register User'],
          searchAds: ['travel_explore','Search Ads'],
          editProfile: ['person','Edit Profile'],
          passwords: ['key','Passwords'],
          settings: ['settings','Settings'],
          notifications: ['notifications_active','Notifications'],
          switchTheme: ['contrast','Switch Theme']
        };

        this.quickAccessWithIcons = response.quickAccess?.map((item:any)=> ({
          ...item,
          icon: iconsMapping[item.type][0] || 'defaultIcon',
          text:iconsMapping[item.type][1]
        }));

        console.log('new', this.quickAccessWithIcons);

        this.extractChartDataDebit(response.accounts[0]?.balanceHistory);
        this.debitAccBalance=response.accounts[0]?.balance;
        this.extractChartDataOrg(response.accounts[1]?.balanceHistory);
        this.organizationAccBalance=response.accounts[1]?.balance;
        this.isLoading=false;
        this.cdr.detectChanges();
        this.initializeChart(this.chartDataDebitY,this.chartCategoriesDebitX);
        this.initializeChartOrg(this.chartDataOrgY,this.chartCategoriesOrgX);
        
      },
      error: err => {
        console.error('API call error:', err);
        this.isLoading=false;
        this.toastr.error('Network Error');
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
        name: "Amount",
        data: data
      }],
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: ['#FFA500'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width:3
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        show:false,
        // row: {
        //   colors: ['#f3f3f3', 'transparent'],
        //   opacity: 0.5
        // },
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
        name: "Amount",
        data: data
      }],
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: ['#FFA500'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width:3
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        show:false,
        // row: {
        //   colors: ['#f3f3f3', 'transparent'],
        //   opacity: 0.5
        // },
      },
      xaxis: {
        categories: data2,
      },
      yaxis: {
        tickAmount: 5  
      },
      
    };


    var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();
  }
  getBalanceClass(value:any): string {

    return +value < 0 ? 'negative-balance' : 'positive-balance';
  }
  

}
