import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider }  from "../providers/user/user";

import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { ExpenseHistoryPage } from '../pages/expense-history/expense-history';
import { ExpensePage } from '../pages/expense/expense';
import { AddExpensePage } from '../pages/add-expense/add-expense';
import { ExpenseAnalysisPage } from '../pages/expense-analysis/expense-analysis';
import { MyitemsPage } from '../pages/myitems/myitems';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userProvider : UserProvider) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HOME', component: HomePage, icon: 'home' },
      { title: 'MY EXPENSES', component: ExpenseHistoryPage, icon: 'home' },
      { title: 'MY ITEMS', component: MyitemsPage, icon: 'home' },
      { title: 'ADD EXPENSE', component: AddExpensePage, icon: 'home' },
      { title: 'MY HISTORY', component: ExpenseHistoryPage, icon: 'home' },
      { title: 'EXPENSE ANALYSIS', component: ExpenseAnalysisPage, icon: 'home' },
      { title: 'HELP', component: HelpPage, icon: 'home' },
      { title: 'ABOUT', component: AboutPage, icon: 'home' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  log_out(){
    localStorage.clear();
    this.userProvider.log_out().subscribe(()=>{});
    this.nav.setRoot(SigninPage);
  }

}
