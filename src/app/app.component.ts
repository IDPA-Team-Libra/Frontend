import { Component } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule
} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'libra-frontend';

  user_items = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: ["/profile"],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: ["/logout"],
    },
  ];

  market_items = [
    {
      title: 'Stock',
      icon: 'activity-outline',
      link: ["/market"],
    },
    {
      title: 'Predictions',
      icon: 'bar-chart-2-outline',
      link: ["/market"],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: [],
    },
  ];
  portfolio_items = [
    {
      title: 'Portfolio',
      icon: 'person-outline',
      link: ["/portfolio"],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: [],
    },
  ];
}
