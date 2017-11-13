import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import  { authService } from '../../services/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
                private authservice : authService,
                private toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(form){
    this.authservice.signup(form.value['email'],form.value['password']).catch(err => {
        const toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
    })
  }
}
