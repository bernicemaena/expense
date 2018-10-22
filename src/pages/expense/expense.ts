import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpenseProvider } from '../../providers/expense/expense';
import { AdditemPage } from '../additem/additem';
import { Chart } from 'chart.js';

/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class ExpensePage {
  @ViewChild('pieChart') pieChart;
  // public items:any ={ "items" : [] };
 
  public pieChartEl                : any;
  public chartLoadingEl            : any;

  expense: any = [];
  id: any;
  name: string = '';
  end_at: any;
  start_from: any;
  has_items: boolean = false;

  items: any = [];
  analysis: any = { };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public expenseProvider: ExpenseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
    let temp_expense = this.navParams.get('expense');
    /**
    console.log('in expense page');
    console.log(this.expense);
    console.log('ExpensePage name is '+ this.expense.name);
    console.log('ExpensePage date is '+ this.expense.dates.start_from);
    console.log('ExpensePage item name is '+ this.expense.items[0].name);
     */
    this.get_expense_details(temp_expense.id);
  }
  

  get_expense_details(id){
    this.expenseProvider.get_details(id)
        .subscribe((result)=> {
          console.log('result from server');
          console.log(result);
          console.log('start from '+ result.dates.start_from);
          this.expense = result;
          this.name = result.name;
          this.id = result.id;
          this.items = result.items;
          this.start_from = result.dates.start_from;
          this.end_at = result.dates.end_at;
          
          if(this.items.length > 0){
            this.has_items = true;
          }else{
            this.has_items = false;
          }

          /*
          let highCount = this.items.filter( (tempItem)=> { return tempItem.priority === 'HIGH' }).length;
          let mediumCount = this.items.filter( (tempItem)=> { return tempItem.priority === 'MEDIUM' }).length;
          let lowCount = this.items.filter( (tempItem)=> { return tempItem.priority === 'LOW' }).length;
          
          let tempHigh =  [];
          let tempMedium =  [];
          let tempLow =  [];
          let highCost: number = 0;
          let mediumCost: number = 0;
          let lowCost: number = 0;
          
          for(var x = 0; x < this.items; x++){
            if(this.items[x].priority === 'HIGH'){
              tempHigh.push(this.items[x]);
            }else if(this.items[x].priority === 'MEDIUM'){
              tempMedium.push(this.items[x]);
            }else{
              tempLow.push(this.items[x]);
            }
          }

          let fhighCost = tempHigh.map((item)=> { return highCost = highCost + item.cost });
          let fmediuMost = tempMedium.map((item)=> { return mediumCost = mediumCost + item.cost });
          let flowCost = tempLow.map((item)=> { return lowCost = lowCost + item.cost });

          this.analysis = { 
            high: { count: highCount, cost: highCost },
            medium: { count: mediumCount, cost: mediumCost },
            low: { count: lowCount, cost: lowCost }
           };
           **/

          this.createPieChart(this.items);

        });
  }

  goToAddItems(){
     this.navCtrl.push(AdditemPage, {'is_modal': true, 'is_data_set': true, 'set_expense_id': this.id, 'set_expense_name': this.name});
  }

  // refresh page data
  refresh(){
    this.get_expense_details(this.id);
    //this.createPieChart();
  }

  // create the pie chart for this expense
   
createPieChart(items){ 
  console.log('creating chart function');
  console.log('items at work');
  console.log(items);
  
  let lowPriorities = items.filter( (tempItem)=> { console.log(tempItem.name +' priority '+ tempItem.priority); return tempItem.priority === 'LOW' });
  let mediumPriorities = items.filter( (tempItem)=> { console.log(tempItem.name +' priority '+ tempItem.priority);  return tempItem.priority === 'MEDIUM' });
  let highPriorities = items.filter( (tempItem)=> { console.log(tempItem.name +' priority '+ tempItem.priority);  return tempItem.priority === 'HIGH' });  
  
  console.log('chart data lowp '+ lowPriorities.length +' med p '+ mediumPriorities.length +' highp '+ highPriorities.length);

  // set up our pic chart data here
   this.pieChartEl	= 	new Chart(this.pieChart.nativeElement, {
        type: 'pie',
        data: {
           labels: [" High Priority ", " Medium Priority", "Low Priority"],
           datasets: [{
              label                 : 'Expense Name',
              data                  :  [highPriorities.length, mediumPriorities.length, lowPriorities.length],
              backgroundColor: [
               'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
           ],
           hoverBackgroundColor: [ "#FF6384", "#36A2EB", "#FFCE56", ]
           }]
        },
        
     });
  
     this.chartLoadingEl = this.pieChartEl.generateLegend();
  }
 



}
