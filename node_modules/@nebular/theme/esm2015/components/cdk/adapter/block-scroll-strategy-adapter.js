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
import { Inject, Injectable, NgZone } from '@angular/core';
import { BlockScrollStrategy, ScrollDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/scroll.service";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "./viewport-ruler-adapter";
import * as i4 from "../../../theme.options";
/**
 * Overrides default block scroll strategy because default strategy blocks scrolling on the body only.
 * But Nebular has its own scrollable container - nb-layout. So, we need to block scrolling in it to.
 * */
let NbBlockScrollStrategyAdapter = class NbBlockScrollStrategyAdapter extends BlockScrollStrategy {
    constructor(document, viewportRuler, scrollService) {
        super(viewportRuler, document);
        this.scrollService = scrollService;
    }
    enable() {
        super.enable();
        this.scrollService.scrollable(false);
    }
    disable() {
        super.disable();
        this.scrollService.scrollable(true);
    }
};
NbBlockScrollStrategyAdapter = __decorate([
    Injectable(),
    __param(0, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [Object, NbViewportRulerAdapter,
        NbLayoutScrollService])
], NbBlockScrollStrategyAdapter);
export { NbBlockScrollStrategyAdapter };
let NbScrollStrategyOptions = class NbScrollStrategyOptions extends ScrollStrategyOptions {
    constructor(scrollService, scrollDispatcher, viewportRuler, ngZone, document) {
        super(scrollDispatcher, viewportRuler, ngZone, document);
        this.scrollService = scrollService;
        this.scrollDispatcher = scrollDispatcher;
        this.viewportRuler = viewportRuler;
        this.ngZone = ngZone;
        this.document = document;
        this.block = () => new NbBlockScrollStrategyAdapter(this.document, this.viewportRuler, this.scrollService);
    }
};
NbScrollStrategyOptions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NbScrollStrategyOptions_Factory() { return new NbScrollStrategyOptions(i0.ɵɵinject(i1.NbLayoutScrollService), i0.ɵɵinject(i2.ScrollDispatcher), i0.ɵɵinject(i3.NbViewportRulerAdapter), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i4.NB_DOCUMENT)); }, token: NbScrollStrategyOptions, providedIn: "root" });
NbScrollStrategyOptions = __decorate([
    __param(4, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [NbLayoutScrollService,
        ScrollDispatcher,
        NbViewportRulerAdapter,
        NgZone, Object])
], NbScrollStrategyOptions);
export { NbScrollStrategyOptions };
//# sourceMappingURL=block-scroll-strategy-adapter.js.map