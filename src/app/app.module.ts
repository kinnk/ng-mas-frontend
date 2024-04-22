import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { VerticalChartComponent } from './screens/dashboard/components/vertical-chart/vertical-chart.component';
import { PieChartComponent } from './screens/dashboard/components/pie-chart/pie-chart.component';
import { FinancesComponent } from './screens/finances/finances.component';
import { EmployeesComponent } from './screens/employees/employees.component';
import { TokenInterceptor } from './interseptors/token.interseptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    VerticalChartComponent,
    PieChartComponent,
    FinancesComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzButtonModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      multi: true,
      useClass: TokenInterceptor
    },
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
