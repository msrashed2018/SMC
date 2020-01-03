import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RequestViewComponent } from './request-view/request-view.component';
import { RequestRoutingModule } from './request-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentDataComponent } from './payment/payment-data/payment-data.component';
import { ContinueRegisteringDataComponent } from './continue-registering/continue-registering-data/continue-registering-data.component';
import { ContinueRegisteringListComponent } from './continue-registering/continue-registering-list/continue-registering-list.component';
import { BonesRevealComponent } from './bones-reveal/bones-reveal.component';
import { EyeRevealComponent } from './eye-reveal/eye-reveal.component';
import { ReviewRequestsComponent } from './review-requests/review-requests.component';
import { ApproveRequestsComponent } from './approve-requests/approve-requests.component';
import { BonesRevealRegisteringListComponent } from './bones-reveal-registering/bones-reveal-registering-list/bones-reveal-registering-list.component';
import { BonesRevealRegisteringDataComponent } from './bones-reveal-registering/bones-reveal-registering-data/bones-reveal-registering-data.component';
import { EyeRevealRegisteringListComponent } from './eye-reveal-registering/eye-reveal-registering-list/eye-reveal-registering-list.component';
import { EyeRevealRegisteringDataComponent } from './eye-reveal-registering/eye-reveal-registering-data/eye-reveal-registering-data.component';
import { RequestEditComponent } from './request-edit/request-edit.component';
import { RequestResultsComponent } from './request-results/request-results.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [ListRequestsComponent, RequestViewComponent,  PaymentListComponent, PaymentDataComponent, ContinueRegisteringDataComponent, ContinueRegisteringListComponent, BonesRevealComponent, EyeRevealComponent, ReviewRequestsComponent, ApproveRequestsComponent, BonesRevealRegisteringListComponent, BonesRevealRegisteringDataComponent, EyeRevealRegisteringListComponent, EyeRevealRegisteringDataComponent, RequestEditComponent, RequestResultsComponent],
  imports: [
    CommonModule,
    AlertModule,
    RequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers :[ ConfirmModalService ]
})
export class RequestModule { }
