import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';



/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user_name: string = '';
  user_password: string = '';
  user_email: string = '';
  user_password_confirm: string = '';

  name_error: string = '';
  password_error: string = '';
  email_error: string = '';
  form_error: string='';

  email_validation_pattern: any = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}';
  name_validation_pattern: any ='[a-zA-Z0-9._-]+';

  base_url: string = 'http://localhost:83/expensetracker/index.php/user/';
  http_holder: Observable<any>;

  headerOptions: any = { 'Content-Type': 'application/json' };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public httpClient: HttpClient, public userProvider: UserProvider ) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    let is_valid = true;

    // validation
    if(this.user_name.length < 3 || !((new RegExp(this.name_validation_pattern)).test(this.user_name))){
        is_valid = false;

        if(this.user_name.length < 3){
        this.name_error = 'Check Your Name And Try Again';
      }else{
        this.name_error = 'You Have To Provide A Valid Name';
      }

    }
    
    if(this.user_email.length < 3 || !((new RegExp(this.email_validation_pattern)).test(this.user_email)) ){
      is_valid = false;
      
      if(this.user_email.length < 3){
        this.email_error = 'Check Your Email And Try Again';
      }else{
        this.email_error = 'You Have To Provide A Valid Email';
      }

   }
    
    if(this.user_password.length < 3 ){
       is_valid = false;
       this.password_error = 'Check Your Password And Try Again';
    }

    if(this.user_password != this.user_password_confirm){
      is_valid = false;
      this.password_error = 'Passwords Must Match';
    }

    if(is_valid){
      let name_stat_holder: Observable<any>;

      let form_data = new FormData();
      form_data.append('user_name', this.user_name);
     
      name_stat_holder = this.httpClient.post(this.base_url+'name_used/', form_data ); //JSON.stringify({ user_name : this.user_name })
          // .map(res => res.json())
      name_stat_holder.subscribe((result)=> { 
             console.log(result);
             let server_data = result;
             console.log('name used '+ server_data.name_used);
             if(result.name_used){
               this.name_error = 'Name USed. Pick A New One';
             }else{
               this.add_user();
             }   
          });

    }else{
      // this.form_error = 'Check Your Details';
      console.log('You Have Errors In Your Data');
    }


  }


  add_user(){
    let form_data = new FormData();
    form_data.append('user_name', this.user_name)
    form_data.append('user_email', this.user_email)
    form_data.append('user_password', this.user_password);  
    

    this.http_holder = this.httpClient.post(this.base_url+'add/', form_data);
    
    this.http_holder.subscribe((result)=> {  
          console.log('got http result '+ result); 
          if(result.added){
            
            // set user session
            this.userProvider.request_session(this.user_name, this.user_password)
                .subscribe((response)=> { });    
                localStorage.setItem('user_id', user_data_result.id);
                localStorage.setItem('user_name', user_data_result.name);
                localStorage.setItem('user_earning', user_data_result.earning);
                localStorage.setItem('user_earning_for', user_data_result.earning_for);
                localStorage.setItem('user_planning_for', user_data_result.planning_for);
            // get this users details
            this.userProvider.http.get(this.base_url+'get_details/with_name/'+ this.user_name)
                .subscribe( (user_data_result)=> { console.log(user_data_result);
               

                 this.navCtrl.setRoot(HomePage, {from: 'signup', user: user_data_result});
           });    
          }else{
            this.form_error = 'A SERVER ERROR OCCURRED. PLEASE WAIT A MOMENT AND TRY AGAIN';
          }
    });
  }


}
