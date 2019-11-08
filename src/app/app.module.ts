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
import { NbThemeModule, NbCardModule, NbTabsetModule, NbInputModule, NbLayoutModule,NbAlertModule,NbMenuModule,NbDialogModule,NbContextMenuModule,NbButtonModule} from '@nebular/theme';
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
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NbMenuModule.forRoot(),
    MatMenuModule, InputTextModule,
    NbCardModule,
    NbInputModule, NbTabsetModule, NbThemeModule.forRoot({ name: 'dark' }), NbLayoutModule, NbEvaIconsModule,
    NbAlertModule,NbDialogModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule
  ],
  entryComponents: [TermsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
