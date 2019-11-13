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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe, FormStyle, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth, } from '@angular/common';
import { NbDateService } from './date.service';
/**
 * The `NbNativeDateService` is basic implementation of `NbDateService` using
 * native js date objects and angular localization services.
 * */
let NbNativeDateService = class NbNativeDateService extends NbDateService {
    constructor(locale) {
        super();
        this.setLocale(locale);
    }
    setLocale(locale) {
        super.setLocale(locale);
        this.datePipe = new DatePipe(locale);
    }
    isValidDateString(date, format) {
        return !isNaN(this.parse(date, format).getTime());
    }
    today() {
        return new Date();
    }
    getDate(date) {
        return date.getDate();
    }
    getMonth(date) {
        return date.getMonth();
    }
    getYear(date) {
        return date.getFullYear();
    }
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * returns first day of the week, it can be 1 if week starts from monday
     * and 0 if from sunday and so on.
     * */
    getFirstDayOfWeek() {
        return getLocaleFirstDayOfWeek(this.locale);
    }
    getMonthName(date, style = TranslationWidth.Abbreviated) {
        const index = date.getMonth();
        return this.getMonthNameByIndex(index, style);
    }
    getMonthNameByIndex(index, style = TranslationWidth.Abbreviated) {
        return getLocaleMonthNames(this.locale, FormStyle.Format, style)[index];
    }
    getDayOfWeekNames() {
        return getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Short);
    }
    format(date, format) {
        return this.datePipe.transform(date, format);
    }
    /**
     * We haven't got capability to parse date using formatting without third party libraries.
     * */
    parse(date, format) {
        return new Date(Date.parse(date));
    }
    addDay(date, num) {
        return this.createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
    }
    addMonth(date, num) {
        const month = this.createDate(date.getFullYear(), date.getMonth() + num, 1);
        // In case of date has more days than calculated month js Date will change that month to the next one
        // because of the date overflow.
        month.setDate(Math.min(date.getDate(), this.getMonthEnd(month).getDate()));
        return month;
    }
    addYear(date, num) {
        return this.createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
    }
    clone(date) {
        return new Date(date.getTime());
    }
    compareDates(date1, date2) {
        return date1.getTime() - date2.getTime();
    }
    createDate(year, month, date) {
        const result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(result.getFullYear() - 1900);
        }
        return result;
    }
    getMonthEnd(date) {
        return this.createDate(date.getFullYear(), date.getMonth() + 1, 0);
    }
    getMonthStart(date) {
        return this.createDate(date.getFullYear(), date.getMonth(), 1);
    }
    getNumberOfDaysInMonth(date) {
        return this.getMonthEnd(date).getDate();
    }
    getYearEnd(date) {
        return this.createDate(date.getFullYear(), 11, 31);
    }
    getYearStart(date) {
        return this.createDate(date.getFullYear(), 0, 1);
    }
    isSameDay(date1, date2) {
        return this.isSameMonth(date1, date2) &&
            date1.getDate() === date2.getDate();
    }
    isSameMonth(date1, date2) {
        return this.isSameYear(date1, date2) &&
            date1.getMonth() === date2.getMonth();
    }
    isSameYear(date1, date2) {
        return date1.getFullYear() === date2.getFullYear();
    }
    getId() {
        return 'native';
    }
    getWeekNumber(date) {
        return parseInt(this.datePipe.transform(date, 'w'), 10);
    }
};
NbNativeDateService = __decorate([
    Injectable(),
    __param(0, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [String])
], NbNativeDateService);
export { NbNativeDateService };
//# sourceMappingURL=native-date.service.js.map