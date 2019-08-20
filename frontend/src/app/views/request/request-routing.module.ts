import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentDataComponent } from './payment/payment-data/payment-data.component';
import { ContinueRegisteringListComponent } from './continue-registering/continue-registering-list/continue-registering-list.component';
import { ContinueRegisteringDataComponent } from './continue-registering/continue-registering-data/continue-registering-data.component';
import { BonesRevealComponent } from './bones-reveal/bones-reveal.component';
import { EyeRevealComponent } from './eye-reveal/eye-reveal.component';
import { ReviewRequestsComponent } from './review-requests/review-requests.component';
import { ApproveRequestsComponent } from './approve-requests/approve-requests.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { EyeRevealRegisteringListComponent } from './eye-reveal-registering/eye-reveal-registering-list/eye-reveal-registering-list.component';
import { EyeRevealRegisteringDataComponent } from './eye-reveal-registering/eye-reveal-registering-data/eye-reveal-registering-data.component';
import { BonesRevealRegisteringListComponent } from './bones-reveal-registering/bones-reveal-registering-list/bones-reveal-registering-list.component';
import { BonesRevealRegisteringDataComponent } from './bones-reveal-registering/bones-reveal-registering-data/bones-reveal-registering-data.component';
import { RequestEditComponent } from './request-edit/request-edit.component';
import { RequestResultsComponent } from './request-results/request-results.component';
const routes: Routes = [
  {
    path: 'search',
    component: ListRequestsComponent,
    data: {
      title: 'requests'
    },
    
  },
  {
    path: 'payments',
    component: PaymentListComponent,
    data: {
      title: 'Payments'
    }
  },
  {
    path: 'payment-data',
    component: PaymentDataComponent,
    data: {
      title: 'Payment data'
    }
  },
  {
    path: 'continue-registering',
    component: ContinueRegisteringListComponent,
    data: {
      title: 'Continue Registering'
    }
  },
  {
    path: 'continue-registering-data',
    component: ContinueRegisteringDataComponent,
    data: {
      title: 'continue-registering data'
    }
  },
  {
    path: 'bones-reveal',
    component: BonesRevealComponent,
    data: {
      title: 'bones-reveal data'
    }
  },
  {
    path: 'eye-reveal',
    component: EyeRevealComponent,
    data: {
      title: 'eye-reveal data'
    }
  },
  {
    path: 'eye-reveal-registering',
    component: EyeRevealRegisteringListComponent,
    data: {
      title: 'eye-reveal-registering'
    }
  },
  {
    path: 'eye-reveal-registering-data',
    component: EyeRevealRegisteringDataComponent,
    data: {
      title: 'eye-reveal-registering-data'
    }
  },
  {
    path: 'bones-reveal-registering',
    component: BonesRevealRegisteringListComponent,
    data: {
      title: 'bones-reveal-registering'
    }
  },
  {
    path: 'bones-reveal-registering-data',
    component: BonesRevealRegisteringDataComponent,
    data: {
      title: 'bones-reveal-registering-data'
    }
  },
  {
    path: 'review-requests',
    component: ReviewRequestsComponent,
    data: {
      title: 'review-requests'
    }
  },
  {
    path: 'approve-requests',
    component: ApproveRequestsComponent,
    data: {
      title: 'approve-requests'
    }
  },
  {
    path: 'results',
    component: RequestResultsComponent,
    data: {
      title: 'results'
    }
  },
  {
    path: 'request-edit/:id',
    component: RequestEditComponent,
    data: {
      title: 'Request Edit'
    }
  },
  {
    path: ':id',
    component: RequestViewComponent,
    data: {
      title: 'Request'
    }
  }
  
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
