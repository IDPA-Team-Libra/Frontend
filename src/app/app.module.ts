import { UserService } from './api/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MarketComponent } from './market/market.component';
import { HistoryComponent } from './history/history.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './guards/auth-guard.service';
import { LZStringModule, LZStringService } from 'ng-lz-string';
// ...
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { NbThemeModule, NbToggleModule, NbTooltipModule, NbAccordionModule, NbCalendarModule, NbThemeService, NbCheckboxModule, NbTreeGridModule, NbCardModule, NbActionsModule, NbIconModule, NbTabsetModule, NbInputModule, NbLayoutModule, NbAlertModule, NbMenuModule, NbDialogModule, NbContextMenuModule, NbButtonModule } from '@nebular/theme';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatMenuModule,
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TermsComponent } from './terms/terms.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FsIconComponent } from './fs-icon/fs-icon.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { CookiepolicyComponent } from './cookiepolicy/cookiepolicy.component';
import { CookieService } from "ngx-cookie-service";
import { MessageComponent } from './message/message.component';
import { StockprofileComponent } from './stockprofile/stockprofile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { PerformanceLineChartComponent } from './performance-line-chart/performance-line-chart.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ChartsModule } from 'ng2-charts';
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'// it is recommended to set your domain, for cookies to work properly
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements: {
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}} 
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>, 
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our 
      <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
    </span>
    `,
  },
  content: {
    message: 'By using our site, you acknowledge that you have read and understand our ',

    cookiePolicyLink: 'Cookie Policy',
    cookiePolicyHref: '/policy/cookie',

    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: '/policy/privacy',

    tosLink: 'Terms of Service',
    tosHref: '/policy/termsofservice',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MarketComponent,
    HistoryComponent,
    PortfolioComponent,
    ProfileComponent,
    TermsComponent,
    PieChartComponent,
    FsIconComponent,
    PrivacypolicyComponent,
    TermsofserviceComponent,
    CookiepolicyComponent,
    MessageComponent,
    StockprofileComponent,
    StatisticsComponent,
    ChartsComponent,
    PerformanceLineChartComponent
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LZStringModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NbMenuModule.forRoot(),
    MatMenuModule, InputTextModule,
    NbCardModule,
    NbToggleModule,
    NbTooltipModule,
    ChartsModule,
    NbInputModule, NbTabsetModule, NbThemeModule.forRoot({ name: 'default' }), NbLayoutModule, NbEvaIconsModule, NbIconModule,
    NbAlertModule, NbDialogModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbTreeGridModule, NbActionsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    HttpClientModule, NbCalendarModule, NbCheckboxModule,
    NbAccordionModule
  ],
  entryComponents: [TermsComponent, MessageComponent, StockprofileComponent],
  providers: [CookieService, AuthGuardService, UserService, NbThemeService, LZStringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
