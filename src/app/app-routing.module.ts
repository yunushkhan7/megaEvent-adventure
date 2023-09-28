import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./module/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule),
  },
  {
    path: 'view-online-images',
    loadChildren: () => import('./module/view-online-images/view-online-images.module').then(m => m.ViewOnlineImagesModule),
  },
  {
    path: 'success-payment',
    loadChildren: () => import('./module/payment-success/payment-success.module').then(m => m.PaymentSuccessModule),
  },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
  {
    path: 'page-not-found',
    loadChildren: () => import('./module/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
