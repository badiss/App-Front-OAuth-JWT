import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentStatus, PaymentType } from '../model';
import { PaymentService } from '../servives/payment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent implements OnInit {

  studentCode!: string;
  paymentId!: any;
  isUpdate: boolean = false;
  public paymentFormGroup!: FormGroup;
  public paymentTypes: string[] = [];
  public paymentStatut: string[] = [];
  public pdfFileUrl! : string;
  showProgress: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private paymentService: PaymentService, private router: Router,
    private datepipe: DatePipe
  ){}

  ngOnInit(): void {
    this.listTypePayment();
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.paymentId = this.activatedRoute.snapshot.params['idPayment'];
    if (this.paymentId !== 'null') {
      this.isUpdate = true;
      this.loadInfosPayment();
      this.listStatutPayment();
    }
    this.paymentFormGroup = this.fb.group({
      date: this.fb.control(''),
      type: this.fb.control(''),
      amount: this.fb.control(''),
      codeStudent: this.fb.control({value: this.studentCode, disabled: true}),
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),
      status: this.fb.control(''),
    });
    
  }

  public listTypePayment() {
    for(let ele in PaymentType) {
      let value:string = PaymentType[ele];
      if (typeof value ==='string') {
        this.paymentTypes.push(value);
      }
      
    }
  }

  public listStatutPayment() {
    for(let ele in PaymentStatus) {
      let value:string = PaymentStatus[ele];
      if (typeof value ==='string') {
        this.paymentStatut.push(value);
      }
      
    }
  }

  selectFile(event: any) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource : file,
        fileName : file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    this.showProgress = true;
    let date: Date = new Date(this.paymentFormGroup.value.date);
    let formatDate: string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    // créer un objet FormData pour l'envoyer après comme param.
    let formData : FormData = new FormData();
    formData.set('date', formatDate);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('studentCode', this.studentCode);
    formData.set('file', this.paymentFormGroup.value.fileSource);
    formData.set('status', 'CREATED');
    this.paymentService.ajouterPayment(formData).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Payment saved Successfully');
        this.router.navigateByUrl('/admin/student-details/'+this.studentCode);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  updatePayment() {
    this.showProgress = true;
    let date: Date = new Date(this.paymentFormGroup.value.date);
    
    // créer un objet FormData pour l'envoyer après comme param.
   /* let formDataUpdate : FormData = new FormData();
    formDataUpdate.set('date', formatDate);
    formDataUpdate.set('type', this.paymentFormGroup.value.type);
    formDataUpdate.set('amount', this.paymentFormGroup.value.amount);
    formDataUpdate.set('studentCode', this.studentCode);
    formDataUpdate.set('status', this.paymentFormGroup.value.status);*/

    const data = {
      date: this.datepipe.transform(date, 'yyyy-MM-dd'),
      type: this.paymentFormGroup.value.type,
      amount: this.paymentFormGroup.value.amount,
      studentCode: this.studentCode,
      status: this.paymentFormGroup.value.status
    };

    console.log(data);
    this.paymentService.modifierPayment(data, this.paymentId).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Payment updated Successfully');
        this.router.navigateByUrl('/admin/student-details/'+this.studentCode);
      },
      error : err => {
        console.log(err);
      }
    });

  }

  loadInfosPayment() {
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next : value => {
        if (value.file) {
          this.getFichierPayment();
        }
        console.log(value);
        this.paymentFormGroup.patchValue({
          date : value.date,
          type : value.type,
          amount: value.amount,
          codeStudent: value.student.code,
          status: value.status
        });
      },
      error : err => {
        console.log(err);
      }
    });

  }


  afterLoadComplete(event: any) {
    
  }

  getFichierPayment() {
     // Récupérer le fichier s'il existe
     this.paymentService.getPaymentDetails(this.paymentId).subscribe({
      next : value =>{
        let blob: Blob = new Blob([value], {type: 'application/pdf'});
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      }, error: err => {
        console.log(err);
      }
    });
  }

}
