var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbTreeGridRowDefDirective_1, NbTreeGridHeaderRowDefDirective_1, NbTreeGridFooterRowDefDirective_1, NbTreeGridCellDefDirective_1, NbTreeGridHeaderCellDefDirective_1, NbTreeGridFooterCellDefDirective_1;
import { Directive, Input, IterableDiffers, TemplateRef } from '@angular/core';
import { NbCdkCellDef, NbCdkFooterCellDef, NbCdkFooterRowDef, NbCdkHeaderCellDef, NbCdkHeaderRowDef, NbCdkRowDef, } from '../cdk/table/type-mappings';
import { NbCellDefDirective, NbFooterCellDefDirective, NbHeaderCellDefDirective } from '../cdk/table/cell';
import { NbFooterRowDefDirective, NbHeaderRowDefDirective, NbRowDefDirective } from '../cdk/table/row';
import { NbColumnsService } from './tree-grid-columns.service';
/**
 * Data row definition for the tree-grid.
 * Captures the header row's template and columns to display.
 */
let NbTreeGridRowDefDirective = NbTreeGridRowDefDirective_1 = class NbTreeGridRowDefDirective extends NbRowDefDirective {
    constructor(template, differs, columnsService) {
        super(template, differs);
        this.columnsService = columnsService;
    }
    /**
     * Columns to be displayed on this row
     */
    set columns(value) {
        this.columnsService.setColumns(value);
    }
    get columns() {
        return this.columnsService.getVisibleColumns();
    }
    /** @docs-private */
    hideColumn(column) {
        this.columnsService.hideColumn(column);
    }
    /** @docs-private */
    showColumn(column) {
        this.columnsService.showColumn(column);
    }
};
__decorate([
    Input('nbTreeGridRowDefColumns'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbTreeGridRowDefDirective.prototype, "columns", null);
NbTreeGridRowDefDirective = NbTreeGridRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridRowDef]',
        providers: [{ provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective_1 }],
    }),
    __metadata("design:paramtypes", [TemplateRef,
        IterableDiffers,
        NbColumnsService])
], NbTreeGridRowDefDirective);
export { NbTreeGridRowDefDirective };
let NbTreeGridHeaderRowDefDirective = NbTreeGridHeaderRowDefDirective_1 = class NbTreeGridHeaderRowDefDirective extends NbHeaderRowDefDirective {
    constructor(template, differs, columnsService) {
        super(template, differs);
        this.columnsService = columnsService;
    }
    /**
     * Columns to be displayed on this row
     */
    set columns(value) {
        this.columnsService.setColumns(value);
    }
    get columns() {
        return this.columnsService.getVisibleColumns();
    }
    /** @docs-private */
    hideColumn(column) {
        this.columnsService.hideColumn(column);
    }
    /** @docs-private */
    showColumn(column) {
        this.columnsService.showColumn(column);
    }
};
__decorate([
    Input('nbTreeGridHeaderRowDef'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbTreeGridHeaderRowDefDirective.prototype, "columns", null);
NbTreeGridHeaderRowDefDirective = NbTreeGridHeaderRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridHeaderRowDef]',
        providers: [{ provide: NbCdkHeaderRowDef, useExisting: NbTreeGridHeaderRowDefDirective_1 }],
    }),
    __metadata("design:paramtypes", [TemplateRef,
        IterableDiffers,
        NbColumnsService])
], NbTreeGridHeaderRowDefDirective);
export { NbTreeGridHeaderRowDefDirective };
let NbTreeGridFooterRowDefDirective = NbTreeGridFooterRowDefDirective_1 = class NbTreeGridFooterRowDefDirective extends NbFooterRowDefDirective {
    constructor(template, differs, columnsService) {
        super(template, differs);
        this.columnsService = columnsService;
    }
    /**
     * Columns to be displayed on this row
     */
    set columns(value) {
        this.columnsService.setColumns(value);
    }
    get columns() {
        return this.columnsService.getVisibleColumns();
    }
    /** @docs-private */
    hideColumn(column) {
        this.columnsService.hideColumn(column);
    }
    /** @docs-private */
    showColumn(column) {
        this.columnsService.showColumn(column);
    }
};
__decorate([
    Input('nbTreeGridFooterRowDef'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbTreeGridFooterRowDefDirective.prototype, "columns", null);
NbTreeGridFooterRowDefDirective = NbTreeGridFooterRowDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridFooterRowDef]',
        providers: [{ provide: NbCdkFooterRowDef, useExisting: NbTreeGridFooterRowDefDirective_1 }],
    }),
    __metadata("design:paramtypes", [TemplateRef,
        IterableDiffers,
        NbColumnsService])
], NbTreeGridFooterRowDefDirective);
export { NbTreeGridFooterRowDefDirective };
/**
 * Cell definition for a nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
let NbTreeGridCellDefDirective = NbTreeGridCellDefDirective_1 = class NbTreeGridCellDefDirective extends NbCellDefDirective {
};
NbTreeGridCellDefDirective = NbTreeGridCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridCellDef]',
        providers: [{ provide: NbCdkCellDef, useExisting: NbTreeGridCellDefDirective_1 }],
    })
], NbTreeGridCellDefDirective);
export { NbTreeGridCellDefDirective };
/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
let NbTreeGridHeaderCellDefDirective = NbTreeGridHeaderCellDefDirective_1 = class NbTreeGridHeaderCellDefDirective extends NbHeaderCellDefDirective {
};
NbTreeGridHeaderCellDefDirective = NbTreeGridHeaderCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridHeaderCellDef]',
        providers: [{ provide: NbCdkHeaderCellDef, useExisting: NbTreeGridHeaderCellDefDirective_1 }],
    })
], NbTreeGridHeaderCellDefDirective);
export { NbTreeGridHeaderCellDefDirective };
/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
let NbTreeGridFooterCellDefDirective = NbTreeGridFooterCellDefDirective_1 = class NbTreeGridFooterCellDefDirective extends NbFooterCellDefDirective {
};
NbTreeGridFooterCellDefDirective = NbTreeGridFooterCellDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridFooterCellDef]',
        providers: [{ provide: NbCdkFooterCellDef, useExisting: NbTreeGridFooterCellDefDirective_1 }],
    })
], NbTreeGridFooterCellDefDirective);
export { NbTreeGridFooterCellDefDirective };
//# sourceMappingURL=tree-grid-def.component.js.map