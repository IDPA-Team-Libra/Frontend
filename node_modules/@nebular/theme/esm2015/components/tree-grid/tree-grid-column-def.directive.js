var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbTreeGridColumnDefDirective_1;
import { Directive, Input } from '@angular/core';
import { NbCdkColumnDef } from '../cdk/table/type-mappings';
import { NB_SORT_HEADER_COLUMN_DEF, NbColumnDefDirective } from '../cdk/table/cell';
/**
 * Column definition for the tree-grid.
 * Defines a set of cells available for a table column.
 */
let NbTreeGridColumnDefDirective = NbTreeGridColumnDefDirective_1 = class NbTreeGridColumnDefDirective extends NbColumnDefDirective {
    /**
     * Column definition for the tree-grid.
     * Defines a set of cells available for a table column.
     */
    constructor() {
        super(...arguments);
        this.hideOnValue = null;
        this.showOnValue = null;
    }
    /**
     * Amount of pixels of viewport at which column should be hidden.
     * type number
     */
    get hideOn() {
        return this.hideOnValue;
    }
    set hideOn(value) {
        this.hideOnValue = !value && value !== 0
            ? null
            : parseInt(value, 10);
    }
    /**
     * Amount of pixels of viewport at which column should be shown.
     * type number
     */
    get showOn() {
        return this.showOnValue;
    }
    set showOn(value) {
        this.showOnValue = !value && value !== 0
            ? null
            : parseInt(value, 10);
    }
    ngOnChanges() {
        if (this.hideOn != null && this.showOn != null) {
            throw new Error(`hideOn and showOn are mutually exclusive and can't be used simultaneously.`);
        }
    }
    shouldHide(width) {
        return !this.shouldShow(width);
    }
    shouldShow(width) {
        if (this.hideOn == null && this.showOn == null) {
            return true;
        }
        if (this.hideOn != null) {
            return width > this.hideOn;
        }
        return width >= this.showOn;
    }
};
__decorate([
    Input('nbTreeGridColumnDef'),
    __metadata("design:type", String)
], NbTreeGridColumnDefDirective.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], NbTreeGridColumnDefDirective.prototype, "hideOn", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], NbTreeGridColumnDefDirective.prototype, "showOn", null);
NbTreeGridColumnDefDirective = NbTreeGridColumnDefDirective_1 = __decorate([
    Directive({
        selector: '[nbTreeGridColumnDef]',
        providers: [
            { provide: NbCdkColumnDef, useExisting: NbTreeGridColumnDefDirective_1 },
            { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbTreeGridColumnDefDirective_1 },
        ],
    })
], NbTreeGridColumnDefDirective);
export { NbTreeGridColumnDefDirective };
//# sourceMappingURL=tree-grid-column-def.directive.js.map