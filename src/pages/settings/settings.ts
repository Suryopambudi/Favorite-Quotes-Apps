import { Component } from '@angular/core';
import { NavController, NavParams, Toggle } from 'ionic-angular';
import { SettingsService } from '../../services/settings';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsSvc : SettingsService) {
  }

  onToggle (toggle: Toggle){
    this.settingsSvc.setBackground(toggle.checked);
  }

  isChecked(){
    return this.settingsSvc.isAltBackground();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
