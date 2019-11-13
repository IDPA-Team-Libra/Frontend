var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { NbDateService } from '../calendar-kit/services/date.service';
let NbCalendarRangeDayCellComponent = class NbCalendarRangeDayCellComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    get inRange() {
        return this.date && this.selectedValue
            && (this.selectedValue.start && this.dateService.compareDates(this.date, this.selectedValue.start) >= 0)
            && (this.selectedValue.end && this.dateService.compareDates(this.date, this.selectedValue.end) <= 0);
    }
    get start() {
        return this.date && this.selectedValue && this.selectedValue.end
            && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start));
    }
    get end() {
        return this.date && this.selectedValue &&
            (this.selectedValue.end && this.dateService.isSameDay(this.date, this.selectedValue.end));
    }
    get today() {
        return this.date && this.dateService.isSameDay(this.date, this.dateService.today());
    }
    get boundingMonth() {
        return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
    }
    get selected() {
        return this.date && this.selectedValue
            && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start)) || this.end;
    }
    get empty() {
        return !this.date;
    }
    get disabled() {
        return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
    }
    get day() {
        return this.date && this.dateService.getDate(this.date);
    }
    onClick() {
        if (this.disabled || this.empty) {
            return;
        }
        this.select.emit(this.date);
    }
    smallerThanMin() {
        return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
    }
    greaterThanMax() {
        return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
    }
    dontFitFilter() {
        return this.date && this.filter && !this.filter(this.date);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeDayCellComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeDayCellComponent.prototype, "selectedValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeDayCellComponent.prototype, "visibleDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeDayCellComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeDayCellComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarRangeDayCellComponent.prototype, "filter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarRangeDayCellComponent.prototype, "select", void 0);
__decorate([
    HostBinding('class.in-range'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeDayCellComponent.prototype, "inRange", null);
__decorate([
    HostBinding('class.start'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeDayCellComponent.prototype, "start", null);
__decorate([
    HostBinding('class.end'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeDayCellComponent.prototype, "end", null);
NbCalendarRangeDayCellComponent = __decorate([
    Component({
        selector: 'nb-calendar-range-day-cell',
        template: `
    <div
      class="day-cell"
      [class.today]="today"
      [class.selected]="selected"
      [class.bounding-month]="boundingMonth"
      [class.start]="start"
      [class.end]="end"
      [class.in-range]="inRange"
      [class.disabled]="disabled">
      {{ day }}
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: { '(click)': 'onClick()', 'class': 'range-cell' }
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarRangeDayCellComponent);
export { NbCalendarRangeDayCellComponent };
let NbCalendarRangeYearCellComponent = class NbCalendarRangeYearCellComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    get selected() {
        return this.selectedValue && this.dateService.isSameYear(this.date, this.selectedValue.start);
    }
    get today() {
        return this.date && this.dateService.isSameYear(this.date, this.dateService.today());
    }
    get disabled() {
        return this.smallerThanMin() || this.greaterThanMax();
    }
    get year() {
        return this.dateService.getYear(this.date);
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    }
    smallerThanMin() {
        return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
    }
    greaterThanMax() {
        return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
    }
    yearStart() {
        return this.dateService.getYearStart(this.date);
    }
    yearEnd() {
        return this.dateService.getYearEnd(this.date);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeYearCellComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeYearCellComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeYearCellComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeYearCellComponent.prototype, "selectedValue", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarRangeYearCellComponent.prototype, "select", void 0);
__decorate([
    HostBinding('class.selected'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeYearCellComponent.prototype, "selected", null);
__decorate([
    HostBinding('class.today'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeYearCellComponent.prototype, "today", null);
__decorate([
    HostBinding('class.disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbCalendarRangeYearCellComponent.prototype, "disabled", null);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbCalendarRangeYearCellComponent.prototype, "onClick", null);
NbCalendarRangeYearCellComponent = __decorate([
    Component({
        selector: 'nb-calendar-range-year-cell',
        template: `{{ year }}`,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: { 'class': 'year-cell' }
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarRangeYearCellComponent);
export { NbCalendarRangeYearCellComponent };
//# sourceMappingURL=calendar-range-cells.js.map