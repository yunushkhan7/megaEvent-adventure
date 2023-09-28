import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: "",
    component: PageNotFoundComponent,

  },
];

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialExModule,
    SharedModule,
    TranslateModule
    // I18nModule
  ]
})
export class PageNotFoundModule { }
