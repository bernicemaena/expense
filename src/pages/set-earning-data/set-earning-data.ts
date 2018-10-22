import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the AddExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-earning-data',
  templateUrl: 'set-earning-data.html',
})
export class SetEarningDataPage {
  user_id: any = '';
  earning: any = 0;
  earning_for: string = 'MONTHLY';
  success_msg: string = '';
  
  base_url: string = 'http://localhost:83/expensetracker/index.php/';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,
             public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetEarningDataPage');
    this.user_id = localStorage.getItem('user_id');
  }

  
  setEarning(){
    this.userProvider.setEarning({ user_id: this.user_id, earning: this.earning, earning_for: this.earning_for })
        .subscribe( (result)=> {
           this.success_msg = 'Earning Info Successfully Added';
        });
  }

  
  closeModal(){
    this.viewCtrl.dismiss(); // { item: this.this_item }
  }


}
