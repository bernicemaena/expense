import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';

/**
 * Generated class for the ExpenseAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-analysis',
  templateUrl: 'expense-analysis.html',
})
export class ExpenseAnalysisPage {
  @ViewChild('pieChart') pieChart;
  public items:any ={
    "items" : []
  };

  public pieChartEl                : any;
  public chartLoadingEl            : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    // create the pie chart
    this.createPieChart();
  
    console.log('ionViewDidLoad ExpenseAnalysisPage');
  }
 
createPieChart() : void
   {
      // We'll define the pie chart related logic here shortly
      this.pieChartEl	= 	new Chart(this.pieChart.nativeElement,
        {
           type: 'pie',
           data: {
              labels: [" High Priority ", " Medium Priority", "Low Priority"],
              datasets: [{
                 label                 : 'Expense Name',
                 data                  : [12, 19, 50],
                 backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                 
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                
              ]
              }]
           },
           
        });
     
        this.chartLoadingEl = this.pieChartEl.generateLegend();
     }
    
      

}

