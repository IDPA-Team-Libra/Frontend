import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<TermsComponent>) {

  }

  ngOnInit() {
  }

  denied() {
    window.location.href = "/register";
  }

  accepted() {
    this.dialogRef.close();
  }
}
