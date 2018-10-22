import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  
  user_name: string = '';
  user_password: string = '';

  name_error: string = '';
  password_error: string = '';
  form_error: string='';

  base_url: string = 'http://localhost:83/expensetracker/index.php/user/';
  http_holder: Observable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public httpClient: HttpClient,  public userProvider: UserProvider,
            public menuCtrl: MenuController ) {
      // localStorage.clear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    this.menuCtrl.swipeEnable(false);
  }
  
  // go to signup page
  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }


  // get user details, validate them
  signInUser(){
    let is_valid = true;

    // validation
    if(this.user_name.length < 3){
        is_valid = false;
        this.name_error = 'Check Your Name And Try Again'; 
    }
        
    if(this.user_password.length < 3 ){
      is_valid = false;
      this.password_error = 'Check Your Password And Try Again';
   }

   
   if(is_valid){
    let name_stat_holder: Observable<any>;

    let form_data = new FormData();
    form_data.append('user_name', this.user_name);
    form_data.append('user_password', this.user_password);
   
    name_stat_holder = this.httpClient.post(this.base_url+'account_exists/', form_data ); 
    //JSON.stringify({ user_name : this.user_name })
        // .map(res => res.json())
    name_stat_holder.subscribe((result)=> { 
           console.log(result);
           if(result.account_exists){
             this.userProvider.request_session(this.user_name, this.user_password)
                 .subscribe((response)=> { });    
        
             this.userProvider.http.get(this.base_url+'get_details/with_name/'+ this.user_name)
                 .subscribe( (result)=> { console.log(result);
                  localStorage.setItem('user_id', result.id);
                  localStorage.setItem('user_name', result.name);
                  localStorage.setItem('user_earning', result.earning);
                  localStorage.setItem('user_earning_for', result.earning_for);
                  localStorage.setItem('user_planning_for', result.planning_for);

                  this.navCtrl.setRoot(HomePage, { user: result, from: 'signin' });
            });

           }else{
            this.name_error = 'Check The Details You Entered And Try Again';
           }   
        });

  }else{
    // this.form_error = 'Check Your Details';
    console.log('You Have Errors In Your Data');
  }

  }// end of function




}// end of class
