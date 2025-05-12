import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../servives/payment.service';
import { Payment } from '../model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../servives/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService } from '../servives/alertify.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{

  showProgress: boolean = false;
  isAdmin!: boolean;
  studentCode!: string;
  firstNameStudent! : string;
  ListPaymentsStudent! : Array<Payment>;
  dataSourcePayment! : MatTableDataSource<Payment>;
  public displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName', 'details'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activatedRoute: ActivatedRoute, private paymentService: PaymentService,
     private router: Router, private AuthService: AuthService, private alertify: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.showProgress = true;
    this.isAdmin = this.AuthService.roleUserConected;
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    if (this.studentCode) {
      setTimeout(()=>{
        this.getListPaymentToStudentWithCode(this.studentCode);
    }, 500);
    }
  }

  public getListPaymentToStudentWithCode(code: string) {
    this.paymentService.getListPaymentsStudent(code).subscribe({
      next : data => {
        this.ListPaymentsStudent = data;
        this.dataSourcePayment = new MatTableDataSource(this.ListPaymentsStudent);
        this.firstNameStudent = this.ListPaymentsStudent[0].student.firstName;
        this.dataSourcePayment.paginator = this.paginator;
        this.dataSourcePayment.sort = this.sort;
        this.showProgress = false;
      },
      error : err => {
        this.showProgress = false;
        this.alertify.error("Il n'existe pas des payments avec ce code d'étudiant");
      }
    });
  }

  /**
   * Ajouter un payment
   */
  public addPayment() {
    this.router.navigateByUrl('/admin/add-payment/'+this.studentCode+'/null');
  }

  paymentDetails(element: Payment) {
    this.router.navigateByUrl("/admin/payment-details/"+element.id);
  }

  deletePayment(element: Payment) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.paymentService.supprimerPayment(element.id).subscribe({
      next : resp => {
        this.showProgress = true;
        setTimeout(()=>{
          this.getListPaymentToStudentWithCode(this.studentCode);
      }, 500);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  public updatePayment(element: Payment) {
    this.router.navigateByUrl('/admin/add-payment/'+this.studentCode+'/'+element.id);
  }

  facturePayment(ele: Payment){
    this.router.navigateByUrl('admin/factures/list/'+ele.id);
  }
}
