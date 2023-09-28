import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {
isLoading:any
paymentStatus
  constructor(
    private _photoGalleryService: PhotoGalleryService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._photoGalleryService._paymentStatusSubject.subscribe((data:any) => {
      if (data) {
        this.getPaymentStatus(data?.invoiceId);
      }
    });
  }

  getPaymentStatus(idempotencyID) {
    this.isLoading = true;
    this._photoGalleryService.getPaymentStatus(idempotencyID).subscribe(
      (res: any) => {
        if (res?.status == 'Ok') {
              this.paymentStatus=res?.data
        } else {
          this.isLoading = false;
          this.toastr.error(res?.message ? res?.message : res?.Message);
         this.router.navigateByUrl('/view-online-images/shoping-cart')
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error(
          error?.error?.Message ? error?.error?.Message : error?.error?.message
        );
        this.router.navigateByUrl('/')
      }
    );
  }

}
