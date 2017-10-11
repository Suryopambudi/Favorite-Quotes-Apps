import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController,ToastController } from 'ionic-angular';
import {QuotePage} from '../quote/quote';
import {Quote} from '../../data/quotes.interface'; //import the quote variable structure
import { QuotesService } from '../../services/quotes';
import { SettingsService } from '../../services/settings';

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoriteQuotes : Quote[];

  constructor(public tostCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, private quotesService: QuotesService, private settingsSvc: SettingsService, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.favoriteQuotes = this.quotesService.getAllFavoriteQuotes();
  }

  getQuoteDetails(quote: Quote) {
    let modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((isUnfavorite: boolean) => {
      if(isUnfavorite) this.quotesService.removeQuoteFromFavorites(quote);
    });
  }
  removeQuoteFromFavorite(quote : Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }
  setBgColor(){
    return this.settingsSvc.isAltBackground()?'altQuoteBackground': 'quoteBackground';
  }

  addQuote(q){
    const alert = this.alertCtrl.create({
      title : 'Add New Quote',
      inputs:[
        {
        name: 'person',
        placeholder: 'Name'
      },
      {
        name: 'text',
        placeholder: 'Quotes'
      }
      ],
      buttons:[
        {
        text:'OK',
        handler:data =>{
        this.presentToast(data);
        }
      },
      {
        text:'Cancel',
        role:'cancel',
        handler:() =>{
          console.log('I Change my mind.');
        }
      }
      ]
    });


    alert.present();
  }

  presentToast(data){
    this.quotesService.addQuoteToFavorites(data);
    const toast = this.tostCtrl.create({
      message: 'New Quotes Added',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
