import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProfileProvider } from '../../providers/profile/profile';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  private users;
  private creditData = {};

  private credit_names = new Map();
  private credit_values = new Map();
  private credit_durations = new Map();

  private credits;
  private values;
  private durations;

  private selected_credit_name;
  private selected_credit_value;
  private selected_credit_duration;

  private credits_isDisabled = true;
  private values_isDisabled = true;
  private durations_isDisabled = true;

  private results_credit_data = [];
  private results_activity_data = [];

  private sorted_credit_data = [];

  private loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private restProvider: RestProvider, private profile: ProfileProvider) {
    this.getCreditData().subscribe();    
  }

  
  getCreditData(){
    return Observable.create((observer) => {
        this.restProvider.getData().subscribe((data: any)=>{
        this.creditData = data;
        this.getUniqueMaps(this.creditData);
        this.credits = this.getCreditNames();
        
        this.credits_isDisabled = false;
        observer.next();
        observer.complete();
      })
    });
  }

  getUniqueMaps(creditData){
    for(let data of creditData){
      this.credit_names.set(data.name, '');
      this.credit_values.set(data.volume_from+'-'+data.volume_to, data.name);
      this.credit_durations.set(data.duration_month,data.name);
    }
  }


  getCreditNames(){
    
    let results = [];

    this.credit_names.forEach((value, key) => {
      results.push(key);
    });

    return results;
  }

  getCreditValues(creditName){
    let results = [];

    this.credit_values.forEach((value, key)=> {

      if(value == creditName){
        results.push(key);
      }
    });
    
    return results;
  }

  getCreditDurations(creditName){
    let results = [];

    this.credit_durations.forEach((value, key)=> {

      if(value == creditName){
        results.push(key);
      }
    });

    return results;
  }

  onCreditSelected(event){
    this.values = this.getCreditValues(this.selected_credit_name);
    this.values_isDisabled = false;
  }

  onCreditValueSelected(event){
    this.durations = this.getCreditDurations(this.selected_credit_name);
    this.durations_isDisabled = false;
  }

  onCreditDurationSelected(event){
    
    this.showLoading();
    let value_from = parseInt(this.selected_credit_value.split('-')[0]);
    this.restProvider.getCreditDataFiltered(this.selected_credit_name, value_from, this.selected_credit_duration).subscribe((results: any)=>{
      this.results_credit_data = results;

      this.restProvider.getActivity(this.profile.getProfile().persona_id).subscribe((activities:any)=>{
        this.results_activity_data = activities;
        this.sorted_credit_data = this.sortCreditData(this.results_credit_data, this.results_activity_data);

        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
      });
    });
  }


  sortCreditData(credit_data, activities){
    let results = [];
    
    activities.forEach((activity)=>{
      for(let i=0; i < credit_data.length; i++){
        let tmp_credit = credit_data[i];
        if(tmp_credit != null && activity.credit_id == tmp_credit.credit_id){
          tmp_credit.interest_rate_from = Math.round(tmp_credit.interest_rate_from * 100);
          results.push(tmp_credit);
          credit_data[i] = null;
        }
      }
    });

    for(let i = 0; i < credit_data.length; i++){
      let tmp_credit = credit_data[i];
      if(tmp_credit != null){
        tmp_credit.interest_rate_from = Math.round(tmp_credit.interest_rate_from * 100);
        results.push(tmp_credit);
      }
    }

    return results;
  }

  creditClicked(credit){
    console.log(credit)
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }


}
