import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions ,SlideModel,SlidesOutputData} from 'ngx-owl-carousel-o';
import { PeriodicElement } from '../view-online-images.component';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.scss']
})
export class ZoomImageComponent implements AfterViewInit {

  @ViewChild('carousel') carousel:CarouselComponent;
  activeSlideIndex: number = 0;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout:4000,
    center: true,
    dots: true,
    nav: true,
    navText: [ '<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>' ],
    autoHeight: true,
    autoWidth: false,
    items:2,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1,
      },
      900: {
        items: 1,
      }
    }
  }
  activeSlides: SlidesOutputData;
  slidesOutputData: SlidesOutputData;
  slidesStore: any[];
 grandTotal:any
 selectedAllImages:any=[]
 selectedImages:any=[]
 allImages:any
 constructor(
  @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ZoomImageComponent>,
   private _photoGalleryService: PhotoGalleryService,
   public dialog: MatDialog,
   private router: Router,
   private toastr: ToastrService
 ) {

 }

 ngOnInit(): void {
  this.allImags()
 this.getGrandTotal(this.selectedAllImages)

 }

 allImags(){
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
      this.getGrandTotal(this.selectedAllImages)
     }
   });
 }
 deleteFromCart(index){
   this.selectedAllImages.splice(index,1);
   this._photoGalleryService._allSelectedImageSubject.next(this.selectedAllImages)
   this.getGrandTotal(this.selectedAllImages)
 }

 getGrandTotal(selectedAllImages){
   let total=0
   this.selectedAllImages.forEach((selectedImg,i) => {
     total = total+selectedImg?.digitalcopyprice
   });
   this.grandTotal =total

 }

 cartCount(index){
  this.selectedImages=[]
 this.allImages[index].isSelected= !this.allImages[index]?.isSelected
 this.allImages.forEach((img,i) => {
  if(img?.isSelected){
    this.selectedImages.push(this.allImages[i])
  }
});
this.selectedAllImages=this.selectedImages
this.toastr.success('Added to cart')
this._photoGalleryService._allSelectedImageSubject.next(this.selectedAllImages)
}

 close() {
  this.dialogRef.close(false);
}

onDelete() {
  this.dialogRef.close({ is_delete: true, ...this.data });
}

okClose() {
  this.dialogRef.close(true);
}
okClose2() {
  this.dialogRef.close();
}

next(){
  this.router.navigate(['view-online-images/shoping-cart']);
}


onSlideChange(event: any) {
  this.activeSlideIndex = event.item.index;
}

ngAfterViewInit() {
  this.carousel.moveByDot(`dot-${this.data?.index}`);
}

}

