import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {HomePage} from "../home/home";
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

  private userData: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private formBuilder: FormBuilder,  private alertCtrl: AlertController, private restProvider: RestProvider, private profile: ProfileProvider) {
    this.userData = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.minLength(3)],
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      country: ['', Validators.required],
      birthdate: ['', Validators.required],  
      sex: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      yearlyincome: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave(){
  }

  postUserData(){
    // console.log(this.userData.value)
    this.restProvider.createUser(this.userData.value).subscribe(response => {
      this.menu.swipeEnable(true, 'menu1');
      // Response == User aus DB, wird also in profile gesetzt
      this.profile.setProfile(response);
      // HomePage als Root setzen (damit mit Back nicht zurückgegangen werden kann) und zu HomePage wechseln
      this.navCtrl.setRoot(HomePage);
      //
    }, error =>  {
      console.log(error);
      this.userExistsAlert(this.userData.value.username);
    });
  }


  userExistsAlert(username){
    let alert = this.alertCtrl.create({
      title: 'User existiert bereits!',
      subTitle: 'Es existiert bereits ein User mit Username ' + username +'!',
      buttons: ['OK']
    });
    alert.present();
  }

}
