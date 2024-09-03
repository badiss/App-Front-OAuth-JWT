import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../servives/payment.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{

  paymentId!: number
  pdfFileUrl: any;
  messageError!: string;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService){

  }

  ngOnInit(): void {
    this.messageError = "";
    this.paymentId = this.route.snapshot.params['id'];
    this.paymentService.getPaymentDetails(this.paymentId).subscribe({
      next : value =>{
        let blob: Blob = new Blob([value], {type: 'application/pdf'});
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      }, error: err => {
        console.log(err);
        this.messageError = "Ce Payment ne contient pas un fichier";
      }
    });
  }

  afterLoadComplete(event: any) {

  }

}
