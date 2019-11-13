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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ChangeDetectionStrategy, Host, ChangeDetectorRef, } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { takeWhile } from 'rxjs/operators';
import { NbAccordionItemComponent } from './accordion-item.component';
const accordionItemBodyTrigger = trigger('accordionItemBody', [
    state('collapsed', style({
        overflow: 'hidden',
        visibility: 'hidden',
        height: 0,
    })),
    state('expanded', style({
        overflow: 'hidden',
        visibility: 'visible',
    })),
    transition('collapsed => expanded', animate('100ms ease-in')),
    transition('expanded => collapsed', animate('100ms ease-out')),
]);
/**
 * Component intended to be used within `<nb-accordion-item>` component
 */
let NbAccordionItemBodyComponent = class NbAccordionItemBodyComponent {
    constructor(accordionItem, cd) {
        this.accordionItem = accordionItem;
        this.cd = cd;
        this.alive = true;
    }
    get state() {
        return this.accordionItem.collapsed ? 'collapsed' : 'expanded';
    }
    ngOnInit() {
        this.accordionItem.accordionItemInvalidate
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => this.cd.markForCheck());
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
NbAccordionItemBodyComponent = __decorate([
    Component({
        selector: 'nb-accordion-item-body',
        template: `
    <div [@accordionItemBody]="{ value: state }">
      <div class="item-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
        animations: [accordionItemBodyTrigger],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(0, Host()),
    __metadata("design:paramtypes", [NbAccordionItemComponent, ChangeDetectorRef])
], NbAccordionItemBodyComponent);
export { NbAccordionItemBodyComponent };
//# sourceMappingURL=accordion-item-body.component.js.map