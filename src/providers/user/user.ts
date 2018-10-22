import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs/Observable';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user_model: { id: any, name: string, earning: string, earning_for: string, planning_for: string };
  
  base_url: string = 'http://localhost:83/expensetracker/index.php/user/';
  http_holder: Observable<any>;


  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }



  // request a session for a user
  get_details(name){
    return this.http.get(this.base_url+'get_details/with_name/'+name);
  }

  // request a session for a user
  request_session(name, password){
    let form_data = new FormData();
    form_data.append('user_name', name);
    form_data.append('user_password', password);

    return this.http.post(this.base_url+'get_session', form_data);
  }

  
  // set data from db to the localStorage
  set_ls_details(db_data){
    this.set_id(db_data.id);
    this.set_name(db_data.name);
    this.set_earning(db_data.earning);
    this.set_earning_for(db_data.earning_for);
    this.set_planning_for(db_data.planning_for);
  }

  get_ls_details(){
    /*
    this.user_model.id = this.get_id();
    this.user_model.name = this.get_name();
    this.user_model.earning = this.get_earning();
    this.user_model.earning_for = this.get_earning_for();
    this.user_model.planning_for = this.get_planning_for();
    */

    return { id: this.get_id(), name: this.get_name(), earning: this.get_earning(),
             earning_for: this.get_earning_for(), planning_for: this.get_planning_for()
          }
  }
  

  // set id of a user stored in localStorage
  set_id(id){
    return localStorage.setItem('user_id', id);
  }
  // set name of a user stored in localStorage
  set_name(name){
    return localStorage.setItem('user_name', name);
  }
  // set earning of a user stored in localStorage
  set_earning(earning){
    return localStorage.setItem('user_earning', earning);
  }
  // set earning_for of a user stored in localStorage
  set_earning_for(earning_for){
    return localStorage.setItem('user_earning_for', earning_for);
  }
  // set planning_for of a user stored in localStorage
  set_planning_for(planning_for){
    return localStorage.setItem('user_planning_for', planning_for);
  }

  // return id of a user stored in localStorage
  get_id(){
    return localStorage.getItem('user_id');
  }
  // return name of a user stored in localStorage
  get_name(){
    return localStorage.getItem('user_name');
  }
  // return earning of a user stored in localStorage
  get_earning(){
    return localStorage.getItem('user_earning');
  }
  // return earning_for of a user stored in localStorage
  get_earning_for(){
    return localStorage.getItem('user_earning_for');
  }
  // return planning_for of a user stored in localStorage
  get_planning_for(){
    return localStorage.getItem('user_planning_for');
  }
  
  log_out(){
    return  this.http.post(this.base_url+"logout/", (new FormData()));
  }

  setEarning(data){
    let form_data = new FormData();
    form_data.append('user_id', data.user_id);
    form_data.append('earning', data.earning);
    form_data.append('earning_for', data.earning_for);
    
    return this.http.post(this.base_url+"set-earning/", form_data);
  }



}
