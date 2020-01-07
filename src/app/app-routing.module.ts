import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MarketComponent } from './market/market.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { CookiepolicyComponent } from './cookiepolicy/cookiepolicy.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PerformanceLineChartComponent } from './performance-line-chart/performance-line-chart.component';
import { AllocationChartComponent } from './allocation-doughnut-chart/allocation-doughnut-chart.component';
import { AuthenticationBlockGuard } from './guards/authentication_block-guard.service';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationBlockGuard] },
  { path: 'market', component: MarketComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticationBlockGuard] },
  { path: 'policy/cookie', component: CookiepolicyComponent },
  { path: 'policy/privacy', component: PrivacypolicyComponent },
  { path: 'policy/termsofservice', component: TermsofserviceComponent },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardService] },
  { path: 'performance', component: PerformanceLineChartComponent, canActivate: [AuthGuardService] },
  { path: 'allocation', component: AllocationChartComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
