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
import { Component, EventEmitter, HostBinding, Input, Output, Type } from '@angular/core';
import { YEARS_IN_VIEW } from '../calendar-kit/components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarSize, NbCalendarViewMode } from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { convertToBoolProperty } from '../helpers';
/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
var NbBaseCalendarComponent = /** @class */ (function () {
    function NbBaseCalendarComponent(dateService) {
        this.dateService = dateService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines active view for calendar.
         * */
        this.activeViewMode = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars header or not.
         * */
        this.showHeader = true;
        this._showWeekNumber = false;
        /**
         * Emits date when selected.
         * */
        this.dateChange = new EventEmitter();
        this.ViewMode = NbCalendarViewMode;
    }
    Object.defineProperty(NbBaseCalendarComponent.prototype, "showWeekNumber", {
        /**
         * Determines should we show week numbers column.
         * False by default.
         * */
        get: function () {
            return this._showWeekNumber;
        },
        set: function (value) {
            this._showWeekNumber = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbBaseCalendarComponent.prototype.ngOnInit = function () {
        if (!this.visibleDate) {
            this.visibleDate = this.dateService.today();
        }
    };
    Object.defineProperty(NbBaseCalendarComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBaseCalendarComponent.prototype, "large", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbBaseCalendarComponent.prototype.setViewMode = function (viewMode) {
        this.activeViewMode = viewMode;
    };
    NbBaseCalendarComponent.prototype.setVisibleDate = function (visibleDate) {
        this.visibleDate = visibleDate;
    };
    NbBaseCalendarComponent.prototype.prevMonth = function () {
        this.changeVisibleMonth(-1);
    };
    NbBaseCalendarComponent.prototype.nextMonth = function () {
        this.changeVisibleMonth(1);
    };
    NbBaseCalendarComponent.prototype.prevYears = function () {
        this.changeVisibleYear(-1);
    };
    NbBaseCalendarComponent.prototype.nextYears = function () {
        this.changeVisibleYear(1);
    };
    NbBaseCalendarComponent.prototype.navigateToday = function () {
        this.setViewMode(NbCalendarViewMode.DATE);
        this.visibleDate = this.dateService.today();
    };
    NbBaseCalendarComponent.prototype.changeVisibleMonth = function (direction) {
        this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
    };
    NbBaseCalendarComponent.prototype.changeVisibleYear = function (direction) {
        this.visibleDate = this.dateService.addYear(this.visibleDate, direction * YEARS_IN_VIEW);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NbBaseCalendarComponent.prototype, "boundingMonth", void 0);
    __decorate([
        Input('startView'),
        __metadata("design:type", String)
    ], NbBaseCalendarComponent.prototype, "activeViewMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], NbBaseCalendarComponent.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "dayCellComponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "monthCellComponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "yearCellComponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbBaseCalendarComponent.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "visibleDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NbBaseCalendarComponent.prototype, "showHeader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "date", void 0);
    __decorate([
        Input(),
        HostBinding('class.has-week-number'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbBaseCalendarComponent.prototype, "showWeekNumber", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbBaseCalendarComponent.prototype, "weekNumberSymbol", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NbBaseCalendarComponent.prototype, "dateChange", void 0);
    __decorate([
        HostBinding('class.medium'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbBaseCalendarComponent.prototype, "medium", null);
    __decorate([
        HostBinding('class.large'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbBaseCalendarComponent.prototype, "large", null);
    NbBaseCalendarComponent = __decorate([
        Component({
            selector: 'nb-base-calendar',
            template: "<nb-card>\n  <nb-card-header *ngIf=\"showHeader\">\n    <nb-calendar-header (navigateToday)=\"navigateToday()\"></nb-calendar-header>\n  </nb-card-header>\n\n  <nb-card-body [ngSwitch]=\"activeViewMode\">\n\n    <ng-container *ngSwitchCase=\"ViewMode.DATE\">\n\n      <nb-calendar-pageable-navigation\n        *ngSwitchCase=\"ViewMode.DATE\"\n        [date]=\"visibleDate\"\n        (next)=\"nextMonth()\"\n        (prev)=\"prevMonth()\"\n        (changeMode)=\"setViewMode(ViewMode.YEAR)\">\n      </nb-calendar-pageable-navigation>\n\n      <nb-calendar-day-picker\n        [boundingMonths]=\"boundingMonth\"\n        [cellComponent]=\"dayCellComponent\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [visibleDate]=\"visibleDate\"\n        [size]=\"size\"\n        [date]=\"date\"\n        [showWeekNumber]=\"showWeekNumber\"\n        (dateChange)=\"dateChange.emit($event)\"\n        [weekNumberSymbol]=\"weekNumberSymbol\">\n      </nb-calendar-day-picker>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"ViewMode.YEAR\">\n\n      <nb-calendar-pageable-navigation\n        [date]=\"visibleDate\"\n        (next)=\"nextYears()\"\n        (prev)=\"prevYears()\"\n        (changeMode)=\"setViewMode(ViewMode.DATE)\">\n      </nb-calendar-pageable-navigation>\n\n      <nb-calendar-year-picker\n        [cellComponent]=\"yearCellComponent\"\n        [date]=\"date\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [size]=\"size\"\n        [year]=\"visibleDate\"\n        (yearChange)=\"setVisibleDate($event); setViewMode(ViewMode.MONTH)\">\n      </nb-calendar-year-picker>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"ViewMode.MONTH\">\n\n      <nb-calendar-navigation\n        [date]=\"visibleDate\"\n        (changeMode)=\"setViewMode(ViewMode.DATE)\">\n      </nb-calendar-navigation>\n\n      <nb-calendar-month-picker\n        [cellComponent]=\"monthCellComponent\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [size]=\"size\"\n        [month]=\"visibleDate\"\n        (monthChange)=\"setVisibleDate($event); setViewMode(ViewMode.DATE)\">\n      </nb-calendar-month-picker>\n\n    </ng-container>\n\n  </nb-card-body>\n\n</nb-card>\n"
        }),
        __metadata("design:paramtypes", [NbDateService])
    ], NbBaseCalendarComponent);
    return NbBaseCalendarComponent;
}());
export { NbBaseCalendarComponent };
//# sourceMappingURL=base-calendar.component.js.map