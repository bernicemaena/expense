
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ExpenseProvider } from '../../providers/expense/expense';
/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {
  start_from: any;
  end_at: any;
  name: string;
  user_id: any;
  expenses: any = [];
  base_url: string = 'http://localhost:83/expensetracker/index.php/';
  is_modal: boolean = false;

  add_message: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public viewCtrl: ViewController, public expenseProvider: ExpenseProvider) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensePage');
    this.user_id = localStorage.getItem('user_id');
    this.is_modal = this.navParams.get('is_modal');
  }

  
  closeModal(){
    this.viewCtrl.dismiss(); // { item: this.this_item }
  }
  
  addExpense(){ console.log('adding expense '+ this.start_from +' and at '+ this.end_at);
    this.expenseProvider.add({ name: this.name, start_from: this.start_from, end_at: this.end_at, user_id: this.user_id })
        .subscribe((result)=> {
           console.log('got expense add result');
           console.log(result);
           this.add_message = 'Expense Successfully Added';
        });
  }

}
