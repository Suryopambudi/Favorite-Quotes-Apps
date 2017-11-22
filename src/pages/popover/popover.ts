import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController, ToastController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public toastCtrl: ToastController, private quotesService: QuotesService,private authservice : authService, private loader : LoadingController) {
  }

  close(){
    this.viewCtrl.dismiss();
  }

  presentToast(data){
    this.quotesService.addQuoteToFavorites(data);
    const toast = this.toastCtrl.create({
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
    let loading = this.loader.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authservice.currentUser().getToken()
    .then(
      (token:string) => {
        //save the data!
        this.quotesService.storeList(token)
        .subscribe(
          () => {
            const toast = this.toastCtrl.create({
                message : 'Your Favorite Quotes has been saved',
                duration : 3000,
                position : 'bottom'
            });
            toast.present();
          },
          error => {
            const toast = this.toastCtrl.create({
                message : error,
                duration : 3000,
                position : 'bottom'
            });
            toast.present();
          }
        )
      }
    );
    loading.dismiss();
    this.close();
  }
  clearAll(){
    let loading = this.loader.create({
      content: 'Please wait...'
    });
    loading.present();
    this.quotesService.removeAllQuote();
    this.authservice.currentUser().getToken()
    .then(
      (token:string) => {
        this.quotesService.storeList(token)
        .subscribe(
          () => {
            const toast = this.toastCtrl.create({
                message : 'Your Favorite Quotes has been cleared out',
                duration : 3000,
                position : 'bottom'
            });
            toast.present();
          },
          error => {
            const toast = this.toastCtrl.create({
                message : error,
                duration : 3000,
                position : 'bottom'
            });
            toast.present();
          }
        )
      }
    );
    loading.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
