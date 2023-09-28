import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
import { ToastrService } from 'ngx-toastr';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';
import { Location } from '@angular/common';
export interface PeriodicElement {
  product: string;
  price: string;
  pic: string;
}

@Component({
  selector: 'app-view-online-images',
  templateUrl: './view-online-images.component.html',
  styleUrls: ['./view-online-images.component.scss'],
})
export class ViewOnlineImagesComponent {
  allImages: any;
  selectedAllImages: any;
  selectedImages: any = [];
  isLoading = false;
  constructor(
    private _photoGalleryService: PhotoGalleryService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
  ) {}

  ngOnInit(): void {
   this.allImags2()
    this._photoGalleryService._urlParamsSubject.subscribe((booking) => {
      if (booking) {
        if(!this.allImages){
          this.getEventPics(booking);
        }
      }else{
        this.location.back()
      }
    });
  }

  getEventPics(QRCodeValue) {
    this.isLoading = true;
    this._photoGalleryService.getEventPics(QRCodeValue).subscribe(
      (res: any) => {
        if (res?.status == 'Ok') {
          this.isLoading = false;
          this.allImages = res?.data;
          this.getAllPriceSetting();
        } else {
          this.isLoading = false;
          this.toastr.error(res?.message ? res?.message : res?.Message);
          this.router.navigateByUrl('/')
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

  getAllPriceSetting() {
    this.isLoading = true;
    this._photoGalleryService.getAllPriceSetting().subscribe(
      (res: any) => {
        if (res?.data) {
          this.isLoading = false;
          if (this.allImages) {
            this.allImages.forEach((img, i) => {
              this.allImages[i]['isSelected'] = false;
              this.allImages[i]['digitalcopyprice'] =
                res?.data[0]?.digitalcopyprice;
            });
          }
        } else {
          this.isLoading = false;
          this.toastr.error(res?.message ? res?.message : res?.Message);
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error(
          error?.error?.Message ? error?.error?.Message : error?.error?.message
        );
      }
    );
  }

  allImags2(){
    let selectedImages=[]
     this._photoGalleryService._alllImageInfoSubject.subscribe((res) => {
       if (res) {
        this.allImages=res
         this.allImages.forEach((img,i) => {
          if(img?.isSelected){
            selectedImages.push(img)
          }
        });
         this.selectedAllImages=selectedImages
       }
     });
   }

  cartCount(index) {
    this.selectedImages=[]
    this.allImages[index].isSelected = !this.allImages[index]?.isSelected;
    this.allImages.forEach((img, i) => {
      if (img?.isSelected) {
        this.selectedImages.push(img)
      }
    });
    this.selectedAllImages = this.selectedImages;
    this.toastr.success('Added to cart')
    this._photoGalleryService._allSelectedImageSubject.next(this.selectedAllImages);
  }

  next() {
    this._photoGalleryService._alllImageInfoSubject.next(this.allImages);
    this.router.navigate(['view-online-images/shoping-cart']);
  }

  zoom() {
    this._photoGalleryService._alllImageInfoSubject.next(this.allImages);
    this.router.navigate(['view-online-images/zoom-image']);
  }

  zoomDilog(i) {
    this._photoGalleryService._alllImageInfoSubject.next(this.allImages);
    const dialogRef = this.dialog.open(ZoomImageComponent, {
      width: '100%',
      height: '100vh',
      data: {
        allImages:this.allImages,
        index:i,
      },
      panelClass: 'slide-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._photoGalleryService._allSelectedImageSubject.subscribe((res) => {
          if (res) {
            this.selectedAllImages = res;
          }
        });
      }
    });
  }
}
