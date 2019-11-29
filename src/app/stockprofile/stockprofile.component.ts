import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../auth/authentication.service";
@Component({
  selector: 'app-stockprofile',
  templateUrl: './stockprofile.component.html',
  styleUrls: ['./stockprofile.component.scss']
})
export class StockprofileComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  stockSymbol = "";
  symbolPrice;


  updateTotalValue(value){
    
  }

  ngOnInit() {
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
