import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  constructor(
    private _photoGalleryService: PhotoGalleryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    let booking:any
    this._photoGalleryService._urlParamsSubject.subscribe((booking) => {
      if (booking) {
        booking=booking
      }else{
       this.location.back()
      }
    });
   }

  next(){
    this.router.navigateByUrl('/view-online-images');
  }
}
