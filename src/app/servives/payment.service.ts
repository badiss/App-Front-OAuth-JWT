import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Payment } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }


  /**
   * List de payment
   */
  public getListPayment(): Observable<Array<Payment>> {
    return this.httpClient.get<Array<Payment>>(environment.backendHost+"/listPayment");
  }

   /**
   * List de payment de chaque étudiant par code.
   */
   public getListPaymentsStudent(code: string): Observable<Array<Payment>> {
    return this.httpClient.get<Array<Payment>>(environment.backendHost+"/students/"+code+"/payments");
  }

  public ajouterPayment(formData: any): Observable<Payment> {
    return this.httpClient.post<Payment>(environment.backendHost+"/addPayment", formData);
  }

  public getPaymentDetails(idPayment: number) {
    return this.httpClient.get(environment.backendHost+"/paymentFile/"+idPayment, {responseType: 'blob'});
  }

  public supprimerPayment(idPayment: any) {
    return this.httpClient.delete(environment.backendHost+"/deletePayment/"+idPayment);
  }

  public getPaymentById(idPayment: number) {
    return this.httpClient.get<Payment>(environment.backendHost+"/payment/"+idPayment);
  }

  public modifierPayment(formData: any, id:number): Observable<Payment> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    return this.httpClient.put<Payment>(environment.backendHost+"/updatePayment/"+id, formData, { headers: headers });
  }
}
