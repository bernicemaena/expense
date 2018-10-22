import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { UserProvider } from '../../providers/user/user';
import { ExpenseProvider } from '../../providers/expense/expense';


/**
 * Generated class for the ExpenseHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-history',
  templateUrl: 'expense-history.html',
})
export class ExpenseHistoryPage {
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
    public expenseProvider: ExpenseProvider, public modalCtrl: ModalController) {
      console.log('got data');
  }

  ionViewDidLoad() {
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
   this.from = this.navParams.get('from');

   this.expenseProvider.get_all_for_user(this.id)
       .subscribe((result)=>{ console.log(result);
            this.expenses = result;
       });
  }


}
