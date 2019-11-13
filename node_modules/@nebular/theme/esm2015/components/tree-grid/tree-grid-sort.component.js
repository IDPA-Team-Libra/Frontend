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
import { ChangeDetectionStrategy, Component, ContentChild, Directive, EventEmitter, HostBinding, HostListener, Inject, Input, Output, TemplateRef, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NB_SORT_HEADER_COLUMN_DEF } from '../cdk/table/cell';
export var NbSortDirection;
(function (NbSortDirection) {
    NbSortDirection["ASCENDING"] = "asc";
    NbSortDirection["DESCENDING"] = "desc";
    NbSortDirection["NONE"] = "";
})(NbSortDirection || (NbSortDirection = {}));
const sortDirections = [
    NbSortDirection.ASCENDING,
    NbSortDirection.DESCENDING,
    NbSortDirection.NONE,
];
/**
 * Directive triggers sort method of passed object when sort header changes direction
 */
let NbSortDirective = class NbSortDirective {
    /**
     * Directive triggers sort method of passed object when sort header changes direction
     */
    constructor() {
        this.sort = new EventEmitter();
    }
    emitSort(sortRequest) {
        if (this.sortable && this.sortable.sort) {
            this.sortable.sort(sortRequest);
        }
        this.sort.emit(sortRequest);
    }
};
__decorate([
    Input('nbSort'),
    __metadata("design:type", Object)
], NbSortDirective.prototype, "sortable", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbSortDirective.prototype, "sort", void 0);
NbSortDirective = __decorate([
    Directive({ selector: '[nbSort]' })
], NbSortDirective);
export { NbSortDirective };
/**
 * Directive for headers sort icons. Mark you icon implementation with this structural directive and
 * it'll set template's implicit context with current direction. Context also has `isAscending`,
 * `isDescending` and `isNone` properties.
 */
let NbSortHeaderIconDirective = class NbSortHeaderIconDirective {
};
NbSortHeaderIconDirective = __decorate([
    Directive({ selector: '[nbSortHeaderIcon]' })
], NbSortHeaderIconDirective);
export { NbSortHeaderIconDirective };
let NbSortIconComponent = class NbSortIconComponent {
    constructor() {
        this.direction = NbSortDirection.NONE;
    }
    isAscending() {
        return this.direction === NbSortDirection.ASCENDING;
    }
    isDescending() {
        return this.direction === NbSortDirection.DESCENDING;
    }
    isDirectionSet() {
        return this.isAscending() || this.isDescending();
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbSortIconComponent.prototype, "direction", void 0);
NbSortIconComponent = __decorate([
    Component({
        selector: 'nb-sort-icon',
        template: `
    <ng-container *ngIf="isDirectionSet()">
      <nb-icon *ngIf="isAscending()" icon="chevron-down-outline" pack="nebular-essentials" aria-hidden="true"></nb-icon>
      <nb-icon *ngIf="isDescending()" icon="chevron-up-outline" pack="nebular-essentials" aria-hidden="true"></nb-icon>
    </ng-container>
  `
    })
], NbSortIconComponent);
export { NbSortIconComponent };
/**
 * Marks header as sort header so it emitting sort event when clicked.
 */
let NbSortHeaderComponent = class NbSortHeaderComponent {
    constructor(sort, columnDef) {
        this.sort = sort;
        this.columnDef = columnDef;
        this.disabledValue = false;
    }
    /**
     * Disable sort header
     */
    set disabled(value) {
        this.disabledValue = convertToBoolProperty(value);
    }
    get disabled() {
        return this.disabledValue;
    }
    sortIfEnabled() {
        if (!this.disabled) {
            this.sortData();
        }
    }
    isAscending() {
        return this.direction === NbSortDirection.ASCENDING;
    }
    isDescending() {
        return this.direction === NbSortDirection.DESCENDING;
    }
    sortData() {
        const sortRequest = this.createSortRequest();
        this.sort.emitSort(sortRequest);
    }
    getIconContext() {
        return {
            $implicit: this.direction,
            isAscending: this.isAscending(),
            isDescending: this.isDescending(),
            isNone: !this.isAscending() && !this.isDescending(),
        };
    }
    getDisabledAttributeValue() {
        return this.disabled ? '' : null;
    }
    createSortRequest() {
        this.direction = this.getNextDirection();
        return { direction: this.direction, column: this.columnDef.name };
    }
    getNextDirection() {
        const sortDirectionCycle = sortDirections;
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
};
__decorate([
    ContentChild(NbSortHeaderIconDirective, { read: TemplateRef, static: false }),
    __metadata("design:type", TemplateRef)
], NbSortHeaderComponent.prototype, "sortIcon", void 0);
__decorate([
    Input('nbSortHeader'),
    __metadata("design:type", String)
], NbSortHeaderComponent.prototype, "direction", void 0);
__decorate([
    Input(),
    HostBinding('class.disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], NbSortHeaderComponent.prototype, "disabled", null);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbSortHeaderComponent.prototype, "sortIfEnabled", null);
NbSortHeaderComponent = __decorate([
    Component({
        selector: '[nbSortHeader]',
        template: `
    <button
      class="nb-tree-grid-header-change-sort-button"
      type="button"
      [attr.disabled]="getDisabledAttributeValue()"
      (click)="sortData()">
      <ng-content></ng-content>
    </button>
    <nb-sort-icon *ngIf="!sortIcon; else customIcon" [direction]="direction"></nb-sort-icon>
    <ng-template #customIcon [ngTemplateOutlet]="sortIcon" [ngTemplateOutletContext]="getIconContext()"></ng-template>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(1, Inject(NB_SORT_HEADER_COLUMN_DEF)),
    __metadata("design:paramtypes", [NbSortDirective, Object])
], NbSortHeaderComponent);
export { NbSortHeaderComponent };
//# sourceMappingURL=tree-grid-sort.component.js.map