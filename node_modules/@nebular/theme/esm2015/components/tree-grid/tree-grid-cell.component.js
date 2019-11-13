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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbTreeGridCellDirective_1, NbTreeGridHeaderCellDirective_1, NbTreeGridFooterCellDirective_1;
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, takeWhile } from 'rxjs/operators';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW } from '../../theme.options';
import { NbCellDirective, NbFooterCellDirective, NbHeaderCellDirective } from '../cdk/table/cell';
import { NbCdkCell, NbCdkFooterCell, NbCdkHeaderCell } from '../cdk/table/type-mappings';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import { NbColumnsService } from './tree-grid-columns.service';
let NbTreeGridCellDirective = NbTreeGridCellDirective_1 = class NbTreeGridCellDirective extends NbCellDirective {
    constructor(columnDef, elementRef, tree, platformId, window, sanitizer, directionService, columnService, cd) {
        super(columnDef, elementRef);
        this.platformId = platformId;
        this.window = window;
        this.sanitizer = sanitizer;
        this.directionService = directionService;
        this.columnService = columnService;
        this.cd = cd;
        this.alive = true;
        this.initialLeftPadding = '';
        this.initialRightPadding = '';
        this.tree = tree;
        this.columnDef = columnDef;
        this.elementRef = elementRef;
    }
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        return this.latestWidth || null;
    }
    get leftPadding() {
        if (this.directionService.isLtr()) {
            return this.getStartPadding();
        }
        return null;
    }
    get rightPadding() {
        if (this.directionService.isRtl()) {
            return this.getStartPadding();
        }
        return null;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const style = this.window.getComputedStyle(this.elementRef.nativeElement);
            this.initialLeftPadding = style.paddingLeft;
            this.initialRightPadding = style.paddingRight;
        }
        this.columnService.onColumnsChange()
            .pipe(takeWhile(() => this.alive), filter(() => this.latestWidth !== this.tree.getColumnWidth()))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.alive = false;
    }
    toggleRow() {
        this.tree.toggleCellRow(this);
    }
    get initialStartPadding() {
        return this.directionService.isLtr()
            ? this.initialLeftPadding
            : this.initialRightPadding;
    }
    getStartPadding() {
        const rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
        if (rowLevel === NB_DEFAULT_ROW_LEVEL) {
            return null;
        }
        const nestingLevel = rowLevel + 1;
        let padding = '';
        if (this.tree.levelPadding) {
            padding = `calc(${this.tree.levelPadding} * ${nestingLevel})`;
        }
        else if (this.initialStartPadding) {
            padding = `calc(${this.initialStartPadding} * ${nestingLevel})`;
        }
        if (!padding) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustStyle(padding);
    }
};
__decorate([
    HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], NbTreeGridCellDirective.prototype, "columnWidth", null);
__decorate([
    HostBinding('style.padding-left'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbTreeGridCellDirective.prototype, "leftPadding", null);
__decorate([
    HostBinding('style.padding-right'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbTreeGridCellDirective.prototype, "rightPadding", null);
NbTreeGridCellDirective = NbTreeGridCellDirective_1 = __decorate([
    Directive({
        selector: 'td[nbTreeGridCell]',
        host: {
            'class': 'nb-tree-grid-cell',
            'role': 'gridcell',
        },
        providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective_1 }],
    }),
    __param(2, Inject(NB_TREE_GRID)),
    __param(3, Inject(PLATFORM_ID)),
    __param(4, Inject(NB_WINDOW)),
    __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
        ElementRef, Object, Object, Object, DomSanitizer,
        NbLayoutDirectionService,
        NbColumnsService,
        ChangeDetectorRef])
], NbTreeGridCellDirective);
export { NbTreeGridCellDirective };
let NbTreeGridHeaderCellDirective = NbTreeGridHeaderCellDirective_1 = class NbTreeGridHeaderCellDirective extends NbHeaderCellDirective {
    constructor(columnDef, elementRef, tree, columnService, cd) {
        super(columnDef, elementRef);
        this.columnService = columnService;
        this.cd = cd;
        this.alive = true;
        this.tree = tree;
    }
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        return this.latestWidth || null;
    }
    ngOnInit() {
        this.columnService.onColumnsChange()
            .pipe(takeWhile(() => this.alive), filter(() => this.latestWidth !== this.tree.getColumnWidth()))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
__decorate([
    HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], NbTreeGridHeaderCellDirective.prototype, "columnWidth", null);
NbTreeGridHeaderCellDirective = NbTreeGridHeaderCellDirective_1 = __decorate([
    Directive({
        selector: 'th[nbTreeGridHeaderCell]',
        host: {
            'class': 'nb-tree-grid-header-cell',
            'role': 'columnheader',
        },
        providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective_1 }],
    }),
    __param(2, Inject(NB_TREE_GRID)),
    __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
        ElementRef, Object, NbColumnsService,
        ChangeDetectorRef])
], NbTreeGridHeaderCellDirective);
export { NbTreeGridHeaderCellDirective };
let NbTreeGridFooterCellDirective = NbTreeGridFooterCellDirective_1 = class NbTreeGridFooterCellDirective extends NbFooterCellDirective {
    constructor(columnDef, elementRef, tree, columnService, cd) {
        super(columnDef, elementRef);
        this.columnService = columnService;
        this.cd = cd;
        this.alive = true;
        this.tree = tree;
    }
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        return this.latestWidth || null;
    }
    ngOnInit() {
        this.columnService.onColumnsChange()
            .pipe(takeWhile(() => this.alive), filter(() => this.latestWidth !== this.tree.getColumnWidth()))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
__decorate([
    HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], NbTreeGridFooterCellDirective.prototype, "columnWidth", null);
NbTreeGridFooterCellDirective = NbTreeGridFooterCellDirective_1 = __decorate([
    Directive({
        selector: 'td[nbTreeGridFooterCell]',
        host: {
            'class': 'nb-tree-grid-footer-cell',
            'role': 'gridcell',
        },
        providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective_1 }],
    }),
    __param(2, Inject(NB_TREE_GRID)),
    __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
        ElementRef, Object, NbColumnsService,
        ChangeDetectorRef])
], NbTreeGridFooterCellDirective);
export { NbTreeGridFooterCellDirective };
//# sourceMappingURL=tree-grid-cell.component.js.map