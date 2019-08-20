import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../../services/administration/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { User } from '../../../../model/user.model';
import { Role } from '../../../../model/role.model';
import { RoleService } from '../../../../services/administration/role.service';
@Component({
  selector: 'app-user-view-edit',
  templateUrl: './user-view-edit.component.html',
  styleUrls: ['./user-view-edit.component.scss']
})
export class UserViewEditComponent implements OnInit {
  requestModel : User= new User;;
  requestStatusId;
  componentMode;
  public zones : Zone[];
  public roles : Role[] = [];
  public selectedZoneId : number
  selectedRoles  = []
  rolesChecked = [];
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder,private roleService: RoleService, private zoneService: ZoneService ,private userService: UserService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.zones = [];
    this.fillZones();
    this.fillRoles();
    this.route.params.forEach((urlParams) => {
      this.requestStatusId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayUserDetails();

      if(this.componentMode == "editMode"){
          this.disabled = false;
      }else{
        this.disabled = true;
      }
    });
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  displayUserDetails(){
    this.userService.retrieveUser(this.requestStatusId).subscribe(
      response => {
        this.requestModel = response as User;
        
        if(this.requestModel.zone != null){
          this.selectedZoneId = this.requestModel.zone.id;
        }
        for (var x = 0; x<this.roles.length; x++) {
          for (var y = 0; y<this.requestModel.roles.length; y++) {
             if(this.roles[x].id == this.requestModel.roles[y].id){
               this.rolesChecked[x] = true;
             }
          }
        } 
      }
    )
  }
  onSave(){
    let zone = new Zone;
    zone.id = this.selectedZoneId;
    this.requestModel.zone = zone;

    for (var x = 0; x<this.roles.length; x++) {
      if(this.rolesChecked[x]){
        this.selectedRoles[x]= this.roles[x];
      }
    }
    this.requestModel.roles = this.selectedRoles;


    this.userService.updateUser(this.requestModel.id, this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/users");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "اسم المستخدم بالفعل موجود";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/users");
  }

  fillZones(){
    this.zoneService.retrieveAllZones(0,100).subscribe(
      result => {
        this.zones = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }
  fillRoles(){
    this.roleService.retrieveAllRoles().subscribe(
      result => {
        this.roles = result;
        for (var x = 0; x<this.roles.length; x++) {
          this.rolesChecked.push(false);
        }
      },
      error => {
        console.log('oops', error);
    });
    
  }
  onRoleChecked(index, event) {
    this.rolesChecked[index] = event.target.checked;
  }
}
