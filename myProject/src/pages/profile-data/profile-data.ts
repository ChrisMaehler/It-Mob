import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private profile: ProfileProvider, private rest: RestProvider) {
    this.myData = this.profile.getProfile();
  }

  ionViewDidLoad() {
  
  }

  private saveData(){
    this.showLoading();

    this.rest.getPersonaGroup(this.myData.profession, this.myData.house_owner).subscribe((persona_response: any) => {
      var age = this.getAge(this.myData.birthdate);
      
      for(let data of persona_response){
        if(this.myData.yearlyincome >= data.yearly_income_from && this.myData.yearlyincome <= data.yearly_income_to && age >= data.age_class_from && age <= data.age_class_to){
          this.myData.persona_id = data.persona_id;
        }
      }

      this.rest.editUser(this.myData).subscribe((response: any) => {
        this.profile.setProfile(response);
        this.myData = this.profile.getProfile();
        this.showToast('Deine Daten wurde aktualisiert!');
        this.loading.dismiss();
      });
    }, error => {
      console.log(error)
      this.showToast('Ein Fehler ist aufgetreten!')
      this.loading.dismiss();
    });
  }

  public showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
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
