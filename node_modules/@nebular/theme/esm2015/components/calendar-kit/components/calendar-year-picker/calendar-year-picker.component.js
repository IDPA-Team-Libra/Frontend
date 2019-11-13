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
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, Type, } from '@angular/core';
import { batch, range } from '../../helpers';
import { NbCalendarSize } from '../../model';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';
import { NbDateService } from '../../services/date.service';
export const YEARS_IN_VIEW = 20;
export const YEARS_IN_COLUMN = 4;
let NbCalendarYearPickerComponent = class NbCalendarYearPickerComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.cellComponent = NbCalendarYearCellComponent;
        this.size = NbCalendarSize.MEDIUM;
        this.yearChange = new EventEmitter();
    }
    set _cellComponent(cellComponent) {
        if (cellComponent) {
            this.cellComponent = cellComponent;
        }
    }
    get medium() {
        return this.size === NbCalendarSize.MEDIUM;
    }
    get large() {
        return this.size === NbCalendarSize.LARGE;
    }
    ngOnChanges() {
        this.initYears();
    }
    initYears() {
        const selectedYear = this.dateService.getYear(this.year);
        const startYear = Math.ceil(selectedYear - YEARS_IN_VIEW / 2);
        const years = range(YEARS_IN_VIEW).map(i => this.createYearDateByIndex(i + startYear));
        this.years = batch(years, YEARS_IN_COLUMN);
    }
    onSelect(year) {
        this.yearChange.emit(year);
    }
    createYearDateByIndex(i) {
        return this.dateService.createDate(i, this.dateService.getMonth(this.year), this.dateService.getDate(this.year));
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarYearPickerComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarYearPickerComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarYearPickerComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarYearPickerComponent.prototype, "filter", void 0);
__decorate([
    Input('cellComponent'),
    __metadata("design:type", Type),
    __metadata("design:paramtypes", [Type])
], NbCalendarYearPickerComponent.prototype, "_cellComponent", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarYearPickerComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarYearPickerComponent.prototype, "year", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbCalendarYearPickerComponent.prototype, "yearChange", void 0);
__decorate([
    HostBinding('class.medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarYearPickerComponent.prototype, "medium", null);
__decorate([
    HostBinding('class.large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarYearPickerComponent.prototype, "large", null);
NbCalendarYearPickerComponent = __decorate([
    Component({
        selector: 'nb-calendar-year-picker',
        template: `
    <nb-calendar-picker
      [data]="years"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="date"
      [visibleDate]="year"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarYearPickerComponent);
export { NbCalendarYearPickerComponent };
//# sourceMappingURL=calendar-year-picker.component.js.map