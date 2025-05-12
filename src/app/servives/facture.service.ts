import { Injectable, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private httpClient: HttpClient) { }


   /**
   * List de payment de chaque étudiant par code.
   */
   public getListFacturesByPayment(paymentId: number): Observable<Array<Facture>> {
    return this.httpClient.get<Array<Facture>>(environment.backendHost+"/facturesPayment/"+paymentId);
  }

  public modifierPaymentFactures(formData: any): Observable<void> {
    console.log(formData);
    return this.httpClient.put<void>(environment.backendHost+"/updateFacture", formData);
  }
}
