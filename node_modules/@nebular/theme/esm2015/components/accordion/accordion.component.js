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
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
/**
 * An accordion allows to toggle the display of sections of content
 *
 * Basic example
 * @stacked-example(Showcase, accordion/accordion-showcase.component)
 *
 * ```ts
 * <nb-accordion>
 *  <nb-accordion-item>
 *   <nb-accordion-item-header>Product Details</nb-accordion-item-header>
 *   <nb-accordion-item-body>
 *     Item Content
 *   </nb-accordion-item-body>
 *  </nb-accordion-item>
 * </nb-accordion>
 * ```
 * ### Installation
 *
 * Import `NbAccordionModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAccordionModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * With `multi` mode accordion can have multiple items expanded:
 * @stacked-example(Multiple expanded items, accordion/accordion-multi.component)
 *
 * `NbAccordionItemComponent` has several methods, for example it is possible to trigger item click/toggle:
 * @stacked-example(Expand API, accordion/accordion-toggle.component)
 *
 * @styles
 *
 * accordion-border-radius:
 * accordion-padding:
 * accordion-shadow:
 * accordion-header-text-color:
 * accordion-header-text-font-family:
 * accordion-header-text-font-size:
 * accordion-header-text-font-weight:
 * accordion-header-text-line-height:
 * accordion-header-disabled-text-color:
 * accordion-header-border-color:
 * accordion-header-border-style:
 * accordion-header-border-width:
 * accordion-item-background-color:
 * accordion-item-text-color:
 * accordion-item-text-font-family:
 * accordion-item-text-font-size:
 * accordion-item-text-font-weight:
 * accordion-item-text-line-height:
 */
let NbAccordionComponent = class NbAccordionComponent {
    /**
     * An accordion allows to toggle the display of sections of content
     *
     * Basic example
     * @stacked-example(Showcase, accordion/accordion-showcase.component)
     *
     * ```ts
     * <nb-accordion>
     *  <nb-accordion-item>
     *   <nb-accordion-item-header>Product Details</nb-accordion-item-header>
     *   <nb-accordion-item-body>
     *     Item Content
     *   </nb-accordion-item-body>
     *  </nb-accordion-item>
     * </nb-accordion>
     * ```
     * ### Installation
     *
     * Import `NbAccordionModule` to your feature module.
     * ```ts
     * @NgModule({
     *   imports: [
     *     // ...
     *     NbAccordionModule,
     *   ],
     * })
     * export class PageModule { }
     * ```
     * ### Usage
     *
     * With `multi` mode accordion can have multiple items expanded:
     * @stacked-example(Multiple expanded items, accordion/accordion-multi.component)
     *
     * `NbAccordionItemComponent` has several methods, for example it is possible to trigger item click/toggle:
     * @stacked-example(Expand API, accordion/accordion-toggle.component)
     *
     * @styles
     *
     * accordion-border-radius:
     * accordion-padding:
     * accordion-shadow:
     * accordion-header-text-color:
     * accordion-header-text-font-family:
     * accordion-header-text-font-size:
     * accordion-header-text-font-weight:
     * accordion-header-text-line-height:
     * accordion-header-disabled-text-color:
     * accordion-header-border-color:
     * accordion-header-border-style:
     * accordion-header-border-width:
     * accordion-item-background-color:
     * accordion-item-text-color:
     * accordion-item-text-font-family:
     * accordion-item-text-font-size:
     * accordion-item-text-font-weight:
     * accordion-item-text-line-height:
     */
    constructor() {
        this.openCloseItems = new Subject();
        this.multiValue = false;
    }
    /**
     *  Allow multiple items to be expanded at the same time.
     * @type {boolean}
     */
    get multi() {
        return this.multiValue;
    }
    set multi(val) {
        this.multiValue = convertToBoolProperty(val);
    }
    /**
     * Opens all enabled accordion items.
     */
    openAll() {
        if (this.multi) {
            this.openCloseItems.next(false);
        }
    }
    /**
     * Closes all enabled accordion items.
     */
    closeAll() {
        this.openCloseItems.next(true);
    }
};
__decorate([
    Input('multi'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbAccordionComponent.prototype, "multi", null);
NbAccordionComponent = __decorate([
    Component({
        selector: 'nb-accordion',
        template: `
    <ng-content select="nb-accordion-item"></ng-content>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], NbAccordionComponent);
export { NbAccordionComponent };
//# sourceMappingURL=accordion.component.js.map