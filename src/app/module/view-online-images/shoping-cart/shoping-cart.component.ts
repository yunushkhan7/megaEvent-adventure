import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent {
  addForm: FormGroup;
 grandTotal:Number
 booking:string
 selectedImagesNames:any=[]
  selectedAllImages:any=[]
  isLoading=false
  allImages:any
  EMAIL_REGEX= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  constructor(
    private fb: FormBuilder,
    private _photoGalleryService: PhotoGalleryService,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this._photoGalleryService._urlParamsSubject.subscribe((booking) => {
      if (booking) {
      this.booking=booking
      }else{
        this.location.back()
      }
    });
    this.createForm()
       this.allImags()
  }

  allImags(){
    this.selectedImagesNames=[]
    this._photoGalleryService._alllImageInfoSubject.subscribe((res) => {
      if (res) {
        this.allImages=res
        this.allImages.forEach((img,i) => {
          if(img?.isSelected){
            this.selectedAllImages.push(img)
            this.selectedImagesNames.push(img?.fileName)
          }

        });
       this.getGrandTotal(this.selectedAllImages)
      }else{
        this.location.back();
      }
    });
  }
  deleteFromCart(index){
   // this.selectedAllImages.splice(index,1);
   let selectedAllImages=[]
   this.selectedImagesNames=[]
    this.allImages[index].isSelected = !this.allImages[index]?.isSelected;
    this.allImages.forEach((img,i) => {
      if(img?.isSelected){
        selectedAllImages.push(img)
        this.selectedImagesNames.push(img?.fileName)
      }
    });

    this.selectedAllImages=selectedAllImages
    this.toastr.success('Deleted from cart')
    this.getGrandTotal(this.selectedAllImages)
  }

  getGrandTotal(selectedAllImages){
    let total=0
    selectedAllImages.forEach((selectedImg,i) => {
      total = total+selectedImg?.digitalcopyprice
    });
    this.grandTotal =total

  }

  createForm(){
    this.addForm = this.fb.group({
      email: [null, Validators.compose([Validators.required,Validators.pattern(this.EMAIL_REGEX)])],
      promoCode: [null],
    });
  }



  submitForm(): void {
      if (this.addForm.valid) {
        const payload = {
          email: this.addForm.value.email.toLowerCase(),
          qrValue: this.booking,
          imageNames: this.selectedImagesNames,
          amount: this.grandTotal,
        };
        this.isLoading=true
         this._photoGalleryService.requestPayment(payload).subscribe((res:any) => {
          if (res?.status=='Ok') {
            this._photoGalleryService._paymentStatusSubject.next(res?.data)
            this.isLoading=false
             window.open(res?.data?.paymentUrl, '_self');
          } else {
            this.isLoading=false
            this.toastr.error(res?.message ? res?.message : res?.Message);
          }
        },
          (error) => {
            this.isLoading=false
            this.toastr.error(error?.error?.Message ? error?.error?.Message : error?.error?.message);
          }
        );
      }
    }

    back(){
      this._photoGalleryService._alllImageInfoSubject.next(this.allImages)
      this._photoGalleryService._urlParamsSubject.subscribe((booking) => {
        if (booking) {
       this.location.back()
        }
      });
    }

}
