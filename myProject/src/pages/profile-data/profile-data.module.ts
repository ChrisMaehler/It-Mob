import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDataPage } from './profile-data';

@NgModule({
  declarations: [
    ProfileDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileDataPage),
  ],
})
export class ProfileDataPageModule {}
