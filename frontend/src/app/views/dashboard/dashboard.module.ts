
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AlertModule,    
    ChartsModule,
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
