import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {ImpressumPage} from "../pages/impressum/impressum";
import {ProfileProvider} from "../providers/profile/profile";
import { ProfileDataPage } from '../pages/profile-data/profile-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignUpPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private profile: ProfileProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Meine Daten', component: ProfileDataPage },
      { title: 'Impressum', component: ImpressumPage },
      { title: 'Logout', component: null},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if(page.component) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    } else {
      // logout:
      // 1) Setze Profil auf null
      // 2) Geh zur SignUp Seite
      this.profile.setProfile(null);
      this.nav.setRoot(SignUpPage);
    }
  }

}
