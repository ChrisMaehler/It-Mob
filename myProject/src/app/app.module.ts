import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TestPage } from '../pages/test/test';
import {RegistrierungPage} from '../pages/registrierung/registrierung';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { ProfileProvider } from '../providers/profile/profile';
import {SignUpPage} from "../pages/sign-up/sign-up";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TestPage,
    RegistrierungPage,
    SignUpPage
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
    ListPage,
    TestPage,
    RegistrierungPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    ProfileProvider
  ]
})
export class AppModule {}
