import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../ut/logout.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
    this.logoutService.clearCookie();
  }

}
