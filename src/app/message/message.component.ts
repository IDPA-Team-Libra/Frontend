import { MarketComponent } from './../market/market.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<MarketComponent>) { }

  message;
  type;
  title;

  button_pressed() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
