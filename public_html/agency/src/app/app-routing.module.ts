import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './vaccancies/list/list.component';
import { StaffListComponent } from './staffs/staff-list/staff-list.component';

const routes: Routes = [
  { path: 'staff', component: StaffListComponent },
  { path: 'vaccancies', component: ListComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
