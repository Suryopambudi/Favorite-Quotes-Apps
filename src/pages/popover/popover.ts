import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController, ToastController } from 'ionic-angular';
import { QuotesService } from '../../services/quotes';
import { authService } from '../../services/auth';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public tostCtrl: ToastController, private quotesService: QuotesService,private authservice : authService) {
  }

  close(){
    this.viewCtrl.dismiss();
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
   saveFirebase(){
    this.authservice.getActiveUser().getToken()
    .then(
      (token:string) => {
        //save the data!
        this.quotesService.storeList(token)
        .subscribe(//IDONTKNOW
        );
      }
    )
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
