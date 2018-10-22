import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ExpenseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {
  start_from: any;
  end_at: any;
  name: string;
  user_id: any;
  base_url: string = 'http://localhost:83/expensetracker/index.php/';

  constructor(public http: HttpClient) {
    console.log('Hello ExpenseProvider Provider');
  }

  // add an expense
  add(expense){
    let form_data = new FormData();
    form_data.append('name', expense.name);
    form_data.append('start_from', expense.start_from);
    form_data.append('end_at', expense.end_at);
    form_data.append('user_id', expense.user_id);

    return this.http.post(this.base_url +'expense/add', form_data);
  }


  get_all_for_user(user_id){
    return this.http.get(this.base_url+'expenses/for_user/'+user_id);
  }

  get_details(id){
    return this.http.get(this.base_url+'expense/get_details/'+id);
  }


}
