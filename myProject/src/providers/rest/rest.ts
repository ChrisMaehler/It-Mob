import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private BASE_URL = "/api";  // "https://creditapp-cf3d.restdb.io/rest"
  private USERS_URL = this.BASE_URL + '/appuser';
  private CREDIT_URL = this.BASE_URL + '/creditdata';

  constructor(public http: HttpClient) {
  }

  getData(){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.CREDIT_URL, {headers: headers});
  }

  getUsers(){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.USERS_URL, {headers: headers});
  }

  getUserById(id){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.USERS_URL+'?q={"user_id":'+ id +'}', {headers: headers});
  }

  createUser(user){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.post(this.USERS_URL, user, {headers: headers});
  }

  createCreditData(creditData){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.post(this.CREDIT_URL, creditData, {headers: headers});
  }

}
