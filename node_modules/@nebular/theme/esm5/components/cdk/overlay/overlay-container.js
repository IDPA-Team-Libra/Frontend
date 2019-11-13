var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ComponentFactoryResolver, HostBinding, Injector, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { NbPosition } from './overlay-position';
import { NbPortalInjector, NbPortalOutletDirective } from './mapping';
var NbPositionedContainer = /** @class */ (function () {
    function NbPositionedContainer() {
    }
    Object.defineProperty(NbPositionedContainer.prototype, "top", {
        get: function () {
            return this.position === NbPosition.TOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "topStart", {
        get: function () {
            return this.position === NbPosition.TOP_START;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "topEnd", {
        get: function () {
            return this.position === NbPosition.TOP_END;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "right", {
        get: function () {
            return this.position === NbPosition.RIGHT || this.position === NbPosition.END;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "endTop", {
        get: function () {
            return this.position === NbPosition.END_TOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "endBottom", {
        get: function () {
            return this.position === NbPosition.END_BOTTOM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "bottom", {
        get: function () {
            return this.position === NbPosition.BOTTOM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "bottomStart", {
        get: function () {
            return this.position === NbPosition.BOTTOM_START;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "bottomEnd", {
        get: function () {
            return this.position === NbPosition.BOTTOM_END;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "left", {
        get: function () {
            return this.position === NbPosition.LEFT || this.position === NbPosition.START;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "startTop", {
        get: function () {
            return this.position === NbPosition.START_TOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "startBottom", {
        get: function () {
            return this.position === NbPosition.START_BOTTOM;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbPositionedContainer.prototype, "position", void 0);
    __decorate([
        HostBinding('class.nb-overlay-top'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "top", null);
    __decorate([
        HostBinding('class.nb-overlay-top-start'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "topStart", null);
    __decorate([
        HostBinding('class.nb-overlay-top-end'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "topEnd", null);
    __decorate([
        HostBinding('class.nb-overlay-right'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "right", null);
    __decorate([
        HostBinding('class.nb-overlay-end-top'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "endTop", null);
    __decorate([
        HostBinding('class.nb-overlay-end-bottom'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "endBottom", null);
    __decorate([
        HostBinding('class.nb-overlay-bottom'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "bottom", null);
    __decorate([
        HostBinding('class.nb-overlay-bottom-start'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "bottomStart", null);
    __decorate([
        HostBinding('class.nb-overlay-bottom-end'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "bottomEnd", null);
    __decorate([
        HostBinding('class.nb-overlay-left'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "left", null);
    __decorate([
        HostBinding('class.nb-overlay-start-top'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "startTop", null);
    __decorate([
        HostBinding('class.nb-overlay-start-bottom'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "startBottom", null);
    return NbPositionedContainer;
}());
export { NbPositionedContainer };
var NbOverlayContainerComponent = /** @class */ (function () {
    function NbOverlayContainerComponent(vcr, injector, changeDetectorRef) {
        this.vcr = vcr;
        this.injector = injector;
        this.changeDetectorRef = changeDetectorRef;
        this.isAttached = false;
    }
    Object.defineProperty(NbOverlayContainerComponent.prototype, "isStringContent", {
        get: function () {
            return !!this.content;
        },
        enumerable: true,
        configurable: true
    });
    NbOverlayContainerComponent.prototype.attachComponentPortal = function (portal, context) {
        portal.injector = this.createChildInjector(portal.componentFactoryResolver);
        var componentRef = this.portalOutlet.attachComponentPortal(portal);
        if (context) {
            Object.assign(componentRef.instance, context);
        }
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
        this.isAttached = true;
        return componentRef;
    };
    NbOverlayContainerComponent.prototype.attachTemplatePortal = function (portal) {
        var templateRef = this.portalOutlet.attachTemplatePortal(portal);
        templateRef.detectChanges();
        this.isAttached = true;
        return templateRef;
    };
    NbOverlayContainerComponent.prototype.attachStringContent = function (content) {
        this.content = content;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
        this.isAttached = true;
    };
    NbOverlayContainerComponent.prototype.detach = function () {
        if (this.portalOutlet.hasAttached()) {
            this.portalOutlet.detach();
        }
        this.attachStringContent(null);
        this.isAttached = false;
    };
    NbOverlayContainerComponent.prototype.createChildInjector = function (cfr) {
        return new NbPortalInjector(this.injector, new WeakMap([
            [ComponentFactoryResolver, cfr],
        ]));
    };
    __decorate([
        ViewChild(NbPortalOutletDirective, { static: true }),
        __metadata("design:type", NbPortalOutletDirective)
    ], NbOverlayContainerComponent.prototype, "portalOutlet", void 0);
    NbOverlayContainerComponent = __decorate([
        Component({
            selector: 'nb-overlay-container',
            template: "\n    <div *ngIf=\"isStringContent\" class=\"primitive-overlay\">{{ content }}</div>\n    <ng-template nbPortalOutlet></ng-template>\n  "
        }),
        __metadata("design:paramtypes", [ViewContainerRef,
            Injector, ChangeDetectorRef])
    ], NbOverlayContainerComponent);
    return NbOverlayContainerComponent;
}());
export { NbOverlayContainerComponent };
//# sourceMappingURL=overlay-container.js.map