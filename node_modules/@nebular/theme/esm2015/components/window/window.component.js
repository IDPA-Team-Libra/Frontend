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
let NbWindowComponent = class NbWindowComponent {
    constructor(content, context, windowRef, config, focusTrapFactory, elementRef, renderer) {
        this.content = content;
        this.context = context;
        this.windowRef = windowRef;
        this.config = config;
        this.focusTrapFactory = focusTrapFactory;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    get isFullScreen() {
        return this.windowRef.state === NbWindowState.FULL_SCREEN;
    }
    get maximized() {
        return this.windowRef.state === NbWindowState.MAXIMIZED;
    }
    get minimized() {
        return this.windowRef.state === NbWindowState.MINIMIZED;
    }
    ngOnInit() {
        this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        this.focusTrap.blurPreviouslyFocusedElement();
        this.focusTrap.focusInitialElement();
        if (this.config.windowClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.config.windowClass);
        }
    }
    ngAfterViewChecked() {
        if (!this.overlayContainer || this.overlayContainer.isAttached) {
            return;
        }
        if (this.content instanceof TemplateRef) {
            this.attachTemplate();
        }
        else {
            this.attachComponent();
        }
    }
    ngOnDestroy() {
        if (this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
        this.close();
    }
    minimize() {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.windowRef.toPreviousState();
        }
        else {
            this.windowRef.minimize();
        }
    }
    maximize() {
        this.windowRef.maximize();
    }
    fullScreen() {
        this.windowRef.fullScreen();
    }
    maximizeOrFullScreen() {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.maximize();
        }
        else {
            this.fullScreen();
        }
    }
    close() {
        this.windowRef.close();
    }
    attachTemplate() {
        this.overlayContainer
            .attachTemplatePortal(new NbTemplatePortal(this.content, null, this.context));
    }
    attachComponent() {
        const portal = new NbComponentPortal(this.content, null, null, this.cfr);
        const ref = this.overlayContainer.attachComponentPortal(portal, this.context);
        ref.changeDetectorRef.detectChanges();
    }
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
        template: `
    <nb-card>
      <nb-card-header>
        <div cdkFocusInitial class="title" tabindex="-1">{{ config.title }}</div>

        <div class="buttons">
          <button nbButton ghost (click)="minimize()">
            <nb-icon icon="minus-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost *ngIf="isFullScreen" (click)="maximize()">
            <nb-icon icon="collapse-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost *ngIf="minimized || maximized" (click)="maximizeOrFullScreen()">
            <nb-icon icon="expand-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost (click)="close()">
            <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
          </button>
        </div>
      </nb-card-header>
      <nb-card-body *ngIf="maximized || isFullScreen">
        <nb-overlay-container></nb-overlay-container>
      </nb-card-body>
    </nb-card>
  `,
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
export { NbWindowComponent };
//# sourceMappingURL=window.component.js.map