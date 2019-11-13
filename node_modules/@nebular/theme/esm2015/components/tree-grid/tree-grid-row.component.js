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
var NbTreeGridRowComponent_1, NbTreeGridHeaderRowComponent_1, NbTreeGridFooterRowComponent_1;
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NbCdkFooterRow, NbCdkHeaderRow, NbCdkRow } from '../cdk/table/type-mappings';
import { NbFooterRowComponent, NbHeaderRowComponent, NbRowComponent } from '../cdk/table/row';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
export const NB_ROW_DOUBLE_CLICK_DELAY = 200;
/**
 * Cells container. Adds the right class and role.
 */
let NbTreeGridRowComponent = NbTreeGridRowComponent_1 = class NbTreeGridRowComponent extends NbRowComponent {
    constructor(tree, elementRef) {
        super();
        this.elementRef = elementRef;
        this.doubleClick$ = new Subject();
        /**
         * Time to wait for second click to expand row deeply.
         * 200ms by default.
         */
        this.doubleClickDelay = NB_ROW_DOUBLE_CLICK_DELAY;
        /**
         * Toggle row on click. Enabled by default.
         */
        this.clickToToggle = true;
        this.tree = tree;
    }
    toggleIfEnabledNode() {
        if (!this.clickToToggle) {
            return;
        }
        timer(NB_ROW_DOUBLE_CLICK_DELAY)
            .pipe(take(1), takeUntil(this.doubleClick$))
            .subscribe(() => this.tree.toggleRow(this));
    }
    toggleIfEnabledNodeDeep() {
        if (!this.clickToToggle) {
            return;
        }
        this.doubleClick$.next();
        this.tree.toggleRow(this, { deep: true });
    }
    ngOnDestroy() {
        this.doubleClick$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], NbTreeGridRowComponent.prototype, "doubleClickDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbTreeGridRowComponent.prototype, "clickToToggle", void 0);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbTreeGridRowComponent.prototype, "toggleIfEnabledNode", null);
__decorate([
    HostListener('dblclick'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbTreeGridRowComponent.prototype, "toggleIfEnabledNodeDeep", null);
NbTreeGridRowComponent = NbTreeGridRowComponent_1 = __decorate([
    Component({
        selector: 'tr[nbTreeGridRow]',
        template: `<ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-tree-grid-row',
            'role': 'row',
        },
        providers: [{ provide: NbCdkRow, useExisting: NbTreeGridRowComponent_1 }],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(0, Inject(NB_TREE_GRID)),
    __metadata("design:paramtypes", [Object, ElementRef])
], NbTreeGridRowComponent);
export { NbTreeGridRowComponent };
let NbTreeGridHeaderRowComponent = NbTreeGridHeaderRowComponent_1 = class NbTreeGridHeaderRowComponent extends NbHeaderRowComponent {
};
NbTreeGridHeaderRowComponent = NbTreeGridHeaderRowComponent_1 = __decorate([
    Component({
        selector: 'tr[nbTreeGridHeaderRow]',
        template: `
    <ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-tree-grid-header-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [{ provide: NbCdkHeaderRow, useExisting: NbTreeGridHeaderRowComponent_1 }]
    })
], NbTreeGridHeaderRowComponent);
export { NbTreeGridHeaderRowComponent };
let NbTreeGridFooterRowComponent = NbTreeGridFooterRowComponent_1 = class NbTreeGridFooterRowComponent extends NbFooterRowComponent {
};
NbTreeGridFooterRowComponent = NbTreeGridFooterRowComponent_1 = __decorate([
    Component({
        selector: 'tr[nbTreeGridFooterRow]',
        template: `
    <ng-container nbCellOutlet></ng-container>`,
        host: {
            'class': 'nb-tree-grid-footer-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [{ provide: NbCdkFooterRow, useExisting: NbTreeGridFooterRowComponent_1 }]
    })
], NbTreeGridFooterRowComponent);
export { NbTreeGridFooterRowComponent };
//# sourceMappingURL=tree-grid-row.component.js.map