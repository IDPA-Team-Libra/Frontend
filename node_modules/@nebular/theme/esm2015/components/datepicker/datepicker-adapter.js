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
import { Injectable } from '@angular/core';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbDatepickerAdapter } from './datepicker.directive';
import { NbDateService } from '../calendar-kit/services/date.service';
let NbDateAdapterService = class NbDateAdapterService extends NbDatepickerAdapter {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.picker = NbDatepickerComponent;
    }
    parse(date, format) {
        return this.dateService.parse(date, format);
    }
    format(date, format) {
        return this.dateService.format(date, format);
    }
    isValid(date, format) {
        return this.dateService.isValidDateString(date, format);
    }
};
NbDateAdapterService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NbDateService])
], NbDateAdapterService);
export { NbDateAdapterService };
let NbRangeAdapterService = class NbRangeAdapterService extends NbDatepickerAdapter {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.picker = NbRangepickerComponent;
    }
    parse(range, format) {
        const [start, end] = range.split('-').map(subDate => subDate.trim());
        return {
            start: this.dateService.parse(start, format),
            end: this.dateService.parse(end, format),
        };
    }
    format(range, format) {
        if (!range) {
            return '';
        }
        const start = this.dateService.format(range.start, format);
        const isStartValid = this.dateService.isValidDateString(start, format);
        if (!isStartValid) {
            return '';
        }
        const end = this.dateService.format(range.end, format);
        const isEndValid = this.dateService.isValidDateString(end, format);
        if (isEndValid) {
            return `${start} - ${end}`;
        }
        else {
            return start;
        }
    }
    isValid(range, format) {
        const [start, end] = range.split('-').map(subDate => subDate.trim());
        return this.dateService.isValidDateString(start, format) && this.dateService.isValidDateString(end, format);
    }
};
NbRangeAdapterService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NbDateService])
], NbRangeAdapterService);
export { NbRangeAdapterService };
//# sourceMappingURL=datepicker-adapter.js.map