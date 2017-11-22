import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import  { authService } from '../../services/auth';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authservice : authService,
              private toastCtrl : ToastController,
              private loader : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin(form){
    let loading = this.loader.create({
      content: 'Please wait...'
    });
    loading.present();
      this.authservice.signin(form.value['email'],form.value['password']).catch(err=>{
        const toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    loading.dismiss();
  }

}
