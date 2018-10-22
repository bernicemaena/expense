import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseHistoryPage } from './expense-history';

@NgModule({
  declarations: [
    ExpenseHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseHistoryPage),
  ],
})
export class ExpenseHistoryPageModule {
  
}
