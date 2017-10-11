import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Quote } from '../../data/quotes.interface';
import quotes from '../../data/quotes'
import { QuotesPage } from '../quotes/quotes';
/**
 * Generated class for the LibraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit{
  test:String = "hahaha";

  quoteCollection: {category: string, quotes: Quote[], icon : string;}[];
  ngOnInit(){
    this.quoteCollection = quotes;
    console.log(this.quoteCollection);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }

  onButtonCatClick(quote){
    this.navCtrl.push(QuotesPage, quote)
  }

}
