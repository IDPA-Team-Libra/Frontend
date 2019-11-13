var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ContentChildren, QueryList, Input, ElementRef, Output, EventEmitter, } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import 'intersection-observer';
import { NbListItemComponent } from './list.component';
/**
 * List pager directive
 *
 * Directive allows you to determine page of currently viewing items.
 *
 */
let NbListPageTrackerDirective = class NbListPageTrackerDirective {
    constructor() {
        this.alive = true;
        /**
         * Page to start counting with.
         */
        this.startPage = 1;
        /**
         * Emits when another page become visible.
         */
        this.pageChange = new EventEmitter();
        this.observer = new IntersectionObserver(entries => this.checkForPageChange(entries), { threshold: 0.5 });
    }
    ngAfterViewInit() {
        if (this.listItems && this.listItems.length) {
            this.observeItems();
        }
        this.listItems.changes
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => this.observeItems());
    }
    ngOnDestroy() {
        this.observer.disconnect && this.observer.disconnect();
    }
    observeItems() {
        this.listItems.forEach(i => this.observer.observe(i.nativeElement));
    }
    checkForPageChange(entries) {
        const mostVisiblePage = this.findMostVisiblePage(entries);
        if (mostVisiblePage && this.currentPage !== mostVisiblePage) {
            this.currentPage = mostVisiblePage;
            this.pageChange.emit(this.currentPage);
        }
    }
    findMostVisiblePage(entries) {
        const intersectionRatioByPage = new Map();
        for (const entry of entries) {
            if (entry.intersectionRatio < 0.5) {
                continue;
            }
            const elementIndex = this.elementIndex(entry.target);
            if (elementIndex === -1) {
                continue;
            }
            const page = this.startPage + Math.floor(elementIndex / this.pageSize);
            let ratio = entry.intersectionRatio;
            if (intersectionRatioByPage.has(page)) {
                ratio += intersectionRatioByPage.get(page);
            }
            intersectionRatioByPage.set(page, ratio);
        }
        let maxRatio = 0;
        let mostVisiblePage;
        intersectionRatioByPage.forEach((ratio, page) => {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisiblePage = page;
            }
        });
        return mostVisiblePage;
    }
    elementIndex(element) {
        return element.parentElement && element.parentElement.children
            ? Array.from(element.parentElement.children).indexOf(element)
            : -1;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], NbListPageTrackerDirective.prototype, "pageSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], NbListPageTrackerDirective.prototype, "startPage", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbListPageTrackerDirective.prototype, "pageChange", void 0);
__decorate([
    ContentChildren(NbListItemComponent, { read: ElementRef }),
    __metadata("design:type", QueryList)
], NbListPageTrackerDirective.prototype, "listItems", void 0);
NbListPageTrackerDirective = __decorate([
    Directive({
        selector: '[nbListPageTracker]',
    }),
    __metadata("design:paramtypes", [])
], NbListPageTrackerDirective);
export { NbListPageTrackerDirective };
//# sourceMappingURL=list-page-tracker.directive.js.map