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
var NbActionComponent = /** @class */ (function () {
    function NbActionComponent() {
        /**
         * Optional title for mouseover
         * @type string
         */
        this.title = '';
        this._disabled = false;
    }
    Object.defineProperty(NbActionComponent.prototype, "disabled", {
        /**
         * Visually disables the item
         * @type boolean
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <ng-container *ngIf=\"icon; else projectedContent\">\n      <a class=\"icon-container\"\n         [routerLink]=\"link\"\n         [title]=\"title\"\n         *ngIf=\"link\">\n        <nb-icon [config]=\"icon\"></nb-icon>\n      </a>\n      <a class=\"icon-container\"\n         [href]=\"href\"\n         [title]=\"title\"\n         *ngIf=\"href && !link\">\n        <nb-icon [config]=\"icon\"></nb-icon>\n      </a>\n      <a class=\"icon-container\"\n         href=\"#\"\n         [title]=\"title\"\n         *ngIf=\"!href && !link\"\n         (click)=\"$event.preventDefault()\">\n        <nb-icon [config]=\"icon\"></nb-icon>\n      </a>\n    </ng-container>\n\n    <ng-template #projectedContent>\n      <ng-content></ng-content>\n    </ng-template>\n\n    <nb-badge *ngIf=\"badgeText\"\n              [text]=\"badgeText\"\n              [status]=\"badgeStatus\"\n              [position]=\"badgePosition\">\n    </nb-badge>\n  ",
            styles: [":host{background:transparent;display:flex;align-items:center;position:relative}:host(.disabled){cursor:not-allowed}:host(.disabled) a,:host(.disabled) nb-icon{cursor:not-allowed}:host-context(nb-actions.full-width){justify-content:center;width:100%}a.icon-container:hover,a.icon-container:focus{text-decoration:none}nb-icon:hover{cursor:pointer}\n"]
        })
    ], NbActionComponent);
    return NbActionComponent;
}());
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
var NbActionsComponent = /** @class */ (function () {
    function NbActionsComponent() {
        this._size = 'small';
        this._fullWidth = false;
    }
    Object.defineProperty(NbActionsComponent.prototype, "size", {
        /**
         * Size of the component: 'tiny', 'small' (default), 'medium', 'large', 'giant'
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "fullWidth", {
        /**
         * Component will fill full width of the container
         */
        get: function () {
            return this._fullWidth;
        },
        set: function (value) {
            this._fullWidth = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <ng-content select=\"nb-action\"></ng-content>\n  ",
            styles: [":host{display:flex;align-items:center}\n"]
        })
    ], NbActionsComponent);
    return NbActionsComponent;
}());
export { NbActionsComponent };
//# sourceMappingURL=actions.component.js.map