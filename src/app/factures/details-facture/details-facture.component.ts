import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Facture, INVOICE_STATUS } from '../../model';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrl: './details-facture.component.css'
})
export class DetailsFactureComponent {

  @Input() item!: Facture;
  @Output() public updateFacture = new EventEmitter<Facture>();

  readonly INVOICE_STATUS = INVOICE_STATUS;

  changeToDone(): void{
    const updatedInvoice = {...this.item, status: INVOICE_STATUS.DONE};
    this.updateData(updatedInvoice);
  }

  changeToPending(): void {
    const updatedInvoice = {...this.item, status: INVOICE_STATUS.PENDING};
    this.updateData(updatedInvoice);
  }

  private updateData(updatedInvoice: Facture): void {
    this.updateFacture.emit(updatedInvoice);
  }

}
