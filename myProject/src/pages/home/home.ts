import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image: string;


  private users;
  private creditData = {};

  constructor(public navCtrl: NavController, private restProvider: RestProvider, private profile: ProfileProvider, private camera: Camera, private alertCtrl: AlertController) {
    console.log("TEST")
    this.getUsers1();
    this.getUserById1(6);
    // var user = {firstname: "Max", lastname: "Mustermann"};
    // this.restProvider.createUser(user).subscribe(response => {
    //   console.log(response);
    //   this.restProvider.getUsers().subscribe( data => {
    //     console.log(data);
    //   });
    // }, error =>  {
    //   console.log(error);
    // });
  }

  // get all users, set first user as profile
  getUsers1() {
    this.restProvider.getUsers().subscribe(data => {
      this.users = data;
      this.profile.setProfile(this.users[0]);

      console.log(this.profile.getProfile())
    })
  }

  // get single user by id
  getUserById1(id) {
    this.restProvider.getUserById(id).subscribe(data => {
      console.log(data);
    })
  }

  postCreditData() {
    // console.log(this.creditData)
    this.restProvider.createCreditData(this.creditData).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });

  }

  ngOnInit() {
    this.photos = [];

  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();


    }, (err) => {
      // Handle error
    });

  }

  deletePhoto(index) {

  
      const confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this pic?',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
        
            }
          },
          {
            text: 'Yes',
            handler: () => {
                  this.photos.splice(index,1);
            }
          }
        ]
      });
      confirm.present();
  }

}
