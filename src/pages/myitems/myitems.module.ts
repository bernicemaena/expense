import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyitemsPage } from './myitems';

@NgModule({
  declarations: [
    MyitemsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyitemsPage),
  ],
})
export class MyitemsPageModule {}
