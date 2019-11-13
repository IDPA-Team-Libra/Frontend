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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
/**
 * Sidebar service.
 *
 * Root module service to control the sidebar from any part of the app.
 *
 * Allows you to change sidebar state dynamically from any part of the app:
 * @stacked-example(Sidebar State, sidebar/sidebar-toggle.component)
 */
let NbSidebarService = class NbSidebarService {
    /**
     * Sidebar service.
     *
     * Root module service to control the sidebar from any part of the app.
     *
     * Allows you to change sidebar state dynamically from any part of the app:
     * @stacked-example(Sidebar State, sidebar/sidebar-toggle.component)
     */
    constructor() {
        this.toggle$ = new Subject();
        this.expand$ = new Subject();
        this.collapse$ = new Subject();
        this.compact$ = new Subject();
    }
    /**
     * Subscribe to toggle events
     *
     * @returns Observable<{ compact: boolean, tag: string }>
     */
    onToggle() {
        return this.toggle$.pipe(share());
    }
    /**
     * Subscribe to expand events
     * @returns Observable<{ tag: string }>
     */
    onExpand() {
        return this.expand$.pipe(share());
    }
    /**
     * Subscribe to collapse evens
     * @returns Observable<{ tag: string }>
     */
    onCollapse() {
        return this.collapse$.pipe(share());
    }
    /**
     * Subscribe to compact evens
     * @returns Observable<{ tag: string }>
     */
    onCompact() {
        return this.compact$.pipe(share());
    }
    /**
     * Toggle a sidebar
     * @param {boolean} compact
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    toggle(compact = false, tag) {
        this.toggle$.next({ compact, tag });
    }
    /**
     * Expands a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    expand(tag) {
        this.expand$.next({ tag });
    }
    /**
     * Collapses a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    collapse(tag) {
        this.collapse$.next({ tag });
    }
    /**
     * Makes sidebar compact
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    compact(tag) {
        this.compact$.next({ tag });
    }
};
NbSidebarService = __decorate([
    Injectable()
], NbSidebarService);
export { NbSidebarService };
//# sourceMappingURL=sidebar.service.js.map