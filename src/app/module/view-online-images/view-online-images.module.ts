import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOnlineImagesComponent } from './view-online-images.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
      {
        path: "",
        component: ViewOnlineImagesComponent,

      },

      {
        path: "zoom-image",
        component: ZoomImageComponent,

      },

      {
        path: "shoping-cart",
        component: ShopingCartComponent,
      },
];

@NgModule({
  declarations: [
    ViewOnlineImagesComponent,
     ZoomImageComponent,
     ShopingCartComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialExModule,
    SharedModule,
    // I18nModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class ViewOnlineImagesModule { }
