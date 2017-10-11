import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { QuotesService } from '../../services/quotes';

/**
 * Generated class for the QuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quote: any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public quoteService: QuotesService, public alertCtrl: AlertController) {
  }

  onAddQuote(quote){
    const alert = this.alertCtrl.create({
      title : 'Add Quote',
      message: 'Are you sure you want to add the quote to favorites?',
      buttons:[
        {text:'OK',
        handler:() =>{
          this.quoteService.addQuoteToFavorites(quote);
          console.log(this.quoteService)
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

  onRemoveQuote(quote){
    const alert = this.alertCtrl.create({
      title : 'Remove Quote',
      message: 'Are you sure you want to remove the quote to favorites?',
      buttons:[
        {text:'OK',
        handler:() =>{
          this.quoteService.removeQuoteFromFavorites(quote);
          console.log(this.quoteService)
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
    this.quote = this.navParams.data;
    console.log(this.quote)
  }

}
