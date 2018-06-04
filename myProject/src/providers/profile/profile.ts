
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  private profile;

  constructor() {
  }

  setProfile(user){
    this.profile = user;
  }

  getProfile(){
    return this.profile;
  }
}
