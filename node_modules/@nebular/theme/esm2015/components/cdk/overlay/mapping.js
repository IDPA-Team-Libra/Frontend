var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCdkMappingModule_1;
import { Directive, Injectable, NgModule, } from '@angular/core';
import { CdkPortal, CdkPortalOutlet, ComponentPortal, PortalInjector, PortalModule, TemplatePortal, } from '@angular/cdk/portal';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayContainer, OverlayModule, OverlayPositionBuilder, } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let NbPortalDirective = class NbPortalDirective extends CdkPortal {
};
NbPortalDirective = __decorate([
    Directive({ selector: '[nbPortal]' })
], NbPortalDirective);
export { NbPortalDirective };
let NbPortalOutletDirective = class NbPortalOutletDirective extends CdkPortalOutlet {
};
NbPortalOutletDirective = __decorate([
    Directive({ selector: '[nbPortalOutlet]' })
], NbPortalOutletDirective);
export { NbPortalOutletDirective };
export class NbComponentPortal extends ComponentPortal {
}
let NbOverlay = class NbOverlay extends Overlay {
};
NbOverlay = __decorate([
    Injectable()
], NbOverlay);
export { NbOverlay };
let NbPlatform = class NbPlatform extends Platform {
};
NbPlatform = __decorate([
    Injectable()
], NbPlatform);
export { NbPlatform };
let NbOverlayPositionBuilder = class NbOverlayPositionBuilder extends OverlayPositionBuilder {
};
NbOverlayPositionBuilder = __decorate([
    Injectable()
], NbOverlayPositionBuilder);
export { NbOverlayPositionBuilder };
export class NbTemplatePortal extends TemplatePortal {
    constructor(template, viewContainerRef, context) {
        super(template, viewContainerRef, context);
    }
}
export class NbOverlayContainer extends OverlayContainer {
}
NbOverlayContainer.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NbOverlayContainer_Factory() { return new NbOverlayContainer(i0.ɵɵinject(i1.DOCUMENT)); }, token: NbOverlayContainer, providedIn: "root" });
export class NbFlexibleConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {
}
export class NbPortalInjector extends PortalInjector {
}
const CDK_MODULES = [OverlayModule, PortalModule];
/**
 * This module helps us to keep all angular/cdk deps inside our cdk module via providing aliases.
 * Approach will help us move cdk in separate npm package and refactor nebular/theme code.
 * */
let NbCdkMappingModule = NbCdkMappingModule_1 = class NbCdkMappingModule {
    static forRoot() {
        return {
            ngModule: NbCdkMappingModule_1,
            providers: [
                NbOverlay,
                NbPlatform,
                NbOverlayPositionBuilder,
            ],
        };
    }
};
NbCdkMappingModule = NbCdkMappingModule_1 = __decorate([
    NgModule({
        imports: [...CDK_MODULES],
        exports: [
            ...CDK_MODULES,
            NbPortalDirective,
            NbPortalOutletDirective,
        ],
        declarations: [NbPortalDirective, NbPortalOutletDirective],
    })
], NbCdkMappingModule);
export { NbCdkMappingModule };
//# sourceMappingURL=mapping.js.map