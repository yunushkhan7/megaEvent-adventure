import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhotoGalleryService } from 'src/app/service/photo-gallery.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-online-images',
  templateUrl: './online-images.component.html',
  styleUrls: ['./online-images.component.scss']
})
export class OnlineImagesComponent {
  booking:any
  isLoading = false;
  constructor(
    private _photoGalleryService: PhotoGalleryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (params['booking']) {
        this.booking=params['booking']
        //  this.logIn()
        this._photoGalleryService._urlParamsSubject.next(this.booking)
        this.router.navigate(['terms-and-conditions']);
      }else{
        this.router.navigateByUrl('/');
      }

    });




  }

  logIn() {
    this.isLoading = true;
    let logInfData = {
      userName: 'Ajay',
      password: 'Password@12345',
    };
    this._photoGalleryService.login(logInfData).subscribe(
      (response) => {
        if (response) {
          this.isLoading = false;
          if (response.sucess) {
            localStorage.setItem('userGuid', response.userGuid);
            localStorage.setItem('email', response.email);
            sessionStorage.setItem('token', response?.jwtToken);
            this._photoGalleryService._urlParamsSubject.next(this.booking)
            this.router.navigate(['terms-and-conditions']);
          }
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
}
