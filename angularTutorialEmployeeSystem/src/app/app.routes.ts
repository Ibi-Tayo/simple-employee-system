import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobComponent } from './components/job/job.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home/dashboard',
    component: DashboardComponent
  },
  {
    path: 'job-info',
    component: JobComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'company-info',
    component: CompanyInfoComponent
  }
];
