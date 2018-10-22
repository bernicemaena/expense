import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { UserProvider } from '../../providers/user/user';
import { ExpenseProvider } from '../../providers/expense/expense';
import { SetEarningDataPage } from '../../pages/set-earning-data/set-earning-data';
import { ExpensePage } from '../../pages/expense/expense';
import { AddExpensePage } from '../../pages/add-expense/add-expense';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user_model: any; // { id: any, name: string, earning: string, earning_for: string, planning_for: string };
  id: any;
  name: string;
  earning: string;
  earning_for: string;
  planning_for: string;
  
  expenses: any = [];
  from: any = 'signin';

  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public httpClient: HttpClient, public userProvider: UserProvider,
              public expenseProvider: ExpenseProvider, public modalCtrl: ModalController ) {
    console.log('got data');

    // this.user_model = navParams.get('user');
    // console.log(this.user_model);
    // console.log(this.user_model.id);
  }

  
  ionViewDidLoad() { console.log('nothin '+ this.navParams.get('nothin'));
    /*
    this.user_model = this.userProvider.get_ls_details();
    console.log(this.user_model);
    console.log(' name is '+ this.user_model.name);
    */

    this.id = localStorage.getItem('user_id'); 
    this.name = localStorage.getItem('user_name');
    this.earning = localStorage.getItem('user_earning');
    this.earning_for = localStorage.getItem('user_earning_for');
    this.planning_for = localStorage.getItem('user_planning_for');  
    // this.earning_for = this.user_model.earning_for;
    
    if(this.navParams.get('from') !== undefined){
      localStorage.setItem('from', this.navParams.get('from'));
    }
    this.from = localStorage.getItem('from');

    this.get_expenses();
    
  }

  goToPageTwo(){
  }

  addExpenses(){
    let add_item_modal = this.modalCtrl.create(AddExpensePage, { user_id: this.id, is_modal: true } );

    add_item_modal.present();
    
    add_item_modal.onDidDismiss( (item_data)=> { 
        // this.user_items.push(item_data.items);
     });
  }

  setEarning(){ console.log('set earning now');
    let add_item_modal = this.modalCtrl.create(SetEarningDataPage, { user_id: this.id } );

    add_item_modal.present();
    
    add_item_modal.onDidDismiss( (item_data)=> { 
        // this.user_items.push(item_data.items);
     });
  }

  // gets i=this user expenses
  get_expenses(){
    this.expenseProvider.get_all_for_user(this.id)
        .subscribe((result)=>{ console.log(result);
             this.expenses = result;
        });
  }

  // refresh data, get user data again and the expenses
  refresh(){
    this.userProvider.get_details(this.name)
        .subscribe((result)=>{ console.log(result);
          this.id = result.id;
          this.name = result.name;
          this.earning = result.earning;
          this.earning_for = result.earning_for;
          this.planning_for = result.planning_for;
          
             localStorage.setItem('user_id', this.id);
             localStorage.setItem('user_name', this.name);
             localStorage.setItem('user_earning', this.earning);
             localStorage.setItem('user_earning_for', this.earning_for);
             localStorage.setItem('user_planning_for', this.planning_for);
        });
    
        this.get_expenses();

  }

  // redirect to ExpensePage
  goToExpensePage(expense){
    console.log('dta to be passed');
    console.log(expense);
    
    console.log('name to be passed');
    console.log(expense.name);
    
    console.log('items to be passed');
    console.log(expense.items);
    
    console.log('dates to be passed');
    console.log(expense.dates.start_from);
    
    console.log('item 0 to be passed');
    // console.log(expense.items[0].name);
    this.navCtrl.push(ExpensePage, {'expense': expense});
  }
  


}// end of class
