import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { AdditemPage } from '../additem/additem';

/**
 * Generated class for the MyitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myitems',
  templateUrl: 'myitems.html',
})
export class MyitemsPage {
  user_id: string;

  priority: string= 'MEDIUM';
  cost: number = 0;
  name: string = '';
  user_items: Array<any>;
  user: {name: string, id: number, emailaddress: string, earning: number, earning_for: number, planning_for: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public itemProvider: ItemProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyitemsPage');
    this.user_id = localStorage.getItem('user_id');
    this.get_items();
  }

  get_items(){
     this.itemProvider.get_all(this.user_id)
         .subscribe( (result)=> {
            console.log(result);
            this.user_items = result;
         });
  }


  openAddModal(){
    let add_item_modal = this.modalCtrl.create(AdditemPage, { user_id: this.user_id } );

    add_item_modal.present();
    
    add_item_modal.onDidDismiss( (item_data)=> { 
        // this.user_items.push(item_data.items);
     });

  }

  refresh(){
    this.get_items();
  }



}
