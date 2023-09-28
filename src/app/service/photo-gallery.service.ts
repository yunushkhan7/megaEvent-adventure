import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {
  API_URL: string = environment.APIEndpoint;
  public _alllImageInfoSubject = new BehaviorSubject('');
  public _alllImageInfo = this._alllImageInfoSubject.asObservable()
  public _allSelectedImageSubject = new BehaviorSubject('');
  public _allSelectedImage = this._allSelectedImageSubject.asObservable()
  public _urlParamsSubject = new BehaviorSubject('');
  public _urlParams = this._urlParamsSubject.asObservable()
  public _paymentStatusSubject = new BehaviorSubject('');
  public _paymentStatus = this._paymentStatusSubject.asObservable()

  constructor(
    private http: HttpClient,
  ) { }

  login(data): Observable<any> {
    return this.http.post(`${this.API_URL}PhotoKiosk/AuthenticateKiosk`, data);
  }

  getEventPics(QRCodeValue): Observable<any> {
    return this.http.get(`${this.API_URL}PhotoKiosk/GetEventPicsForOnlineGallery?QRCodeValue=${QRCodeValue}`);
  }

  getAllPriceSetting(): Observable<any> {
    return this.http.post(`${this.API_URL}PriceSettings/GetAllPriceSettings`, {});
    }

    requestPayment(data){
      return this.http.post(`${this.API_URL}Payment/RequestPayment`,data);
    }

    getPaymentStatus(idempotencyID): Observable<any> {
      return this.http.get(`${this.API_URL}Payment/GetPaymentStatusIdempotencyID?idempotencyID=${idempotencyID}`);
    }
}

