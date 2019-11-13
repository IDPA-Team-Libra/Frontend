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
var NbCalendarWeekNumberComponent = /** @class */ (function () {
    function NbCalendarWeekNumberComponent(dateService) {
        this.dateService = dateService;
    }
    Object.defineProperty(NbCalendarWeekNumberComponent.prototype, "isMedium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarWeekNumberComponent.prototype, "isLarge", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarWeekNumberComponent.prototype.getWeeks = function () {
        var _this = this;
        return this.weeks.map(function (week) {
            // Find last defined day as week could contain null days in case
            // boundingMonth set to false
            var lastDay = week.slice().reverse().find(function (day) { return !!day; });
            // Use last day of the week to determine week number.
            // This way weeks which span between sibling years is marked first
            return _this.dateService.getWeekNumber(lastDay);
        });
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
            template: "\n    <div class=\"sign\">{{ weekNumberSymbol }}</div>\n    <div class=\"week-cell\" *ngFor=\"let week of getWeeks()\">{{ week }}</div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:flex;flex-direction:column}\n"]
        }),
        __metadata("design:paramtypes", [NbDateService])
    ], NbCalendarWeekNumberComponent);
    return NbCalendarWeekNumberComponent;
}());
export { NbCalendarWeekNumberComponent };
//# sourceMappingURL=nb-calendar-week-number.component.js.map