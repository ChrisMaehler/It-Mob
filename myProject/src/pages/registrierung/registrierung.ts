import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the RegistrierungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrierung',
  templateUrl: 'registrierung.html',
})
export class RegistrierungPage {

private userData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider, private profile: ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrierungPage');
  }

  postUserData(){
    // console.log(this.creditData)
    this.restProvider.createUser(this.userData).subscribe(response => {
      console.log(response);
    }, error =>  {
      console.log(error);
    });

  }


}
