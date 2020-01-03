import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fingerprint-confirm-modal',
  templateUrl: './fingerprint-confirm-modal.component.html',
  styleUrls: ['./fingerprint-confirm-modal.component.scss']
})
export class FingerprintConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnSkipText: string;
  @Input() btnCancelText: string;
  @Input() imgSrc: string ;
  @Input() skipEnabled: boolean = false;
  @Input() okEnabled: boolean = false;
  @Input() cancelEnabled: boolean = false;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public skip() {
    this.activeModal.close(true);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
