import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private BASE_URL = "/api";
  private USERS_URL = this.BASE_URL + '/appuser';
  private CREDIT_URL = this.BASE_URL + '/creditdatacollection';
  private PERSONA_URL = this.BASE_URL + '/personagroupcollection';
  private ACTIVITY_URL = this.BASE_URL + '/activitycollection';

  constructor(public http: HttpClient) {
  }

  // TODO: Rename to getCreditData()
  getData(){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.CREDIT_URL+'?h={"$orderby":{"name":1,"volume_from":1,"duration_month":1}}', {headers: headers});
  }

  getCreditDataFiltered(name, value_from, duration){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.CREDIT_URL+'?q={"name":"'+ name +'", "volume_from":'+value_from+', "duration_month":'+duration+'}', {headers: headers});
  }

  getUsers(){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.USERS_URL, {headers: headers});
  }

  getUserById(id){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.USERS_URL+'?q={"user_id":'+ id +'}', {headers: headers});
  }

  getUserByUsername(username){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.USERS_URL+'?q={"username":"'+ username +'"}', {headers: headers});
  }

  createUser(user){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.post(this.USERS_URL, user, {headers: headers});
  }

  editUser(user){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.put(this.USERS_URL+'/'+user._id, user, {headers: headers});
  }

  createCreditData(creditData){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.post(this.CREDIT_URL, creditData, {headers: headers});
  }

  getPersonaGroup(profession, house_owner){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.PERSONA_URL+'?q={"profession":"'+ profession +'", "house_owner":"'+house_owner+'"}', {headers: headers});
  }

  getActivity(persona_id){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.ACTIVITY_URL+'?q={"persona_id":'+ persona_id +'}&h={"$orderby":{"activity":-1}}', {headers: headers});
  }

  getActivityPlusOne(persona_id, credit_id){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.get(this.ACTIVITY_URL+'?q={"persona_id":'+ persona_id +', "credit_id":'+ credit_id + '}', {headers: headers});
  }

  putActivityPlusOne(activity){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.put(this.ACTIVITY_URL+'/'+activity._id, activity, {headers: headers});
  }

  createActivityPlusOne(activity){
    var headers = new HttpHeaders().set('cache-control','no-cache').set('x-apikey','874dc4397f95158840d71f3559fb99ce18722');
    return this.http.post(this.ACTIVITY_URL, activity, {headers: headers});
  }

}
