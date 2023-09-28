import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from './payment-success.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: "",
    component: PaymentSuccessComponent,

  },
];

@NgModule({
  declarations: [
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialExModule,
    SharedModule,
    TranslateModule
  ]
})
export class PaymentSuccessModule { }
