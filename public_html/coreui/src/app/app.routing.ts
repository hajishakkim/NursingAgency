import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './auth/auth.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
    }
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
    canActivate :[AuthGuard],
    children: [
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'vacancies',
        loadChildren: () => import('./vacancies/vacancies.module').then(m => m.VacanciesModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('./staffs/staffs.module').then(m => m.StaffsModule)
      },
      {
        path: 'candidates',
        loadChildren: () => import('./candidates/candidates.module').then(m => m.CandidatesModule)
      },
      {
        path: 'client-rate',
        loadChildren: () => import('./client-rate/client-rate.module').then(m => m.ClientRateModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'holidays',
        loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'job-roles',
        loadChildren: () => import('./job-roles/job-roles.module').then(m => m.JobRolesModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'staff-rate',
        loadChildren: () => import('./staff-rate/staff-rate.module').then(m => m.StaffRateModule)
      },
      {
        path: 'time-sheets',
        loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule)
      },
      {
        path: 'timeline',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
