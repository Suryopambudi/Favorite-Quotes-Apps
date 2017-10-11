import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Quote} from '../../data/quotes.interface'; //import the quote variable structure
import { QuotesService } from '../../services/quotes';
/**
 * Generated class for the QuotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  quote : Quote;

  constructor(public navCtrl: NavController, public navParams: NavParams, private quotesService : QuotesService, private viewCtrl: ViewController) {
  }

  ngOnInit(){
    this.quote = this.navParams.data;
    console.log(this.quote);
  }

  favoriteButton_Click(quote) {
    //this.quotesService.addQuoteToFavorites(quote);
  }

  unfavoriteButton_Click() {
    //this.quotesService.removeQuoteFromFavorites(quote);
    this.viewCtrl.dismiss(true);
  }

  cancelButton_Click(){
    this.viewCtrl.dismiss(false);
  }


}
