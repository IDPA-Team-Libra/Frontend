var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDataRowOutletDirective_1, NbHeaderRowOutletDirective_1, NbFooterRowOutletDirective_1, NbCellOutletDirective_1, NbHeaderRowDefDirective_1, NbFooterRowDefDirective_1, NbRowDefDirective_1, NbHeaderRowComponent_1, NbFooterRowComponent_1, NbRowComponent_1;
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkCellOutlet, DataRowOutlet, HeaderRowOutlet, FooterRowOutlet, } from '@angular/cdk/table';
let NbDataRowOutletDirective = NbDataRowOutletDirective_1 = class NbDataRowOutletDirective extends DataRowOutlet {
};
NbDataRowOutletDirective = NbDataRowOutletDirective_1 = __decorate([
    Directive({
        selector: '[nbRowOutlet]',
        providers: [{ provide: DataRowOutlet, useExisting: NbDataRowOutletDirective_1 }],
    })
], NbDataRowOutletDirective);
export { NbDataRowOutletDirective };
let NbHeaderRowOutletDirective = NbHeaderRowOutletDirective_1 = class NbHeaderRowOutletDirective extends HeaderRowOutlet {
};
NbHeaderRowOutletDirective = NbHeaderRowOutletDirective_1 = __decorate([
    Directive({
        selector: '[nbHeaderRowOutlet]',
        providers: [{ provide: HeaderRowOutlet, useExisting: NbHeaderRowOutletDirective_1 }],
    })
], NbHeaderRowOutletDirective);
export { NbHeaderRowOutletDirective };
let NbFooterRowOutletDirective = NbFooterRowOutletDirective_1 = class NbFooterRowOutletDirective extends FooterRowOutlet {
};
NbFooterRowOutletDirective = NbFooterRowOutletDirective_1 = __decorate([
    Directive({
        selector: '[nbFooterRowOutlet]',
        providers: [{ provide: FooterRowOutlet, useExisting: NbFooterRowOutletDirective_1 }],
    })
], NbFooterRowOutletDirective);
export { NbFooterRowOutletDirective };
let NbCellOutletDirective = NbCellOutletDirective_1 = class NbCellOutletDirective extends CdkCellOutlet {
};
NbCellOutletDirective = NbCellOutletDirective_1 = __decorate([
    Directive({
        selector: '[nbCellOutlet]',
        providers: [{ provide: CdkCellOutlet, useExisting: NbCellOutletDirective_1 }],
    })
], NbCellOutletDirective);
export { NbCellOutletDirective };
/**
 * Header row definition for the nb-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
let NbHeaderRowDefDirective = NbHeaderRowDefDirective_1 = class NbHeaderRowDefDirective extends CdkHeaderRowDef {
};
__decorate([
    Input('nbHeaderRowDef'),
    __metadata("design:type", Object)
], NbHeaderRowDefDirective.prototype, "columns", void 0);
__decorate([
    Input('nbHeaderRowDefSticky'),
    __metadata("design:type", Boolean)
], NbHeaderRowDefDirective.prototype, "sticky", void 0);
NbHeaderRowDefDirective = NbHeaderRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbHeaderRowDef]',
        providers: [{ provide: CdkHeaderRowDef, useExisting: NbHeaderRowDefDirective_1 }],
    })
], NbHeaderRowDefDirective);
export { NbHeaderRowDefDirective };
/**
 * Footer row definition for the nb-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
let NbFooterRowDefDirective = NbFooterRowDefDirective_1 = class NbFooterRowDefDirective extends CdkFooterRowDef {
};
__decorate([
    Input('nbFooterRowDef'),
    __metadata("design:type", Object)
], NbFooterRowDefDirective.prototype, "columns", void 0);
__decorate([
    Input('nbFooterRowDefSticky'),
    __metadata("design:type", Boolean)
], NbFooterRowDefDirective.prototype, "sticky", void 0);
NbFooterRowDefDirective = NbFooterRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbFooterRowDef]',
        providers: [{ provide: CdkFooterRowDef, useExisting: NbFooterRowDefDirective_1 }],
    })
], NbFooterRowDefDirective);
export { NbFooterRowDefDirective };
/**
 * Data row definition for the nb-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
let NbRowDefDirective = NbRowDefDirective_1 = class NbRowDefDirective extends CdkRowDef {
};
__decorate([
    Input('nbRowDefColumns'),
    __metadata("design:type", Object)
], NbRowDefDirective.prototype, "columns", void 0);
__decorate([
    Input('nbRowDefWhen'),
    __metadata("design:type", Function)
], NbRowDefDirective.prototype, "when", void 0);
NbRowDefDirective = NbRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbRowDef]',
        providers: [{ provide: CdkRowDef, useExisting: NbRowDefDirective_1 }],
    })
], NbRowDefDirective);
export { NbRowDefDirective };
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let NbHeaderRowComponent = NbHeaderRowComponent_1 = class NbHeaderRowComponent extends CdkHeaderRow {
};
NbHeaderRowComponent = NbHeaderRowComponent_1 = __decorate([
    Component({
        selector: 'nb-header-row, tr[nbHeaderRow]',
        template: `
    <ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-header-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [{ provide: CdkHeaderRow, useExisting: NbHeaderRowComponent_1 }]
    })
], NbHeaderRowComponent);
export { NbHeaderRowComponent };
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let NbFooterRowComponent = NbFooterRowComponent_1 = class NbFooterRowComponent extends CdkFooterRow {
};
NbFooterRowComponent = NbFooterRowComponent_1 = __decorate([
    Component({
        selector: 'nb-footer-row, tr[nbFooterRow]',
        template: `
    <ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-footer-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [{ provide: CdkFooterRow, useExisting: NbFooterRowComponent_1 }]
    })
], NbFooterRowComponent);
export { NbFooterRowComponent };
/** Data row template container that contains the cell outlet. Adds the right class and role. */
let NbRowComponent = NbRowComponent_1 = class NbRowComponent extends CdkRow {
};
NbRowComponent = NbRowComponent_1 = __decorate([
    Component({
        selector: 'nb-row, tr[nbRow]',
        template: `
    <ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-row',
            'role': 'row',
        },
        providers: [{ provide: CdkRow, useExisting: NbRowComponent_1 }],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], NbRowComponent);
export { NbRowComponent };
//# sourceMappingURL=row.js.map