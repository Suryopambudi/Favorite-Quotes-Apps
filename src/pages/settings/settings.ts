import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle, ToastController, Config } from 'ionic-angular';
import { SettingsService } from '../../services/settings';
import { NgForm } from "@angular/forms/src/forms";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsSvc : SettingsService, private toastCtrl: ToastController, private config:Config) {
  }

  onToggle (toggle: Toggle){
    this.settingsSvc.setBackground(toggle.checked);
  }

  isChecked(){
    return this.settingsSvc.isAltBackground();
  }
  
  applyConfig(form: NgForm){
    let tabs = form.value.tabs;
    let page = form.value.page;

    this.config.set('android','tabsPlacement',tabs);
    this.config.set('android','pageTransition',page);

    this.config.set('ios','tabsPlacement',tabs);
    this.config.set('ios','pageTransition',page);
   
    const toast = this.toastCtrl.create({
      message: 'Config has been applied.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
