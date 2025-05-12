import { Component, computed, effect, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FactureService } from '../../servives/facture.service';
import { Facture, INVOICE_STATUS, TrimestreType } from '../../model';

@Component({
  selector: 'app-list-factures',
  templateUrl: './list-factures.component.html',
  styleUrl: './list-factures.component.css'
})
export class ListFacturesComponent implements OnInit {

  private onDestroy$ = new Subject<void>();
  paymentId!: number
  showProgress: boolean = false;

  invoiceList = signal<Facture[]>([]) ;
  //invoicesInDone: Signal<Facture[]> = signal([]);
  //totalAmountInDone: Signal<number> = signal(0);
  listFactureUpdated!: Facture[];


  constructor(private route: ActivatedRoute, private factureService: FactureService, private router: Router){

  }

  ngOnInit(): void {
    this.paymentId = this.route.snapshot.params['idPayment'];
    this.factureService.getListFacturesByPayment(this.paymentId).subscribe({
      next : data => {
          this.invoiceList.set(data);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  invoicesInDone = computed(() => this.invoiceList().filter((item) => item.status === INVOICE_STATUS.DONE));
  totalAmountInDone = computed(() => this.invoicesInDone().reduce((accumulator, invoice) => accumulator + invoice.montant, 0));

 
  public getFactureUpdate(factureUpdated: Facture) {
    this.invoiceList.update(
      facts=> facts.map(
        f=>(f.idFacture === factureUpdated.idFacture) ? {...factureUpdated, status: factureUpdated.status} :f )
    )
  }

  public updateFacturesPayment() {
    this.showProgress = true;
    this.listFactureUpdated = this.invoiceList();
   
   this.factureService.modifierPaymentFactures(this.listFactureUpdated).subscribe({
    next : value => {
      this.showProgress = false;
      alert('Payment et factures updated Successfully');
      this.router.navigateByUrl('/admin/payments');
    },
    error : err => {
      console.log(err);
    }
  });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
