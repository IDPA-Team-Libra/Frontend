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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbLayoutDirectionService } from '../../../../services/direction.service';
let NbCalendarPageableNavigationComponent = class NbCalendarPageableNavigationComponent {
    constructor(directionService) {
        this.directionService = directionService;
        this.changeMode = new EventEmitter();
        this.next = new EventEmitter();
        this.prev = new EventEmitter();
    }
    get isRtl() {
        return this.directionService.isRtl();
    }
    get isLtr() {
        return this.directionService.isLtr();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarPageableNavigationComponent.prototype, "date", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbCalendarPageableNavigationComponent.prototype, "changeMode", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbCalendarPageableNavigationComponent.prototype, "next", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbCalendarPageableNavigationComponent.prototype, "prev", void 0);
NbCalendarPageableNavigationComponent = __decorate([
    Component({
        selector: 'nb-calendar-pageable-navigation',
        template: `
    <button nbButton (click)="prev.emit()" ghost size="small" class="prev-month">
      <nb-icon [icon]="isLtr ? 'chevron-left-outline' : 'chevron-right-outline'" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-calendar-navigation [date]="date" (changeMode)="changeMode.emit()"></nb-calendar-navigation>
    <button nbButton (click)="next.emit()" ghost size="small" class="next-month">
      <nb-icon [icon]="isLtr ? 'chevron-right-outline' : 'chevron-left-outline'" pack="nebular-essentials"></nb-icon>
    </button>
  `,
        styles: [":host{display:flex;align-items:center;justify-content:space-between}[dir=ltr] :host .prev-month{margin-left:auto;margin-right:0.4rem}[dir=rtl] :host .prev-month{margin-left:0.4rem;margin-right:auto}[dir=ltr] :host .next-month{margin-left:0.4rem;margin-right:auto}[dir=rtl] :host .next-month{margin-left:auto;margin-right:0.4rem}nb-calendar-navigation{margin:0 0.5rem}\n"]
    }),
    __metadata("design:paramtypes", [NbLayoutDirectionService])
], NbCalendarPageableNavigationComponent);
export { NbCalendarPageableNavigationComponent };
//# sourceMappingURL=calendar-pageable-navigation.component.js.map