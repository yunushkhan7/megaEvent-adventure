import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { OnlineImagesComponent } from './online-images/online-images.component';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
      {
        path: "",
        component: OnlineImagesComponent,

      },
      {
        path: "terms-and-conditions",
        component: TermsAndConditionsComponent,

      },
];

@NgModule({
  declarations: [
    TermsAndConditionsComponent,
    OnlineImagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialExModule,
    SharedModule,
    // I18nModule
    TranslateModule

  ]
  , providers: [
  ]
})
export class TermsAndConditionsModule { }
