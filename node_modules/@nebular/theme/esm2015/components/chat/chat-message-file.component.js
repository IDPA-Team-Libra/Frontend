/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Chat message component.
 */
let NbChatMessageFileComponent = class NbChatMessageFileComponent {
    constructor(cd, domSanitizer) {
        this.cd = cd;
        this.domSanitizer = domSanitizer;
    }
    /**
     * Message file path
     * @type {Date}
     */
    set files(files) {
        this.readyFiles = (files || []).map((file) => {
            const isImage = this.isImage(file);
            return Object.assign({}, file, { urlStyle: isImage && this.domSanitizer.bypassSecurityTrustStyle(`url(${file.url})`), isImage: isImage });
        });
        this.cd.detectChanges();
    }
    isImage(file) {
        return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatMessageFileComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatMessageFileComponent.prototype, "sender", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], NbChatMessageFileComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], NbChatMessageFileComponent.prototype, "files", null);
NbChatMessageFileComponent = __decorate([
    Component({
        selector: 'nb-chat-message-file',
        template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [message]="message">
      {{ message }}
    </nb-chat-message-text>

    <ng-container *ngIf="readyFiles?.length > 1">
      <div class="message-content-group">
        <a *ngFor="let file of readyFiles" [href]="file.url" target="_blank">
          <nb-icon [icon]="file.icon" *ngIf="!file.urlStyle && file.icon"></nb-icon>
          <div *ngIf="file.urlStyle" [style.background-image]="file.urlStyle"></div>
        </a>
      </div>
    </ng-container>

    <ng-container *ngIf="readyFiles?.length === 1">
      <a [href]="readyFiles[0].url" target="_blank">
        <nb-icon [icon]="readyFiles[0].icon" *ngIf="!readyFiles[0].urlStyle && readyFiles[0].icon"></nb-icon>
        <div *ngIf="readyFiles[0].urlStyle" [style.background-image]="readyFiles[0].urlStyle"></div>
      </a>
    </ng-container>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, DomSanitizer])
], NbChatMessageFileComponent);
export { NbChatMessageFileComponent };
//# sourceMappingURL=chat-message-file.component.js.map