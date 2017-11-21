import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController,ToastController,ActionSheetController,PopoverController } from 'ionic-angular';
import {QuotePage} from '../quote/quote';
import {Quote} from '../../data/quotes.interface'; //import the quote variable structure
import { QuotesService } from '../../services/quotes';
import { SettingsService } from '../../services/settings';
import { PopoverPage } from '../popover/popover';
import { authService } from '../../services/auth';

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

  constructor(public tostCtrl: ToastController, 
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public modalCtrl: ModalController, 
  private quotesService: QuotesService, 
  private settingsSvc: SettingsService, 
  public alertCtrl: AlertController, 
  public actionSheetCtrl: ActionSheetController, 
  public popoverCtrl: PopoverController,
  private authservice : authService) {
  }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
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

  presentActionSheet(quote){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Quote Options',
      buttons:[
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeQuoteFromFavorite(quote);
          }
        },
        {
          text: 'ShowQuoteDetail',
          handler: () => {
            this.getQuoteDetails(quote);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('kensel');
          }
        }
      ]
    });

    actionSheet.present();
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
