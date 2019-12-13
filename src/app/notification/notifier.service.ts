import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private dialogService: NbDialogService) { }


  displayNotification(message, type, title) {
    return this.open(message, type, title);
  }

  protected open(message, type, title) {
    var hasBackdrop = true;
    var closeOnBackdropClick = true;
    return this.dialogService.open(MessageComponent, {
      context: {
        message: message,
        type: type,
        title: title,
      },
      hasBackdrop, closeOnBackdropClick
    });
  }
}
