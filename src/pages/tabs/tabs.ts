import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LibraryPage } from '../library/library';
import { FavoritesPage } from '../favorites/favorites';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  libraryPage = LibraryPage; favoritesPage = FavoritesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
