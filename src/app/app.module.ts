import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ExpenseHistoryPage } from '../pages/expense-history/expense-history';
import { ExpensePage } from '../pages/expense/expense';

import { AdditemPage } from '../pages/additem/additem';
import { MyitemsPage } from '../pages/myitems/myitems';
import { ExpenseAnalysisPage } from '../pages/expense-analysis/expense-analysis';
import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { SetEarningDataPage } from '../pages/set-earning-data/set-earning-data';

// providers
import { UserProvider } from '../providers/user/user';
import { ItemProvider } from '../providers/item/item';
import { ExpenseProvider } from '../providers/expense/expense';
import { AddExpensePage } from '../pages/add-expense/add-expense';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ExpensePage,
    MyitemsPage,
    AdditemPage,
    AddExpensePage,
    SetEarningDataPage,
    ExpenseAnalysisPage,
    ExpenseHistoryPage,
    AboutPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ExpensePage,
    MyitemsPage,
    AdditemPage,
    AddExpensePage,
    SetEarningDataPage,
    ExpenseAnalysisPage,
    ExpenseHistoryPage,
    AboutPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ItemProvider,
    ExpenseProvider
  ]
})
export class AppModule {}
