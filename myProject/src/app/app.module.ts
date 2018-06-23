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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrierungPage,
    SignUpPage,
    ProfileDataPage
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
    ProfileDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    ProfileProvider
  ]
})
export class AppModule {}
