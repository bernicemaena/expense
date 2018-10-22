import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {
  base_url: string = 'http://localhost:83/expensetracker/index.php/';

  priority: string= 'MEDIUM';
  cost: number = 0;
  name: string = '';
  constructor(public http: HttpClient) {
    console.log('Hello ItemProvider Provider');
  }


  


  add(item): Observable<any>{
    let form_data = new FormData();
    form_data.append('name', item.name);
    form_data.append('cost', item.cost);
    form_data.append('frequency', item.frequency);
    form_data.append('priority', item.priority);
    form_data.append('user_id', item.user_id);
    form_data.append('expense_id', item.expense_id);

    return this.http.post(this.base_url+'item/add/', form_data);
  }



  get_all(user_id): Observable<any>{
    let form_data = new FormData();
    form_data.append('user_id', user_id);

    return this.http.get(this.base_url+'items/for_user/'+ user_id);
  }



}
