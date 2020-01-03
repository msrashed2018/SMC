import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FingerprintConfirmModalComponent } from './fingerprint-confirm-modal.component';
@Injectable({
  providedIn: 'root'
})
export class FingerprintConfirmServiceService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    imgSrc: string,
    okEnabled: boolean = false,
    skipEnabled: boolean = false,
    cancelEnabled: boolean = false,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    btnSkipText: string = 'Skip',
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(FingerprintConfirmModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.btnSkipText = btnSkipText;
    modalRef.componentInstance.imgSrc = imgSrc;
    modalRef.componentInstance.okEnabled = okEnabled;
    modalRef.componentInstance.skipEnabled = skipEnabled;
    modalRef.componentInstance.cancelEnabled = cancelEnabled;

    return modalRef.result;
  }

  public close(){
    this.modalService.dismissAll();
  }

}
