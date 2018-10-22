import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//import { ItemProvider } '../../providers/item/item';
import { ItemProvider } from '../../providers/item/item';
import { ExpenseProvider } from '../../providers/expense/expense';

/**
 * Generated class for the AdditemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html',
})
export class AdditemPage {
  this_item: { id: any, name: string, cost: number, frequency: string, priority: string, expense_id: any };
  id: any; name: string; cost: number; frequency: string; priority: string; user_id: any; expense_id: any;
  expense: any;
  is_expense_set: boolean = false;
  set_expense_name: any;
  set_expense_id: any;

  expenses: any = [];
  items: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public viewCtrl: ViewController, public itemProvider: ItemProvider, 
              public expenseProvider: ExpenseProvider) {
          
                console.log("get local storage data on add item page");
                console.log(localStorage.getItem('user_id'));
    this.user_id = localStorage.getItem('user_id');
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
    
    if(this.navParams.get('is_data_set') === true){
      this.is_expense_set = true;
      this.set_expense_name = this.navParams.get('set_expense_name');
      this.set_expense_id = this.navParams.get('set_expense_id');

      console.log('we from preset');
    }
    // this.is_modal = this.navParams.get('is_modal');

    this.expenseProvider.get_all_for_user(this.user_id)
        .subscribe((result)=>{
            this.expenses = result;
        });
  }
  
  closeModal(){
    this.viewCtrl.dismiss(); // { item: this.this_item }
  }
  

  additem(){
    let expense_id = (this.is_expense_set === true) ? this.set_expense_id : this.expense_id;
    
    this.itemProvider.add({
        name: this.name, cost: this.cost, frequency: this.frequency, priority: this.priority, 
        user_id: this.user_id, expense_id: expense_id})
        .subscribe( (result)=>{
             console.log(result);
        });
    
    console.log(this.expense);
    console.log(this.user_id);    
  }



}
