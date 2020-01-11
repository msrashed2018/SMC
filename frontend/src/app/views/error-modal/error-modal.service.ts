import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './error-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor(private modalService: NgbModal) { }

  public error(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ErrorModalComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;

    return modalRef.result;
  }

}
