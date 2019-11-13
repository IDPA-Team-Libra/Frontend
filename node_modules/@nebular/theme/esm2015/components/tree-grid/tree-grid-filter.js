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
var NbFilterInputDirective_1;
import { Directive, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';
let NbFilterDirective = class NbFilterDirective {
    filter(filterRequest) {
        this.filterable.filter(filterRequest);
    }
};
__decorate([
    Input('nbFilter'),
    __metadata("design:type", Object)
], NbFilterDirective.prototype, "filterable", void 0);
NbFilterDirective = __decorate([
    Directive({ selector: '[nbFilter]' })
], NbFilterDirective);
export { NbFilterDirective };
/**
 * Helper directive to trigger data source's filter method when user types in input
 */
let NbFilterInputDirective = NbFilterInputDirective_1 = class NbFilterInputDirective extends NbFilterDirective {
    /**
     * Helper directive to trigger data source's filter method when user types in input
     */
    constructor() {
        super(...arguments);
        this.search$ = new Subject();
        this.alive = true;
        /**
         * Debounce time before triggering filter method. Set in milliseconds.
         * Default 200.
         */
        this.debounceTime = 200;
    }
    ngOnInit() {
        this.search$
            .pipe(takeWhile(() => this.alive), debounceTime(this.debounceTime))
            .subscribe((query) => {
            super.filter(query);
        });
    }
    ngOnDestroy() {
        this.alive = false;
        this.search$.complete();
    }
    filter(event) {
        this.search$.next(event.target.value);
    }
};
__decorate([
    Input('nbFilterInput'),
    __metadata("design:type", Object)
], NbFilterInputDirective.prototype, "filterable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], NbFilterInputDirective.prototype, "debounceTime", void 0);
__decorate([
    HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NbFilterInputDirective.prototype, "filter", null);
NbFilterInputDirective = NbFilterInputDirective_1 = __decorate([
    Directive({
        selector: '[nbFilterInput]',
        providers: [{ provide: NbFilterDirective, useExisting: NbFilterInputDirective_1 }],
    })
], NbFilterInputDirective);
export { NbFilterInputDirective };
//# sourceMappingURL=tree-grid-filter.js.map