/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export class NbDateService {
    constructor() {
        this.DAYS_IN_WEEK = 7;
    }
    setLocale(locale) {
        this.locale = locale;
    }
    /**
     * Checks if the date is between the start date and the end date.
     * */
    isBetween(date, start, end) {
        return this.compareDates(date, start) > 0 && this.compareDates(date, end) < 0;
    }
    ;
    /**
     * Checks is two dates have the same day.
     * */
    isSameDaySafe(date1, date2) {
        return date1 && date2 && this.isSameDay(date1, date2);
    }
    ;
    /**
     * Checks is two dates have the same month.
     * */
    isSameMonthSafe(date1, date2) {
        return date1 && date2 && this.isSameMonth(date1, date2);
    }
    /**
     * Checks is two dates have the same year.
     * */
    isSameYearSafe(date1, date2) {
        return date1 && date2 && this.isSameYear(date1, date2);
    }
}
//# sourceMappingURL=date.service.js.map