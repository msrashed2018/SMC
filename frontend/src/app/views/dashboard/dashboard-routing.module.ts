import { AlertModule } from 'ngx-bootstrap/alert';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
// import { CitizensComponent } from '../../views/citizens/citizens.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'الصفحه الرئيسيه'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule ,FormsModule , AlertModule],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class DashboardRoutingModule {}
