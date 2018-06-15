import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private users;
  private creditData = {};

  constructor(public navCtrl: NavController, private restProvider: RestProvider, private profile: ProfileProvider) {
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
  getUsers1(){
    this.restProvider.getUsers().subscribe(data => {
      this.users = data;
      this.profile.setProfile(this.users[0]);

      console.log(this.profile.getProfile())
    })
  }

  // get single user by id
  getUserById1(id){
    this.restProvider.getUserById(id).subscribe(data => {
      console.log(data);
    })
  }

  postCreditData(){
    // console.log(this.creditData)
    this.restProvider.createCreditData(this.creditData).subscribe(response => {
      console.log(response);
    }, error =>  {
      console.log(error);
    });

  }
}
