/*
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
import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { NbDateService } from '../../services/date.service';
import { NbCalendarSize } from '../../model';
let NbCalendarWeekNumberComponent = class NbCalendarWeekNumberComponent {
    constructor(dateService) {
        this.dateService = dateService;
    }
    get isMedium() {
        return this.size === NbCalendarSize.MEDIUM;
    }
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    getWeeks() {
        return this.weeks.map((week) => {
            // Find last defined day as week could contain null days in case
            // boundingMonth set to false
            const lastDay = [...week].reverse().find((day) => !!day);
            // Use last day of the week to determine week number.
            // This way weeks which span between sibling years is marked first
            return this.dateService.getWeekNumber(lastDay);
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], NbCalendarWeekNumberComponent.prototype, "weeks", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarWeekNumberComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarWeekNumberComponent.prototype, "weekNumberSymbol", void 0);
__decorate([
    HostBinding('class.size-medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarWeekNumberComponent.prototype, "isMedium", null);
__decorate([
    HostBinding('class.size-large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarWeekNumberComponent.prototype, "isLarge", null);
NbCalendarWeekNumberComponent = __decorate([
    Component({
        selector: 'nb-calendar-week-numbers',
        template: `
    <div class="sign">{{ weekNumberSymbol }}</div>
    <div class="week-cell" *ngFor="let week of getWeeks()">{{ week }}</div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host{display:flex;flex-direction:column}\n"]
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarWeekNumberComponent);
export { NbCalendarWeekNumberComponent };
//# sourceMappingURL=nb-calendar-week-number.component.js.map