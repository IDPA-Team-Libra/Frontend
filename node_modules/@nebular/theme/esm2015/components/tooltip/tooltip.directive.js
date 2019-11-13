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
import { Directive, ElementRef, Input, Output, EventEmitter, } from '@angular/core';
import { skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbDynamicOverlay } from '../cdk/overlay/dynamic/dynamic-overlay';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbTooltipComponent } from './tooltip.component';
/**
 *
 * Tooltip directive for small text/icon hints.
 *
 * ### Installation
 *
 * Import `NbTooltipModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTooltipModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * @stacked-example(Showcase, tooltip/tooltip-showcase.component)
 *
 * Tooltip can accept a hint text and/or an icon:
 * @stacked-example(With Icon, tooltip/tooltip-with-icon.component)
 *
 * Same way as Popover, tooltip can accept placement position with `nbTooltipPlacement` property:
 * @stacked-example(Placements, tooltip/tooltip-placements.component)
 *
 * It is also possible to specify tooltip color using `nbTooltipStatus` property:
 * @stacked-example(Colored Tooltips, tooltip/tooltip-colors.component)
 *
 * Tooltip has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 */
let NbTooltipDirective = class NbTooltipDirective {
    constructor(hostRef, dynamicOverlayHandler) {
        this.hostRef = hostRef;
        this.dynamicOverlayHandler = dynamicOverlayHandler;
        this.destroy$ = new Subject();
        this.tooltipComponent = NbTooltipComponent;
        this.offset = 8;
        this.context = {};
        /**
         * Position will be calculated relatively host element based on the position.
         * Can be top, right, bottom, left, start or end.
         */
        this.position = NbPosition.TOP;
        this._adjustment = NbAdjustment.CLOCKWISE;
        this.tooltipClass = '';
        /**
         * Describes when the container will be shown.
         * Available options: `click`, `hover`, `hint`, `focus` and `noop`
         * */
        this.trigger = NbTrigger.HINT;
        this.nbTooltipShowStateChange = new EventEmitter();
    }
    /**
     * Container position will change automatically based on this strategy if container can't fit view port.
     * Set this property to `noop` value if you want to disable automatic adjustment.
     * Available values: `clockwise` (default), `counterclockwise`, `vertical`, `horizontal`, `noop`.
     */
    get adjustment() {
        return this._adjustment;
    }
    set adjustment(value) {
        if (!value) {
            // @breaking-change Remove @5.0.0
            console.warn(`Falsy values for 'nbPopoverAdjustment' are deprecated and will be removed in Nebular 5.
 Use 'noop' instead.`);
            value = NbAdjustment.NOOP;
        }
        this._adjustment = value;
    }
    /**
     * Accepts icon name or icon config object
     * @param {string | NbIconConfig} icon name or config object
     */
    set icon(icon) {
        this.context = Object.assign(this.context, { icon });
    }
    /**
     *
     * @param {string} status
     */
    set status(status) {
        this.context = Object.assign(this.context, { status });
    }
    get isShown() {
        return !!(this.dynamicOverlay && this.dynamicOverlay.isAttached);
    }
    ngOnInit() {
        this.dynamicOverlayHandler
            .host(this.hostRef)
            .componentType(this.tooltipComponent)
            .offset(this.offset);
    }
    ngOnChanges() {
        this.rebuild();
    }
    ngAfterViewInit() {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .build();
        this.dynamicOverlay.isShown
            .pipe(skip(1), takeUntil(this.destroy$))
            .subscribe((isShown) => this.nbTooltipShowStateChange.emit({ isShown }));
    }
    rebuild() {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .rebuild();
    }
    show() {
        this.dynamicOverlay.show();
    }
    hide() {
        this.dynamicOverlay.hide();
    }
    toggle() {
        this.dynamicOverlay.toggle();
    }
    ngOnDestroy() {
        this.dynamicOverlayHandler.destroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    configureDynamicOverlay() {
        return this.dynamicOverlayHandler
            .position(this.position)
            .trigger(this.trigger)
            .adjustment(this.adjustment)
            .content(this.content)
            .context(this.context)
            .overlayConfig({ panelClass: this.tooltipClass });
    }
};
__decorate([
    Input('nbTooltip'),
    __metadata("design:type", String)
], NbTooltipDirective.prototype, "content", void 0);
__decorate([
    Input('nbTooltipPlacement'),
    __metadata("design:type", String)
], NbTooltipDirective.prototype, "position", void 0);
__decorate([
    Input('nbTooltipAdjustment'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbTooltipDirective.prototype, "adjustment", null);
__decorate([
    Input('nbTooltipClass'),
    __metadata("design:type", String)
], NbTooltipDirective.prototype, "tooltipClass", void 0);
__decorate([
    Input('nbTooltipIcon'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbTooltipDirective.prototype, "icon", null);
__decorate([
    Input('nbTooltipStatus'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbTooltipDirective.prototype, "status", null);
__decorate([
    Input('nbTooltipTrigger'),
    __metadata("design:type", String)
], NbTooltipDirective.prototype, "trigger", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbTooltipDirective.prototype, "nbTooltipShowStateChange", void 0);
NbTooltipDirective = __decorate([
    Directive({
        selector: '[nbTooltip]',
        exportAs: 'nbTooltip',
        providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
    }),
    __metadata("design:paramtypes", [ElementRef,
        NbDynamicOverlayHandler])
], NbTooltipDirective);
export { NbTooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map