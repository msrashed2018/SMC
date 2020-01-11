import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { Citizen } from '../../../model/citizen.model';
import { CitizenService } from '../../../services/citizenService';
import { Router, ActivatedRoute } from '@angular/router';
import { OccupationService } from '../../../services/administration/occupation.service';
import { GovernateService } from '../../../services/administration/governate.service';
import { Occupation } from '../../../model/occupation.model';
import { Governate } from '../../../model/governate.model';
import { City } from '../../../model/city.model';
import { GenderService } from '../../../services/administration/gender.service';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../../../services/authentication/jwt/token-storage.service';
import { Location } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { FingerprintConfirmServiceService } from '../../fingerprint-confirm-modal/fingerprint-confirm-service.service';

@Component({
  selector: 'app-citizen-view-edit',
  templateUrl: './citizen-view-edit.component.html',
  styleUrls: ['./citizen-view-edit.component.scss']
})
export class CitizenViewEditComponent implements OnInit {
  citizen: Citizen = new Citizen;

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage: boolean = false;
  message: string = "";
  disabled: boolean = false;
  citizenId: number;

  componentMode;
  public occupations: Occupation[] = [];
  public governates: Governate[] = [];
  public cities: City[] = [];
  // public genders : Gender[] = [];
  public selectedOccupationId: number
  public selectedGovernateId: number
  public selectedCityId: number
  public selectedGenderId: number;


  checkEnrollmentInterval = interval(2000);
  subscription: Subscription = new Subscription();

  constructor(private fingerprintConfirmService: FingerprintConfirmServiceService, private _location: Location, private route: ActivatedRoute, private formBuilder: FormBuilder, private authenticationService: TokenStorageService, private datepipe: DatePipe, private genderService: GenderService, private governateService: GovernateService, private occupationService: OccupationService, private citizenService: CitizenService, private router: Router) { }

  ngOnInit() {
    // this.fillCities();
    this.fillGovernates();
    // this.fillGenders();
    this.fillOccupations();

    this.route.params.forEach((urlParams) => {
      this.citizenId = urlParams['id'];
      this.componentMode = urlParams['componentMode'];
      this.displayCitizenDetails();
      if (this.componentMode == "editMode") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });


  }

  displayCitizenDetails() {
    this.citizenService.retrieveCitizen(this.citizenId).subscribe(
      response => {

        this.citizen = response as Citizen;

        if (this.citizen.governate != null) {
          this.selectedGovernateId = this.citizen.governate.id;
          this.fillCities(this.selectedGovernateId);
        }
        if (this.citizen.city != null) {
          this.selectedCityId = this.citizen.city.id;
        }
        if (this.citizen.occupation != null) {
          this.selectedOccupationId = this.citizen.occupation.id;
        }
        // if(this.citizen.gender != null){
        //   this.selectedGenderId = this.citizen.gender.id;
        // }

      }
    )
  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }


  onGovernateChanged(value) {
    console.log("value = " + value)
    // let id = this.governates.find(g => g.name === value).id;
    this.fillCities(value);
  }
  onNationalIdChange(value) {
    if (value.length == 14) {

      //getting governate from national id
      let governateCode = value[7] + value[8];
      for (var x = 0; x < this.governates.length; x++) {
        if (this.governates[x].id == governateCode) {
          this.selectedGovernateId = this.governates[x].id;
          this.fillCities(this.selectedGovernateId);
        }
      }
      //getting birthdate from national id
      let date;
      if (value[0] == "2") {
        date = "19" + value[1] + value[2] + "-" + value[3] + value[4] + "-" + value[5] + value[6];
      } else if (value[0] == "3") {
        let date = "20" + value[1] + value[2] + "-" + value[3] + value[4] + "-" + value[5] + value[6];
      }
      this.citizen.birthDate = this.datepipe.transform(new Date(date), 'yyyy-MM-dd');

      //getting gender from national id
      if (value[12] % 2 != 0) {
        this.citizen.gender = 'ذكر'
        // this.selectedGenderId = 2;
      } else {
        this.citizen.gender = 'أنثي'
        // this.selectedGenderId = 1;
      }
    }
  }
  onSave() {

    // this.citizen.modifiedBy = this.authenticationService.getUsername();
    // this.citizen.modifiedDate =this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    let governate = new Governate
    governate.id = this.selectedGovernateId;
    this.citizen.governate = governate;

    let city = new City;
    city.id = this.selectedCityId;
    this.citizen.city = city;

    let occupation = new Occupation;
    occupation.id = this.selectedOccupationId;
    this.citizen.occupation = occupation;


    // let gender = new Gender;
    // gender.id = this.selectedGenderId;
    // this.citizen.gender = gender;

    this.citizenService.updateCitizen(this.citizen.id, this.citizen).subscribe(
      result => {
        this.router.navigateByUrl("/citizen/search");
        this.errorMessage = false;

      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message
      }
    );
  }
  close() {
    this._location.back();
    // this.router.navigateByUrl("/citizen/search");
  }
  fillOccupations() {
    this.occupationService.retrieveAllOccupations(0, 100).subscribe(
      result => {
        this.occupations = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }

  // fillGenders(){
  //   this.genderService.retrieveAllGenders().subscribe(
  //     result => {
  //       this.genders = result;
  //     },
  //     error => {
  //       console.log('oops', error);
  //     });
  // }

  fillCities(governateId) {
    this.governateService.retrieveGovernateCities(governateId).subscribe(
      result => {
        this.cities = result;
      },
      error => {
        console.log('oops', error);
      });
  }

  fillGovernates() {
    this.governateService.retrieveZoneGovernates(0, 100).subscribe(
      result => {
        this.governates = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }

  onFingerprintBtnClicked() {
    this.citizenService.registerCitizenFingerprintStep1(this.citizenId).subscribe(
      result => {
        this.showfingerprintConfirmationModal(this.citizenId);
      },
      error => {
        console.log('oops', error);
        this.errorMessage = true;
        this.message = error.error.message;
      }
    )
  }

  showfingerprintConfirmationModal(citizenId) {
    this.fingerprintConfirmService.confirm('تسجيل بصمة المواطن', 'من فضلك ادخل بصمة المواطن الان', '/assets/img/brand/fingerprint.gif')
      .then(
        (confirmed) => {
          // do something
          if (confirmed) { /*Ok or skip*/ 
            
          } else { /* declined */ }
        },
        (reason) => {
          // dismissed
          this.cancelFingerprintEnrollment();
        })
      .finally(() => {
        this.displayCitizenDetails();
        this.errorMessage=false;
        this.subscription.unsubscribe();
      })


    this.subscription = this.checkEnrollmentInterval.subscribe(n => {
      if (n == 40) {
        this.subscription.unsubscribe();
        this.fingerprintConfirmService.close();
        this.cancelFingerprintEnrollment();
      }
      this.citizenService.isCitizenfigerprintEnrolled(citizenId).subscribe(
        result => {
          let enrollment = result as any;
          if (enrollment != null) {
            if (enrollment.enrolled) {
              this.subscription.unsubscribe();
              this.fingerprintConfirmService.reset('تسجيل بصمة المواطن', 'تم تسجيل بصمة المواطن بنجاح', '/assets/img/brand/success.png', true);
            } else if (enrollment.message) {
              this.fingerprintConfirmService.setStatusMessage(enrollment.message);
            }
          }

        },
        error => {
          console.log('oops', error);
          this.errorMessage = true;
        }
      )
    });


  }

  cancelFingerprintEnrollment() {
    this.citizenService.cancelFingerprintRegisteration().subscribe();
  }

}
