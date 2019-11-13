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
import { Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
let NbActionComponent = class NbActionComponent {
    /**
     * Action item, display a link with an icon, or any other content provided instead.
     */
    constructor() {
        /**
         * Optional title for mouseover
         * @type string
         */
        this.title = '';
        this._disabled = false;
    }
    /**
     * Visually disables the item
     * @type boolean
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "link", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "href", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbActionComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    HostBinding('class.disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbActionComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "badgeText", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "badgeStatus", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbActionComponent.prototype, "badgePosition", void 0);
NbActionComponent = __decorate([
    Component({
        selector: 'nb-action',
        template: `
    <ng-container *ngIf="icon; else projectedContent">
      <a class="icon-container"
         [routerLink]="link"
         [title]="title"
         *ngIf="link">
        <nb-icon [config]="icon"></nb-icon>
      </a>
      <a class="icon-container"
         [href]="href"
         [title]="title"
         *ngIf="href && !link">
        <nb-icon [config]="icon"></nb-icon>
      </a>
      <a class="icon-container"
         href="#"
         [title]="title"
         *ngIf="!href && !link"
         (click)="$event.preventDefault()">
        <nb-icon [config]="icon"></nb-icon>
      </a>
    </ng-container>

    <ng-template #projectedContent>
      <ng-content></ng-content>
    </ng-template>

    <nb-badge *ngIf="badgeText"
              [text]="badgeText"
              [status]="badgeStatus"
              [position]="badgePosition">
    </nb-badge>
  `,
        styles: [":host{background:transparent;display:flex;align-items:center;position:relative}:host(.disabled){cursor:not-allowed}:host(.disabled) a,:host(.disabled) nb-icon{cursor:not-allowed}:host-context(nb-actions.full-width){justify-content:center;width:100%}a.icon-container:hover,a.icon-container:focus{text-decoration:none}nb-icon:hover{cursor:pointer}\n"]
    })
], NbActionComponent);
export { NbActionComponent };
/**
 * Shows a horizontal list of actions, available in multiple sizes.
 * Aligns items vertically.
 *
 * @stacked-example(Showcase, action/action-showcase.component)
 *
 * Basic actions setup:
 * ```html
 * <nb-actions size="small">
 *   <nb-action icon="nb-search"></nb-action>
 *   <nb-action icon="nb-power-circled"></nb-action>
 *   <nb-action icon="nb-person"></nb-action>
 * </nb-actions>
 * ```
 * ### Installation
 *
 * Import `NbActionsModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbActionsModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Multiple sizes example:
 * @stacked-example(Multiple Sizes, action/action-sizes.component)
 *
 * It is also possible to specify a `badge` value:
 *
 * @stacked-example(Action Badge, action/action-badge.component)
 *
 * and we can set it to full a width of a parent component
 * @stacked-example(Full Width, action/action-width.component)
 *
 * @styles
 *
 * actions-background-color:
 * actions-divider-color:
 * actions-divider-style:
 * actions-divider-width:
 * actions-icon-color:
 * actions-text-color:
 * actions-text-font-family:
 * actions-text-font-weight:
 * actions-text-line-height:
 * actions-disabled-icon-color:
 * actions-disabled-text-color:
 * actions-tiny-height:
 * actions-tiny-icon-height:
 * actions-tiny-padding:
 * actions-tiny-text-font-size:
 * actions-small-height:
 * actions-small-icon-height:
 * actions-small-padding:
 * actions-small-text-font-size:
 * actions-medium-height:
 * actions-medium-icon-height:
 * actions-medium-padding:
 * actions-medium-text-font-size:
 * actions-large-height:
 * actions-large-icon-height:
 * actions-large-padding:
 * actions-large-text-font-size:
 * actions-giant-height:
 * actions-giant-icon-height:
 * actions-giant-padding:
 * actions-giant-text-font-size:
 */
let NbActionsComponent = class NbActionsComponent {
    /**
     * Shows a horizontal list of actions, available in multiple sizes.
     * Aligns items vertically.
     *
     * @stacked-example(Showcase, action/action-showcase.component)
     *
     * Basic actions setup:
     * ```html
     * <nb-actions size="small">
     *   <nb-action icon="nb-search"></nb-action>
     *   <nb-action icon="nb-power-circled"></nb-action>
     *   <nb-action icon="nb-person"></nb-action>
     * </nb-actions>
     * ```
     * ### Installation
     *
     * Import `NbActionsModule` to your feature module.
     * ```ts
     * @NgModule({
     *   imports: [
     *     // ...
     *     NbActionsModule,
     *   ],
     * })
     * export class PageModule { }
     * ```
     * ### Usage
     *
     * Multiple sizes example:
     * @stacked-example(Multiple Sizes, action/action-sizes.component)
     *
     * It is also possible to specify a `badge` value:
     *
     * @stacked-example(Action Badge, action/action-badge.component)
     *
     * and we can set it to full a width of a parent component
     * @stacked-example(Full Width, action/action-width.component)
     *
     * @styles
     *
     * actions-background-color:
     * actions-divider-color:
     * actions-divider-style:
     * actions-divider-width:
     * actions-icon-color:
     * actions-text-color:
     * actions-text-font-family:
     * actions-text-font-weight:
     * actions-text-line-height:
     * actions-disabled-icon-color:
     * actions-disabled-text-color:
     * actions-tiny-height:
     * actions-tiny-icon-height:
     * actions-tiny-padding:
     * actions-tiny-text-font-size:
     * actions-small-height:
     * actions-small-icon-height:
     * actions-small-padding:
     * actions-small-text-font-size:
     * actions-medium-height:
     * actions-medium-icon-height:
     * actions-medium-padding:
     * actions-medium-text-font-size:
     * actions-large-height:
     * actions-large-icon-height:
     * actions-large-padding:
     * actions-large-text-font-size:
     * actions-giant-height:
     * actions-giant-icon-height:
     * actions-giant-padding:
     * actions-giant-text-font-size:
     */
    constructor() {
        this._size = 'small';
        this._fullWidth = false;
    }
    /**
     * Size of the component: 'tiny', 'small' (default), 'medium', 'large', 'giant'
     */
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    /**
     * Component will fill full width of the container
     */
    get fullWidth() {
        return this._fullWidth;
    }
    set fullWidth(value) {
        this._fullWidth = convertToBoolProperty(value);
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
};
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbActionsComponent.prototype, "size", null);
__decorate([
    Input(),
    HostBinding('class.full-width'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbActionsComponent.prototype, "fullWidth", null);
__decorate([
    HostBinding('class.size-tiny'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbActionsComponent.prototype, "tiny", null);
__decorate([
    HostBinding('class.size-small'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbActionsComponent.prototype, "small", null);
__decorate([
    HostBinding('class.size-medium'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbActionsComponent.prototype, "medium", null);
__decorate([
    HostBinding('class.size-large'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbActionsComponent.prototype, "large", null);
__decorate([
    HostBinding('class.size-giant'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbActionsComponent.prototype, "giant", null);
NbActionsComponent = __decorate([
    Component({
        selector: 'nb-actions',
        template: `
    <ng-content select="nb-action"></ng-content>
  `,
        styles: [":host{display:flex;align-items:center}\n"]
    })
], NbActionsComponent);
export { NbActionsComponent };
//# sourceMappingURL=actions.component.js.map