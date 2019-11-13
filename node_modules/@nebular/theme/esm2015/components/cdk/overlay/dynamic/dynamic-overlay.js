var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ComponentFactoryResolver, Injectable, NgZone } from '@angular/core';
import { filter, takeUntil, takeWhile, distinctUntilChanged } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { createContainer, NbOverlayService, patch } from '../overlay-service';
import { NbOverlayContainer } from '../mapping';
let NbDynamicOverlay = class NbDynamicOverlay {
    constructor(overlay, componentFactoryResolver, zone, overlayContainer) {
        this.overlay = overlay;
        this.componentFactoryResolver = componentFactoryResolver;
        this.zone = zone;
        this.overlayContainer = overlayContainer;
        this.context = {};
        this.overlayConfig = {};
        this.positionStrategyChange$ = new Subject();
        this.isShown$ = new BehaviorSubject(false);
        this.alive = true;
    }
    get isAttached() {
        return this.ref && this.ref.hasAttached();
    }
    get isShown() {
        return this.isShown$.pipe(distinctUntilChanged());
    }
    create(componentType, content, context, positionStrategy, overlayConfig = {}) {
        this.setContentAndContext(content, context);
        this.setComponent(componentType);
        this.setPositionStrategy(positionStrategy);
        this.setOverlayConfig(overlayConfig);
        return this;
    }
    setContent(content) {
        this.content = content;
        if (this.container) {
            this.updateContext();
        }
    }
    setContext(context) {
        this.context = context;
        if (this.container) {
            this.updateContext();
        }
    }
    setContentAndContext(content, context) {
        this.content = content;
        this.context = context;
        if (this.container) {
            this.updateContext();
        }
    }
    setComponent(componentType) {
        this.componentType = componentType;
        // in case the component is shown we recreate it and show it back
        const wasAttached = this.isAttached;
        this.disposeOverlayRef();
        if (wasAttached) {
            this.show();
        }
    }
    setPositionStrategy(positionStrategy) {
        this.positionStrategyChange$.next();
        this.positionStrategy = positionStrategy;
        this.positionStrategy.positionChange
            .pipe(takeWhile(() => this.alive), takeUntil(this.positionStrategyChange$), filter(() => !!this.container))
            .subscribe((position) => patch(this.container, { position }));
        if (this.ref) {
            this.ref.updatePositionStrategy(this.positionStrategy);
        }
    }
    setOverlayConfig(overlayConfig) {
        this.overlayConfig = overlayConfig;
        const wasAttached = this.isAttached;
        this.disposeOverlayRef();
        if (wasAttached) {
            this.show();
        }
    }
    show() {
        if (!this.ref) {
            this.createOverlay();
        }
        this.renderContainer();
        if (!this.hasOverlayInContainer()) {
            // Dispose overlay ref as it refers to the old overlay container and create new by calling `show`
            this.disposeOverlayRef();
            return this.show();
        }
        this.isShown$.next(true);
    }
    hide() {
        if (!this.ref) {
            return;
        }
        this.ref.detach();
        this.container = null;
        this.isShown$.next(false);
    }
    toggle() {
        if (this.isAttached) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    dispose() {
        this.alive = false;
        this.hide();
        this.disposeOverlayRef();
        this.isShown$.complete();
        this.positionStrategyChange$.complete();
    }
    getContainer() {
        return this.container;
    }
    createOverlay() {
        this.ref = this.overlay.create(Object.assign({ positionStrategy: this.positionStrategy, scrollStrategy: this.overlay.scrollStrategies.reposition() }, this.overlayConfig));
        this.updatePositionWhenStable();
    }
    renderContainer() {
        const containerContext = this.createContainerContext();
        if (!this.container) {
            this.container = createContainer(this.ref, this.componentType, containerContext, this.componentFactoryResolver);
        }
        this.container.instance.renderContent();
    }
    updateContext() {
        const containerContext = this.createContainerContext();
        Object.assign(this.container.instance, containerContext);
        this.container.instance.renderContent();
        this.container.changeDetectorRef.detectChanges();
    }
    createContainerContext() {
        return {
            content: this.content,
            context: this.context,
            cfr: this.componentFactoryResolver,
        };
    }
    /**
     * Dimensions of the container may change after content update. So we listen to zone.stable event to
     * reposition the container.
     */
    updatePositionWhenStable() {
        this.zone.onStable
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => {
            this.ref && this.ref.updatePosition();
        });
    }
    hasOverlayInContainer() {
        return this.overlayContainer.getContainerElement().contains(this.ref.hostElement);
    }
    disposeOverlayRef() {
        if (this.ref) {
            this.ref.dispose();
            this.ref = null;
            this.container = null;
        }
    }
};
NbDynamicOverlay = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NbOverlayService,
        ComponentFactoryResolver,
        NgZone,
        NbOverlayContainer])
], NbDynamicOverlay);
export { NbDynamicOverlay };
//# sourceMappingURL=dynamic-overlay.js.map