import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {HomePage} from "../home/home";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the RegistrierungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registrierung',
  templateUrl: 'registrierung.html',
})
export class RegistrierungPage {

  private userData: FormGroup;
  myphoto:any;

  constructor(public navCtrl: NavController, public http:HttpClient, private camera:Camera, public navParams: NavParams, private menu: MenuController, private formBuilder: FormBuilder,  private alertCtrl: AlertController, private restProvider: RestProvider, private profile: ProfileProvider) {
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

  takephoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
     // Handle error
    });
  }
    getImage(){
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum:false
      }
    
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       this.myphoto = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
    
  }
  cropImage(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }
  
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

  } 
 

  
}

