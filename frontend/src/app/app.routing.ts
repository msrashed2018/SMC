import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RouteGuardService } from './services/authentication/route-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [RouteGuardService],

  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'administration',
        loadChildren: './views/administration/administration.module#AdministrationModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'citizen',
        loadChildren: './views/citizen/citizen.module#CitizenModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'request',
        loadChildren: './views/request/request.module#RequestModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule',
        canActivate: [RouteGuardService],

      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule',
        canActivate: [RouteGuardService],

      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
