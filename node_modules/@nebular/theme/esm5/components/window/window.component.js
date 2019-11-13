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
import { Component, ElementRef, HostBinding, Inject, TemplateRef, Renderer2, ViewChild, ComponentFactoryResolver, Input, } from '@angular/core';
import { NbFocusTrapFactoryService } from '../cdk/a11y/focus-trap';
import { NbComponentPortal, NbTemplatePortal } from '../cdk/overlay/mapping';
import { NbOverlayContainerComponent } from '../cdk/overlay/overlay-container';
import { NB_WINDOW_CONTENT, NbWindowConfig, NbWindowState, NB_WINDOW_CONTEXT } from './window.options';
import { NbWindowRef } from './window-ref';
var NbWindowComponent = /** @class */ (function () {
    function NbWindowComponent(content, context, windowRef, config, focusTrapFactory, elementRef, renderer) {
        this.content = content;
        this.context = context;
        this.windowRef = windowRef;
        this.config = config;
        this.focusTrapFactory = focusTrapFactory;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(NbWindowComponent.prototype, "isFullScreen", {
        get: function () {
            return this.windowRef.state === NbWindowState.FULL_SCREEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowComponent.prototype, "maximized", {
        get: function () {
            return this.windowRef.state === NbWindowState.MAXIMIZED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowComponent.prototype, "minimized", {
        get: function () {
            return this.windowRef.state === NbWindowState.MINIMIZED;
        },
        enumerable: true,
        configurable: true
    });
    NbWindowComponent.prototype.ngOnInit = function () {
        this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        this.focusTrap.blurPreviouslyFocusedElement();
        this.focusTrap.focusInitialElement();
        if (this.config.windowClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.config.windowClass);
        }
    };
    NbWindowComponent.prototype.ngAfterViewChecked = function () {
        if (!this.overlayContainer || this.overlayContainer.isAttached) {
            return;
        }
        if (this.content instanceof TemplateRef) {
            this.attachTemplate();
        }
        else {
            this.attachComponent();
        }
    };
    NbWindowComponent.prototype.ngOnDestroy = function () {
        if (this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
        this.close();
    };
    NbWindowComponent.prototype.minimize = function () {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.windowRef.toPreviousState();
        }
        else {
            this.windowRef.minimize();
        }
    };
    NbWindowComponent.prototype.maximize = function () {
        this.windowRef.maximize();
    };
    NbWindowComponent.prototype.fullScreen = function () {
        this.windowRef.fullScreen();
    };
    NbWindowComponent.prototype.maximizeOrFullScreen = function () {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.maximize();
        }
        else {
            this.fullScreen();
        }
    };
    NbWindowComponent.prototype.close = function () {
        this.windowRef.close();
    };
    NbWindowComponent.prototype.attachTemplate = function () {
        this.overlayContainer
            .attachTemplatePortal(new NbTemplatePortal(this.content, null, this.context));
    };
    NbWindowComponent.prototype.attachComponent = function () {
        var portal = new NbComponentPortal(this.content, null, null, this.cfr);
        var ref = this.overlayContainer.attachComponentPortal(portal, this.context);
        ref.changeDetectorRef.detectChanges();
    };
    __decorate([
        Input(),
        __metadata("design:type", ComponentFactoryResolver)
    ], NbWindowComponent.prototype, "cfr", void 0);
    __decorate([
        HostBinding('class.full-screen'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbWindowComponent.prototype, "isFullScreen", null);
    __decorate([
        HostBinding('class.maximized'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbWindowComponent.prototype, "maximized", null);
    __decorate([
        HostBinding('class.minimized'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbWindowComponent.prototype, "minimized", null);
    __decorate([
        ViewChild(NbOverlayContainerComponent, { static: false }),
        __metadata("design:type", NbOverlayContainerComponent)
    ], NbWindowComponent.prototype, "overlayContainer", void 0);
    NbWindowComponent = __decorate([
        Component({
            selector: 'nb-window',
            template: "\n    <nb-card>\n      <nb-card-header>\n        <div cdkFocusInitial class=\"title\" tabindex=\"-1\">{{ config.title }}</div>\n\n        <div class=\"buttons\">\n          <button nbButton ghost (click)=\"minimize()\">\n            <nb-icon icon=\"minus-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost *ngIf=\"isFullScreen\" (click)=\"maximize()\">\n            <nb-icon icon=\"collapse-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost *ngIf=\"minimized || maximized\" (click)=\"maximizeOrFullScreen()\">\n            <nb-icon icon=\"expand-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost (click)=\"close()\">\n            <nb-icon icon=\"close-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n        </div>\n      </nb-card-header>\n      <nb-card-body *ngIf=\"maximized || isFullScreen\">\n        <nb-overlay-container></nb-overlay-container>\n      </nb-card-body>\n    </nb-card>\n  ",
            styles: [":host{flex:1 0 auto;min-width:20rem}:host nb-card{margin:0}:host nb-card-header{display:flex;justify-content:space-between;align-items:center;overflow:hidden}:host .title{flex:1 0 auto;margin-right:3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .buttons{width:9.5rem;display:flex;justify-content:space-evenly}:host .buttons [nbButton]{flex:0 0 3rem}:host(.full-screen){position:fixed;top:50%;left:50%;transform:translate(-50%, -50%)}:host(.maximized) nb-card{border-bottom-left-radius:0;border-bottom-right-radius:0}:host(.minimized) nb-card{border-bottom-left-radius:0;border-bottom-right-radius:0;height:auto}:host(.minimized) nb-card nb-card-header{border-bottom:none}\n"]
        }),
        __param(0, Inject(NB_WINDOW_CONTENT)),
        __param(1, Inject(NB_WINDOW_CONTEXT)),
        __metadata("design:paramtypes", [Object, Object,
            NbWindowRef,
            NbWindowConfig,
            NbFocusTrapFactoryService,
            ElementRef,
            Renderer2])
    ], NbWindowComponent);
    return NbWindowComponent;
}());
export { NbWindowComponent };
//# sourceMappingURL=window.component.js.map