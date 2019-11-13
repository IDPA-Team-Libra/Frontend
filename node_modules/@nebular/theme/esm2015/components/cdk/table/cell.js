/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license infornbion.
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
var NbCellDefDirective_1, NbHeaderCellDefDirective_1, NbFooterCellDefDirective_1, NbColumnDefDirective_1;
import { Directive, ElementRef, InjectionToken, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';
/**
 * Cell definition for the nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
let NbCellDefDirective = NbCellDefDirective_1 = class NbCellDefDirective extends CdkCellDef {
};
NbCellDefDirective = NbCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbCellDef]',
        providers: [{ provide: CdkCellDef, useExisting: NbCellDefDirective_1 }],
    })
], NbCellDefDirective);
export { NbCellDefDirective };
/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
let NbHeaderCellDefDirective = NbHeaderCellDefDirective_1 = class NbHeaderCellDefDirective extends CdkHeaderCellDef {
};
NbHeaderCellDefDirective = NbHeaderCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbHeaderCellDef]',
        providers: [{ provide: CdkHeaderCellDef, useExisting: NbHeaderCellDefDirective_1 }],
    })
], NbHeaderCellDefDirective);
export { NbHeaderCellDefDirective };
/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
let NbFooterCellDefDirective = NbFooterCellDefDirective_1 = class NbFooterCellDefDirective extends CdkFooterCellDef {
};
NbFooterCellDefDirective = NbFooterCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbFooterCellDef]',
        providers: [{ provide: CdkFooterCellDef, useExisting: NbFooterCellDefDirective_1 }],
    })
], NbFooterCellDefDirective);
export { NbFooterCellDefDirective };
export const NB_SORT_HEADER_COLUMN_DEF = new InjectionToken('NB_SORT_HEADER_COLUMN_DEF');
/**
 * Column definition for the nb-table.
 * Defines a set of cells available for a table column.
 */
let NbColumnDefDirective = NbColumnDefDirective_1 = class NbColumnDefDirective extends CdkColumnDef {
};
__decorate([
    Input('nbColumnDef'),
    __metadata("design:type", String)
], NbColumnDefDirective.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbColumnDefDirective.prototype, "sticky", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbColumnDefDirective.prototype, "stickyEnd", void 0);
NbColumnDefDirective = NbColumnDefDirective_1 = __decorate([
    Directive({
        selector: '[nbColumnDef]',
        providers: [
            { provide: CdkColumnDef, useExisting: NbColumnDefDirective_1 },
            { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbColumnDefDirective_1 },
        ],
    })
], NbColumnDefDirective);
export { NbColumnDefDirective };
/** Header cell template container that adds the right classes and role. */
let NbHeaderCellDirective = class NbHeaderCellDirective extends CdkHeaderCell {
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
    }
};
NbHeaderCellDirective = __decorate([
    Directive({
        selector: 'nb-header-cell, th[nbHeaderCell]',
        host: {
            'class': 'nb-header-cell',
            'role': 'columnheader',
        },
    }),
    __metadata("design:paramtypes", [NbColumnDefDirective,
        ElementRef])
], NbHeaderCellDirective);
export { NbHeaderCellDirective };
/** Footer cell template container that adds the right classes and role. */
let NbFooterCellDirective = class NbFooterCellDirective extends CdkFooterCell {
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
    }
};
NbFooterCellDirective = __decorate([
    Directive({
        selector: 'nb-footer-cell, td[nbFooterCell]',
        host: {
            'class': 'nb-footer-cell',
            'role': 'gridcell',
        },
    }),
    __metadata("design:paramtypes", [NbColumnDefDirective,
        ElementRef])
], NbFooterCellDirective);
export { NbFooterCellDirective };
/** Cell template container that adds the right classes and role. */
let NbCellDirective = class NbCellDirective extends CdkCell {
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
    }
};
NbCellDirective = __decorate([
    Directive({
        selector: 'nb-cell, td[nbCell]',
        host: {
            'class': 'nb-cell',
            'role': 'gridcell',
        },
    }),
    __metadata("design:paramtypes", [NbColumnDefDirective,
        ElementRef])
], NbCellDirective);
export { NbCellDirective };
//# sourceMappingURL=cell.js.map