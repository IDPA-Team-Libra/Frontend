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
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbToastComponent } from './toast.component';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NbPositionHelper } from '../cdk/overlay/position-helper';
const voidState = style({
    transform: 'translateX({{ direction }}110%)',
    height: 0,
    marginLeft: '0',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
});
const defaultOptions = { params: { direction: '' } };
let NbToastrContainerComponent = class NbToastrContainerComponent {
    constructor(layoutDirection, positionHelper) {
        this.layoutDirection = layoutDirection;
        this.positionHelper = positionHelper;
        this.destroy$ = new Subject();
        this.content = [];
    }
    ngOnInit() {
        this.layoutDirection.onDirectionChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.onDirectionChange());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onDirectionChange() {
        const direction = this.positionHelper.isRightPosition(this.position) ? '' : '-';
        this.fadeIn = { value: '', params: { direction } };
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], NbToastrContainerComponent.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbToastrContainerComponent.prototype, "context", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbToastrContainerComponent.prototype, "position", void 0);
__decorate([
    ViewChildren(NbToastComponent),
    __metadata("design:type", QueryList)
], NbToastrContainerComponent.prototype, "toasts", void 0);
NbToastrContainerComponent = __decorate([
    Component({
        selector: 'nb-toastr-container',
        template: `
    <nb-toast [@fadeIn]="fadeIn" *ngFor="let toast of content" [toast]="toast"></nb-toast>`,
        animations: [
            trigger('fadeIn', [
                transition(':enter', [voidState, animate(100)], defaultOptions),
                transition(':leave', [animate(100, voidState)], defaultOptions),
            ]),
        ]
    }),
    __metadata("design:paramtypes", [NbLayoutDirectionService,
        NbPositionHelper])
], NbToastrContainerComponent);
export { NbToastrContainerComponent };
//# sourceMappingURL=toastr-container.component.js.map