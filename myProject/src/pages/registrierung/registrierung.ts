import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {HomePage} from "../home/home";
import { Vibration } from '../../../node_modules/@ionic-native/vibration';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private vibration: Vibration, private menu: MenuController, private formBuilder: FormBuilder,  private alertCtrl: AlertController, private restProvider: RestProvider, private profile: ProfileProvider) {
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
      yearlyincome: ['', Validators.required],
      profession: ['', Validators.required],
      house_owner: ['false', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave(){
  }

  postUserData(){
    var myData = this.userData.value;

    this.restProvider.getPersonaGroup(myData.profession, myData.house_owner).subscribe((persona_response: any) => {
      var age = this.getAge(myData.birthdate);
      if( age < 18) {
        this.vibration.vibrate(1000);
        this.under18Alert();
        return;
      }

      for(let data of persona_response){
        if(myData.yearlyincome >= data.yearly_income_from && myData.yearlyincome <= data.yearly_income_to && age >= data.age_class_from && age <= data.age_class_to){
          myData.persona_id = data.persona_id;
        }
      }

      // console.log(this.userData.value)
      this.restProvider.createUser(myData).subscribe(response => {
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

  under18Alert(){
    let alert = this.alertCtrl.create({
      title: 'Unter 18',
      subTitle: 'Man muss mindestens 18 Jahre alt sein!',
      buttons: ['OK']
    });
    alert.present();
  }

  public getAge(birthday){

    var date = new Date(birthday);
    var birthMonth = date.getMonth();
    var birthDay = date.getDay();
    var birthYear = date.getFullYear();

    var todayDate = new Date(),
    todayYear = todayDate.getFullYear(),
    todayMonth = todayDate.getMonth(),
    todayDay = todayDate.getDate(),
    age = todayYear - birthYear;

    if (todayMonth < birthMonth - 1) {
        age--;
    }

    if (birthMonth - 1 === todayMonth && todayDay < birthDay) {
        age--;
    }

    return age;
  }
}
