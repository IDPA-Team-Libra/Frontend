var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCdkAdapterModule_1;
import { NgModule } from '@angular/core';
import { OverlayContainer, ScrollDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { NbOverlayContainer } from '../overlay/mapping';
import { NbOverlayContainerAdapter } from './overlay-container-adapter';
import { NbScrollDispatcherAdapter } from './scroll-dispatcher-adapter';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';
import { NbBlockScrollStrategyAdapter, NbScrollStrategyOptions } from './block-scroll-strategy-adapter';
let NbCdkAdapterModule = NbCdkAdapterModule_1 = class NbCdkAdapterModule {
    static forRoot() {
        return {
            ngModule: NbCdkAdapterModule_1,
            providers: [
                NbViewportRulerAdapter,
                NbOverlayContainerAdapter,
                NbBlockScrollStrategyAdapter,
                { provide: OverlayContainer, useExisting: NbOverlayContainerAdapter },
                { provide: NbOverlayContainer, useExisting: NbOverlayContainerAdapter },
                { provide: ScrollDispatcher, useClass: NbScrollDispatcherAdapter },
                { provide: ScrollStrategyOptions, useClass: NbScrollStrategyOptions },
            ],
        };
    }
};
NbCdkAdapterModule = NbCdkAdapterModule_1 = __decorate([
    NgModule({})
], NbCdkAdapterModule);
export { NbCdkAdapterModule };
//# sourceMappingURL=adapter.module.js.map