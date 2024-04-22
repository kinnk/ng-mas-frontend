import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { FinancesComponent } from './screens/finances/finances.component';
import { EmployeesComponent } from './screens/employees/employees.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children:[
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: LoginPageComponent},
  ]},
  {path: 'main', component: MainLayoutComponent, canActivate:[AuthGuard], children:[
    {path: '', redirectTo: 'dashboard', pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'finances', component: FinancesComponent},
    {path: 'employees', component: EmployeesComponent},
  ]},
];
// for commot test
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
