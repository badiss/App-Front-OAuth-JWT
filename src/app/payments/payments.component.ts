import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../servives/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Payment } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {

  public payments! : Array<Payment>;
  public dataSource : any;
  public displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName', 'details'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentService: PaymentService, private router: Router ){}

  ngOnInit(): void {
    this.paymentService.getListPayment().subscribe({
      next : data => {
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  paymentDetails(element: Payment) {
    this.router.navigateByUrl("/admin/payment-details/"+element.id);
  }

}
