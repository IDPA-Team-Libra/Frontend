import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MarketComponent } from './market/market.component';
import { HistoryComponent } from './history/history.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { CookiepolicyComponent } from './cookiepolicy/cookiepolicy.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'market', component: MarketComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'policy/cookie', component: CookiepolicyComponent },
  { path: 'policy/privacy', component: PrivacypolicyComponent },
  { path: 'policy/termsofservice', component: TermsofserviceComponent },
  { path: '**', redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
