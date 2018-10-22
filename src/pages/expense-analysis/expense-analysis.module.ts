import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseAnalysisPage } from './expense-analysis';

@NgModule({
  declarations: [
    ExpenseAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseAnalysisPage),
  ],
})
export class ExpenseAnalysisPageModule {}
