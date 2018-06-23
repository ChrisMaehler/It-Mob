import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ProfileDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-data',
  templateUrl: 'profile-data.html',
})
export class ProfileDataPage {

  private myData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private profile: ProfileProvider, private rest: RestProvider) {
    this.myData = this.profile.getProfile();
    console.log(this.myData);
  }

  ionViewDidLoad() {
  
  }

  saveData(){
    this.rest.editUser(this.myData).subscribe((response: any) => {
      console.log(response)
    });
  }

}
