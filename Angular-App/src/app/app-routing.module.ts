import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent} from '../../src/app/component/employee.component';

const routes: Routes = [
 { path: '', redirectTo: '/addemployee', pathMatch: 'full'},
 { path: 'viewemployees',component: EmployeeComponent },
 { path: 'addemployee',component: EmployeeComponent },
 { path: 'editemployee',component: EmployeeComponent }
];

 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}