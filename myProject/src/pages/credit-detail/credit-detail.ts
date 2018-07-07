import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the CreditDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit-detail',
  templateUrl: 'credit-detail.html',
})
export class CreditDetailPage {

  credit: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider, private browser: InAppBrowser) {
    this.credit = this.navParams.get('credit');
    console.log(this.credit);
  }

  openLink(url){
    this.browser.create(url, '_system')
  }

}
