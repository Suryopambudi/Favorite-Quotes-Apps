import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { IonicPage, NavController, NavParams, MenuController, LoadingController} from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { authService } from '../services/auth';
import { QuotesService } from '../services/quotes';
import  firebase  from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  tabsPage = TabsPage;
  settingsPage = SettingsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  signin = false;
  
  @ViewChild('sideMenuContent') nav:NavController
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private menuCtrl : MenuController, private authservice : authService, 
    private quotes: QuotesService, private loader : LoadingController) {
    platform.ready().then(() => {
      firebase.initializeApp({
        apiKey : "AIzaSyAbyfF44Gp_MyXjhSf9mdR338bxTB3Lp7Q",
        authDomain : "favoritequotesapp-9c44b.firebaseapp.com"
      });

      firebase.auth().onAuthStateChanged(user => {
          if(user){
            this.signin = true;
            let loading = this.loader.create({
              content: 'Please wait...'
            });
            loading.present();
            this.authservice.currentUser().getIdToken().then(
              (token: string) => {
                this.quotes.getdata(token).subscribe(
                  () => {
                    console.log('berhasil');
                  },
                  error => {
                    console.log('gagal');
                  }
                )
              }
            );
            loading.dismiss();
            this.nav.setRoot(TabsPage);
          }
          else{
              this.signin = false;
              this.nav.setRoot(SigninPage);
              this.menuCtrl.close();
          }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page : any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout(){
    this.authservice.logout();
  }
}

