import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCitiesComponent } from './list-cities/list-cities.component';
import { ListCommitteesComponent } from './list-committees/list-committees.component';
import { ListCustomsComponent } from './list-customs/list-customs.component';
import { ListDisabilitiesComponent } from './list-disabilities/list-disabilities.component';
import { ListEquipmentsComponent } from './list-equipments/list-equipments.component';
import { ListEyeMeasureComponent } from './list-eye-measures/list-eye-measures.component';
import { ListOccupationsComponent } from './list-occupations/list-occupations.component';
import { ListRequestStatusComponent } from './list-request-status/list-request-status.component';
import { ListGovernatesComponent } from './list-governates/list-governates.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListZonesComponent } from './list-zones/list-zones.component';
import { RequestTypesListComponent } from './request-types/request-types-list/request-types-list.component';
import { RequestTypeDataComponent } from './request-types/request-type-data/request-type-data.component';
import { RequestTypeViewEditComponent } from './request-types/request-type-view-edit/request-type-view-edit.component';
import { RequestStatusDataComponent } from './list-request-status/request-status-data/request-status-data.component';
import { RequestStatusViewEditComponent } from './list-request-status/request-status-view-edit/request-status-view-edit.component';
import { CustomDataComponent } from './list-customs/custom-data/custom-data.component';
import { CustomViewEditComponent } from './list-customs/custom-view-edit/custom-view-edit.component';
import { EquipmentDataComponent } from './list-equipments/equipment-data/equipment-data.component';
import { EquipmentViewEditComponent } from './list-equipments/equipment-view-edit/equipment-view-edit.component';
import { ListCommitteeMembersComponent } from './list-committee-members/list-committee-members.component';
import { CommitteeDataComponent } from './list-committees/committee-data/committee-data.component';
import { CommitteeMemberViewEditComponent } from './list-committee-members/committee-member-view-edit/committee-member-view-edit.component';
import { UserDataComponent } from './list-users/user-data/user-data.component';
import { UserViewEditComponent } from './list-users/user-view-edit/user-view-edit.component';
import { DisabilityDataComponent } from './list-disabilities/disability-data/disability-data.component';
import { DisabilityViewEditComponent } from './list-disabilities/disability-view-edit/disability-view-edit.component';
import { ZoneDataComponent } from './list-zones/zone-data/zone-data.component';
import { ZoneViewEditComponent } from './list-zones/zone-view-edit/zone-view-edit.component';
import { CommitteeViewEditComponent } from './list-committees/committee-view-edit/committee-view-edit.component';
import { CommitteeMemberDataComponent } from './list-committee-members/committee-member-data/committee-member-data.component';
import { OccupationDataComponent } from './list-occupations/occupation-data/occupation-data.component';
import { OccupationViewEditComponent } from './list-occupations/occupation-view-edit/occupation-view-edit.component';
import { EyeMeasureDataComponent } from './list-eye-measures/eye-measure-data/eye-measure-data.component';
import { EyeMeasureViewEditComponent } from './list-eye-measures/eye-measure-view-edit/eye-measure-view-edit.component';
import { ListEyeRevealSettingComponent } from './list-eye-reveal-setting/list-eye-reveal-setting.component';
import { EyeRevealSettingDataComponent } from './list-eye-reveal-setting/eye-reveal-setting-data/eye-reveal-setting-data.component';
import { EyeRevealSettingViewEditComponent } from './list-eye-reveal-setting/eye-reveal-setting-view-edit/eye-reveal-setting-view-edit.component';
import { CityDataComponent } from './list-cities/city-data/city-data.component';
import { CityViewEditComponent } from './list-cities/city-view-edit/city-view-edit.component';
import { GovernateDataComponent } from './list-governates/governate-data/governate-data.component';
import { GovernateViewEditComponent } from './list-governates/governate-view-edit/governate-view-edit.component';
import { AuditListComponent } from './audit-list/audit-list.component';
import { ListDocumentTypesComponent } from './list-document-types/list-document-types.component';
import { DocumentTypeDataComponent } from './list-document-types/document-type-data/document-type-data.component';
import { DocumentTypeViewEditComponent } from './list-document-types/document-type-view-edit/document-type-view-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration'
    },
    children: [
      
      {
        path: 'types',
        component: RequestTypesListComponent,
        data: {
          title: 'Request Types'
        }
      },
      {
        path: 'type-data',
        component: RequestTypeDataComponent,
        data: {
          title: 'Request Data'
        }
      },
      {
        path: 'types/:id',
        component: RequestTypeViewEditComponent,
        data: {
          title: 'Request Data'
        }
      },
      
      {
        path: 'request-status',
        component: ListRequestStatusComponent,
        data: {
          title: 'Request Status'
        }
      },
      {
        path: 'request-status-data',
        component: RequestStatusDataComponent,
        data: {
          title: 'Request Status Data'
        }
      },{
        path: 'request-status/:id',
        component: RequestStatusViewEditComponent,
        data: {
          title: 'Request Status'
        }
      },
      {
        path: 'governates',
        component: ListGovernatesComponent,
        data: {
          title: 'Governates'
        }
      },
      {
        path: 'governate-data',
        component: GovernateDataComponent,
        data: {
          title: 'Governate Data'
        }
      },
      {
        path: 'governates/:id',
        component: GovernateViewEditComponent,
        data: {
          title: 'Governates'
        }
      },
      {
        path: 'cities',
        component: ListCitiesComponent,
        data: {
          title: 'Cities'
        }
      },
      {
        path: 'city-data',
        component: CityDataComponent,
        data: {
          title: 'City Data'
        }
      },
      {
        path: 'cities/:id',
        component: CityViewEditComponent,
        data: {
          title: 'Cities'
        }
      },
      {
        path: 'occupations',
        component: ListOccupationsComponent,
        data: {
          title: 'Occupations'
        }
      },
      {
        path: 'occupation-data',
        component: OccupationDataComponent,
        data: {
          title: 'Occupation Data'
        }
      },{
        path: 'occupations/:id',
        component: OccupationViewEditComponent,
        data: {
          title: 'Occupation'
        }
      },
      {
        path: 'zones',
        component: ListZonesComponent,
        data: {
          title: 'Zones'
        }
      },
      {
        path: 'zone-data',
        component: ZoneDataComponent,
        data: {
          title: 'Zone Data'
        }
      },
      {
        path: 'zones/:id',
        component: ZoneViewEditComponent,
        data: {
          title: 'Zone'
        }
      },
      {
        path: 'customs',
        component: ListCustomsComponent,
        data: {
          title: 'Customs'
        }
      },
      {
        path: 'custom-data',
        component: CustomDataComponent,
        data: {
          title: 'Custom Data'
        }
      },{
        path: 'customs/:id',
        component: CustomViewEditComponent,
        data: {
          title: 'Customs'
        }
      },
      {
        path: 'disabilities',
        component: ListDisabilitiesComponent,
        data: {
          title: 'Disabilities'
        }
      },
      {
        path: 'disability-data',
        component: DisabilityDataComponent,
        data: {
          title: 'Disability Data'
        }
      },
      {
        path: 'disabilities/:id',
        component: DisabilityViewEditComponent,
        data: {
          title: 'Disability'
        }
      },
      {
        path: 'equipments',
        component: ListEquipmentsComponent,
        data: {
          title: 'Equipments'
        }
      },
      {
        path: 'equipment-data',
        component: EquipmentDataComponent,
        data: {
          title: 'Equipment Data'
        }
      },{
        path: 'equipments/:id',
        component: EquipmentViewEditComponent,
        data: {
          title: 'Equipments'
        }
      },
      {
        path: 'committees',
        component: ListCommitteesComponent,
        data: {
          title: 'Committees'
        }
      },
      {
        path: 'committee-data',
        component: CommitteeDataComponent,
        data: {
          title: 'Committee Data'
        }
      },{
        path: 'committees/:id',
        component: CommitteeViewEditComponent,
        data: {
          title: 'Committee'
        }
      },
      {
        path: 'committee-members',
        component: ListCommitteeMembersComponent,
        data: {
          title: 'Committee Members'
        }
      },
      {
        path: 'committee-member-data',
        component: CommitteeMemberDataComponent,
        data: {
          title: 'Committee Member Data'
        }
      },{
        path: 'committee-members/:id',
        component: CommitteeMemberViewEditComponent,
        data: {
          title: 'Committee Members'
        }
      },
      {
        path: 'users',
        component: ListUsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'user-data',
        component: UserDataComponent,
        data: {
          title: 'User Data'
        }
      },{
        path: 'users/:id',
        component: UserViewEditComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'document-types',
        component: ListDocumentTypesComponent,
        data: {
          title: 'Document Types'
        }
      },
      {
        path: 'document-type-data',
        component: DocumentTypeDataComponent,
        data: {
          title: 'Document Type Data'
        }
      },{
        path: 'document-types/:id',
        component: DocumentTypeViewEditComponent,
        data: {
          title: 'Document Types'
        }
      },
      {
        path: 'eye-measures',
        component: ListEyeMeasureComponent,
        data: {
          title: 'Eye Measures'
        }
      },
      {
        path: 'eye-measure-data',
        component: EyeMeasureDataComponent,
        data: {
          title: 'Eye Measure Data'
        }
      },
      {
        path: 'eye-measures/:id',
        component: EyeMeasureViewEditComponent,
        data: {
          title: 'Eye Measures'
        }
      },
      {
        path: 'eye-reveal-settings',
        component: ListEyeRevealSettingComponent,
        data: {
          title: 'Eye Reveal Settings'
        }
      },
      {
        path: 'eye-reveal-setting-data',
        component: EyeRevealSettingDataComponent,
        data: {
          title: 'Eye Reveal Setting Data'
        }
      },
      {
        path: 'eye-reveal-settings/:id',
        component: EyeRevealSettingViewEditComponent,
        data: {
          title: 'Eye Reveal Settings'
        }
      },
      {
        path: 'audits',
        component: AuditListComponent,
        data: {
          title: 'Audits'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
