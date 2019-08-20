import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCitizensComponent } from './list-citizens/list-citizens.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CitizenRoutingModule } from './citizen-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CitizenViewEditComponent } from './citizen-view-edit/citizen-view-edit.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { CitizenRequestsComponent } from './citizen-requests/citizen-requests.component';


@NgModule({
  declarations: [ListCitizensComponent, CitizenComponent, CitizenViewEditComponent, CitizenRequestsComponent],
  imports: [
    CommonModule,
    AlertModule,
    CitizenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    CollapseModule.forRoot()
  ],
  providers :[ ConfirmModalService ]
})
export class CitizenModule { }
