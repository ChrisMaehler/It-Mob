import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {RestProvider} from "../../providers/rest/rest";
import {ProfileProvider} from "../../providers/profile/profile";
import {HomePage} from "../home/home";
import {RegistrierungPage} from "../registrierung/registrierung";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private credentials: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private formBuilder: FormBuilder, private alertCtrl: AlertController, private restProvider: RestProvider, private profile: ProfileProvider) {
    this.credentials = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave(){
    
  }

  // Methode für Sign-In. Da mock-up, wird username+password Validierung auf dem Client ausgeführt
  signIn(){
    // console.log(this.credentials.value.username)
    var username = this.credentials.value.username;
    var password = this.credentials.value.password;

    // data: any notwendig, da es sonst als Object betrachtet wird statt JSON
    this.restProvider.getUserByUsername(username).subscribe((data: any) => {
      // Response ist Array
      var user = data[0];

      // User nicht gefunden.
      if(user === undefined){
        this.noUserAlert(username);
      }
      else{
        // Password stimmt nicht
        if(user.password != password){
          this.wrongPasswordAlert();
        }
        else{
          // Passwort stimmt überein:
          // 1. Profil setzen
          // 2. HomePage als Root setzen (damit mit Back nicht zurückgegangen werden kann) und zu HomePage wechseln
          this.menu.swipeEnable(true, 'menu1');
          this.profile.setProfile(user);
          this.navCtrl.setRoot(HomePage);
        }
      }

    }, error => {
      // TODO: Ordentliche Meldung im Fehlerfall
      console.log(error)
    });
  }

  goToRegister(){
    this.navCtrl.push(RegistrierungPage);
  }


  wrongPasswordAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falsches Passwort',
      subTitle: 'Das eingegebene Passwort ist falsch!',
      buttons: ['OK']
    });
    alert.present();
  }

  noUserAlert(username) {
    let alert = this.alertCtrl.create({
      title: 'User existiert nicht',
      subTitle: 'Es existiert kein User mit Username ' + username + '!',
      buttons: ['OK']
    });
    alert.present();
  }


}
