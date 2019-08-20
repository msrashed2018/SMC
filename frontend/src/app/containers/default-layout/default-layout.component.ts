import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavData, CITIZENS_NAV_ITEM, PAYMENTS_NAV_ITEM, CONTINUE_REGISTERING_NAV_ITEM, EYE_REVEAL_NAV_ITEM, BONES_REVEAL_NAV_ITEM, EYE_REVEAL_REGISTRATION_NAV_ITEM, BONES_REVEAL_REGISTRATION_NAV_ITEM, REVIEW_REQUESTS_NAV_ITEM, APPROVE_REQUESTS_NAV_ITEM, RESULTS_NAV_ITEM, COMMITTEES_NAV_ITEM, COMMITTEE_MEMBERS_NAV_ITEM, USERS_NAV_ITEM, SYSTEM_ADMINISTRATION_NAV_ITEMS, REQUESTS_NAV_ITEM } from '../../_nav';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/authentication/jwt/token-storage.service';
import { SYSTEM_TABLES_MAINTENANCE } from '../../app-words';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems: NavData[] = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  public zoneName: string = "";
  constructor(private token: TokenStorageService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    // if (token.getAuthorities().includes("ROLE_ADMIN")) {
    //   this.navItems = adminNavItems;
    // }

    var BreakException = {};
    try {

      token.getAuthorities().forEach(authority => {
        if (authority == "ROLE_ADMIN") {
          //if the user has role admin so no need to check if has other roles because admin role is the user which have all views
          this.navItems = [
            CITIZENS_NAV_ITEM, PAYMENTS_NAV_ITEM, CONTINUE_REGISTERING_NAV_ITEM, BONES_REVEAL_NAV_ITEM,
            EYE_REVEAL_NAV_ITEM, EYE_REVEAL_REGISTRATION_NAV_ITEM, BONES_REVEAL_REGISTRATION_NAV_ITEM,
            REVIEW_REQUESTS_NAV_ITEM, APPROVE_REQUESTS_NAV_ITEM, RESULTS_NAV_ITEM, COMMITTEE_MEMBERS_NAV_ITEM, 
            COMMITTEES_NAV_ITEM, REQUESTS_NAV_ITEM,SYSTEM_ADMINISTRATION_NAV_ITEMS
          ]
          throw BreakException;
        } else if (authority == "ROLE_SUPER_USER") {
          //if the user has role super user so no need to check if has other roles because super role is the user which have all views except administration views
          this.navItems = [
            CITIZENS_NAV_ITEM, PAYMENTS_NAV_ITEM, CONTINUE_REGISTERING_NAV_ITEM, BONES_REVEAL_NAV_ITEM,
            EYE_REVEAL_NAV_ITEM, EYE_REVEAL_REGISTRATION_NAV_ITEM, BONES_REVEAL_REGISTRATION_NAV_ITEM,
            REVIEW_REQUESTS_NAV_ITEM, APPROVE_REQUESTS_NAV_ITEM, RESULTS_NAV_ITEM, COMMITTEE_MEMBERS_NAV_ITEM, 
            COMMITTEES_NAV_ITEM, REQUESTS_NAV_ITEM
          ];
          throw BreakException;
        }else if (authority == "ROLE_CITIZEN_REQUEST_REGISTERING") {
          this.navItems.push(CITIZENS_NAV_ITEM);
        } else if (authority == "ROLE_PAYMENTS_REGISTRATION") {
          this.navItems.push(PAYMENTS_NAV_ITEM);
        } else if (authority == "ROLE_REQUEST_CONTINUE_REGISTERING") {
          this.navItems.push(CONTINUE_REGISTERING_NAV_ITEM);
        } else if (authority == "ROLE_EYE_REVEAL") {
          this.navItems.push(EYE_REVEAL_NAV_ITEM);
        } else if (authority == "ROLE_BONES_REVEAL") {
          this.navItems.push(BONES_REVEAL_NAV_ITEM);
        } else if (authority == "ROLE_EYE_REVEAL_RESULT_REGISTERING") {
          this.navItems.push(EYE_REVEAL_REGISTRATION_NAV_ITEM);
        } else if (authority == "ROLE_BONES_REVEAL_RESULT_REGISTERING") {
          this.navItems.push(BONES_REVEAL_REGISTRATION_NAV_ITEM);
        } else if (authority == "ROLE_REQUEST_REVIEWING") {
          this.navItems.push(REVIEW_REQUESTS_NAV_ITEM);
        } else if (authority == "ROLE_REQUEST_APPROVING") {
          this.navItems.push(APPROVE_REQUESTS_NAV_ITEM);
        } else if (authority == "ROLE_RESULTS_PRINTING") {
          this.navItems.push(RESULTS_NAV_ITEM);
        } else if (authority == "ROLE_RESULTS_VIEWING") {
          if (!token.getAuthorities().includes("ROLE_RESULTS_PRINTING")) this.navItems.push(RESULTS_NAV_ITEM);
        } else if (authority == "ROLE_CITIZENS_REQUESTS_VIEWING") {

        } else if (authority == "ROLE_COMMITTEES_REGISTERING") {
          this.navItems.push(COMMITTEES_NAV_ITEM);
          this.navItems.push(COMMITTEE_MEMBERS_NAV_ITEM);
        } else if (authority == "ROLE_SYSTEM_TABLES_MAINTENANCE") {
          this.navItems.push(SYSTEM_ADMINISTRATION_NAV_ITEMS);
        } else if (authority == "ROLE_DAILY_REPORTS_VIEWING") {

        } else if (authority == "ROLE_STATISTIC_REPORTS_VIEWING") {

        } else if (authority == "ROLE_CITIZENS_DATA_EDITING") {
          if (!token.getAuthorities().includes("ROLE_CITIZEN_REQUEST_REGISTERING")) this.navItems.push(CITIZENS_NAV_ITEM);
        }
      })

    } catch (e) {
      if (e !== BreakException) throw e;
    }

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  logout() {
    this.token.signOut();
    window.location.reload();
    // this.authService.logout();
    // this.router.navigateByUrl("/login");
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  getUsername() {
    return this.token.getUsername();
    // return this.authService.getAuthenticatedUser();
  }
}
