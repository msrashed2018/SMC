import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FingerprintConfirmModalComponent } from './fingerprint-confirm-modal.component';
@Injectable({
  providedIn: 'root'
})
export class FingerprintConfirmServiceService {

  public modalRef : any;

  constructor(private modalService: NgbModal) { }
  
  public confirm(
    title: string,
    message: string,
    imgSrc: string,
    okEnabled: boolean = false,
    skipEnabled: boolean = false,
    cancelEnabled: boolean = false,
    statusMessage: string = '',
    statusMessageEnabled: boolean = false,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    btnSkipText: string = 'Skip',
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    this.modalRef = this.modalService.open(FingerprintConfirmModalComponent);
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.btnOkText = btnOkText;
    this.modalRef.componentInstance.btnCancelText = btnCancelText;
    this.modalRef.componentInstance.btnSkipText = btnSkipText;
    this.modalRef.componentInstance.imgSrc = imgSrc;
    this.modalRef.componentInstance.okEnabled = okEnabled;
    this.modalRef.componentInstance.skipEnabled = skipEnabled;
    this.modalRef.componentInstance.cancelEnabled = cancelEnabled;

    return this.modalRef.result;
  }

  public reset(
    title: string,
    message: string,
    imgSrc: string,
    okEnabled: boolean = false,
    skipEnabled: boolean = false,
    cancelEnabled: boolean = false,
    statusMessage: string = '',
    statusMessageEnabled: boolean = false,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    btnSkipText: string = 'Skip'

  ){

    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.btnOkText = btnOkText;
    this.modalRef.componentInstance.btnCancelText = btnCancelText;
    this.modalRef.componentInstance.btnSkipText = btnSkipText;
    this.modalRef.componentInstance.imgSrc = imgSrc;
    this.modalRef.componentInstance.okEnabled = okEnabled;
    this.modalRef.componentInstance.skipEnabled = skipEnabled;
    this.modalRef.componentInstance.cancelEnabled = cancelEnabled;
    this.modalRef.componentInstance.statusMessage = statusMessage;
    this.modalRef.componentInstance.statusMessageEnabled = statusMessageEnabled;

  }
  public close(){
    this.modalService.dismissAll();
  }


  public setStatusMessage(message){
    this.modalRef.componentInstance.statusMessageEnabled = true
    this.modalRef.componentInstance.statusMessage = message;
  }

  public resetStatusMessage(){
    this.modalRef.componentInstance.statusMessageEnabled = false;
  }
}
