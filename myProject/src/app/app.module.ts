import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegistrierungPage} from '../pages/registrierung/registrierung';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { ProfileProvider } from '../providers/profile/profile';
import {SignUpPage} from "../pages/sign-up/sign-up";
import { ProfileDataPage } from '../pages/profile-data/profile-data';
import { CreditDetailPage } from '../pages/credit-detail/credit-detail';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrierungPage,
    SignUpPage,
    ProfileDataPage,
    CreditDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrierungPage,
    SignUpPage,
    ProfileDataPage,
    CreditDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    InAppBrowser,
    ProfileProvider
  ]
})
export class AppModule {}
