import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListCitizensComponent } from './list-citizens/list-citizens.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CitizenViewEditComponent } from './citizen-view-edit/citizen-view-edit.component';
import { CitizenRequestsComponent } from './citizen-requests/citizen-requests.component';
const routes: Routes = [
  {
    path: 'search',
    component: ListCitizensComponent,
    data: {
      title: 'citizens'
    }
  },
  {
      path: 'citizen-requests/:id',
      component: CitizenRequestsComponent,
      data: {
        title: 'Citizen Requests'
      }
  },
  {
      path: 'new-citizen',
      component: CitizenComponent,
      data: {
        title: 'New Citizen'
      }
  },
    {
      path: 'view-edit/:id',
      component: CitizenViewEditComponent,
      data: {
        title: 'Citizen'
      }
    }

    // children: [
    //   {
    //     path: 'search',
    //     component: ListCitizensComponent,
    //     data: {
    //       title: 'Search'
    //     }
    //   },
    //   {
    //       path: 'new-citizen',
    //       component: CitizenComponent,
    //       data: {
    //         title: 'New Citizen'
    //       }
    //     },
  
    // ]
  // }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitizenRoutingModule { }
