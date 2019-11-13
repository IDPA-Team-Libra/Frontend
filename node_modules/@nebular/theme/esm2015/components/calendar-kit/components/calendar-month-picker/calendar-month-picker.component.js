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
import { batch } from '../../helpers';
import { NbCalendarSize } from '../../model';
import { NbCalendarMonthCellComponent } from './calendar-month-cell.component';
import { NbDateService } from '../../services/date.service';
export const MONTHS_IN_VIEW = 12;
export const MONTHS_IN_COLUMN = 4;
let NbCalendarMonthPickerComponent = class NbCalendarMonthPickerComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.monthChange = new EventEmitter();
        this.cellComponent = NbCalendarMonthCellComponent;
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
    ngOnInit() {
        this.initMonths();
    }
    initMonths() {
        const date = this.dateService.getDate(this.month);
        const year = this.dateService.getYear(this.month);
        const firstMonth = this.dateService.createDate(year, 0, date);
        const months = [firstMonth];
        for (let monthIndex = 1; monthIndex < MONTHS_IN_VIEW; monthIndex++) {
            months.push(this.dateService.addMonth(firstMonth, monthIndex));
        }
        this.months = batch(months, MONTHS_IN_COLUMN);
    }
    onSelect(month) {
        this.monthChange.emit(month);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarMonthPickerComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarMonthPickerComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarMonthPickerComponent.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarMonthPickerComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarMonthPickerComponent.prototype, "month", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarMonthPickerComponent.prototype, "monthChange", void 0);
__decorate([
    Input('cellComponent'),
    __metadata("design:type", Type),
    __metadata("design:paramtypes", [Type])
], NbCalendarMonthPickerComponent.prototype, "_cellComponent", null);
__decorate([
    HostBinding('class.medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarMonthPickerComponent.prototype, "medium", null);
__decorate([
    HostBinding('class.large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCalendarMonthPickerComponent.prototype, "large", null);
NbCalendarMonthPickerComponent = __decorate([
    Component({
        selector: 'nb-calendar-month-picker',
        template: `
    <nb-calendar-picker
      [data]="months"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="month"
      [cellComponent]="cellComponent"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarMonthPickerComponent);
export { NbCalendarMonthPickerComponent };
//# sourceMappingURL=calendar-month-picker.component.js.map