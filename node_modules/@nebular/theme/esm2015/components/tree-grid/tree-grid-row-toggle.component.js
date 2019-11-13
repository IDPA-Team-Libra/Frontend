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
import { Component, HostListener, Input } from '@angular/core';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';
/**
 * NbTreeGridRowToggleComponent
 */
let NbTreeGridRowToggleComponent = class NbTreeGridRowToggleComponent {
    constructor(cell) {
        this.cell = cell;
    }
    set expanded(value) {
        this.expandedValue = value;
    }
    get expanded() {
        return this.expandedValue;
    }
    toggleRow($event) {
        this.cell.toggleRow();
        $event.stopPropagation();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbTreeGridRowToggleComponent.prototype, "expanded", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], NbTreeGridRowToggleComponent.prototype, "toggleRow", null);
NbTreeGridRowToggleComponent = __decorate([
    Component({
        selector: 'nb-tree-grid-row-toggle',
        template: `
    <button class="row-toggle-button" [attr.aria-label]="expanded ? 'collapse' : 'expand'">
      <nb-icon [icon]="expanded ? 'chevron-down-outline' : 'chevron-right-outline'"
               pack="nebular-essentials"
               aria-hidden="true">
      </nb-icon>
    </button>
  `,
        styles: [`
    button {
      background: transparent;
      border: none;
      padding: 0;
    }
  `]
    }),
    __metadata("design:paramtypes", [NbTreeGridCellDirective])
], NbTreeGridRowToggleComponent);
export { NbTreeGridRowToggleComponent };
//# sourceMappingURL=tree-grid-row-toggle.component.js.map