import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  username;
  password;
  email;

  public open(hasBackdrop: boolean) {
    this.dialogService.open(TermsComponent, { hasBackdrop });
  }
  
  openWithBackdrop() {
    this.open(true);
  }
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  registerUser(){
    
  }

}
