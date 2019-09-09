import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from 'app/model/accommodation/accommodation';
import { AccommodationSearch } from 'app/model/accommodation/accommodationSearch';
import { AccommodationReservation } from 'app/model/accommodation/accommodationReservation';
import { Image } from 'app/model/global-parameters/image';
import { Review } from 'app/model/korisnik/review';
import { TipSmestaja } from 'app/model/global-parameters/tipSmestaja';
import { Usluga } from 'app/model/global-parameters/usluge';

@Injectable()
export class AccommodationService {

  baseUrl: string = environment.baseUrl + '/smestaj-service/rest/';

  constructor(private http: HttpClient) { }

  search(accommodationSearch: AccommodationSearch): Observable<Accommodation[]> {
    return this.http.post<Accommodation[]>(this.baseUrl + `smestaj/pretraga`, accommodationSearch);
  }

  getAll(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.baseUrl + "smestaj");
  }

  getOne(accommodationId: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(this.baseUrl + `accommodationservice/hotels/1/rooms/${accommodationId}`);
  }

  book(accommodationReservation: AccommodationReservation, userId: number): Observable<AccommodationReservation> {
    return this.http.post<AccommodationReservation>(this.baseUrl + `korisnici/${userId}/rezervacije`, accommodationReservation);
  }

  getUserHistory(userId: number): Observable<AccommodationReservation[]> {
    return this.http.get<AccommodationReservation[]>(this.baseUrl + `korisnici/${userId}/rezervacije/istorija`);
  }

  getUserReservations(userId: number): Observable<AccommodationReservation[]> {
    return this.http.get<AccommodationReservation[]>(this.baseUrl + `korisnici/${userId}/rezervacije/aktivne`);
  }

  getReviewsForAccommodation(accommodationId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + `rating/rate/room/${accommodationId}`);
  }

  cancel(accommodationId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + `rezervacije/${accommodationId}`);
  }

  updateRating(accommodationId: number, ocena: string): Observable<Accommodation>{
    let params = new HttpParams();
    params = params.append('ocena', ocena);
    return this.http.put<Accommodation>(this.baseUrl + `smestaj/${accommodationId}`, {}, {params : params});
  }

  getImagesForRoom(roomId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl + `accommodationservice/reservations/room/${roomId}`);
  }

  getAllAccomodationTypes(): Observable<TipSmestaja[]> {
    return this.http.get<TipSmestaja[]>(this.baseUrl + "tipovi");
  }

  getAllAddiionalServices(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.baseUrl + "usluge");
  }

  createAccommodationType(newAccommodationType: TipSmestaja): Observable<TipSmestaja> {
    return this.http.post<TipSmestaja>(this.baseUrl + "tipovi", newAccommodationType);
  }

  createAdditionalService(newAdditionaService: Usluga): Observable<Usluga> {
    return this.http.post<Usluga>(this.baseUrl + "usluge", newAdditionaService);
  }

  deleteAccommodationType(idAccommodationType: number): Observable<{}> {
    return this.http.delete(this.baseUrl + `tipovi/${idAccommodationType}`);
  }

  deleteAdditionalService(idAdditionalService: number): Observable<{}> {
    return this.http.delete(this.baseUrl + `usluge/${idAdditionalService}`);
  }

  updateAccomodationType(accommodationType: TipSmestaja): Observable<TipSmestaja> {
    return this.http.put<TipSmestaja>(this.baseUrl + `tipovi/${accommodationType.id}`, accommodationType);
  }

  updateAddiionalService(additionalService: Usluga): Observable<Usluga> {
    return this.http.put<Usluga>(this.baseUrl + `usluge/${additionalService.id}`, additionalService);
  }

}
