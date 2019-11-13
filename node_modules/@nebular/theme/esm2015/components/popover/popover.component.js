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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ComponentFactoryResolver, Input, TemplateRef, Type, ViewChild, } from '@angular/core';
import { NbComponentPortal, NbTemplatePortal } from '../cdk/overlay/mapping';
import { NbOverlayContainerComponent, NbPositionedContainer, } from '../cdk/overlay/overlay-container';
/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-text-color:
 * popover-text-font-family:
 * popover-text-font-size:
 * popover-text-font-weight:
 * popover-text-line-height:
 * popover-background-color:
 * popover-border-width:
 * popover-border-color:
 * popover-border-radius:
 * popover-shadow:
 * popover-arrow-size:
 * popover-padding:
 * */
let NbPopoverComponent = class NbPopoverComponent extends NbPositionedContainer {
    renderContent() {
        this.detachContent();
        this.attachContent();
    }
    detachContent() {
        this.overlayContainer.detach();
    }
    attachContent() {
        if (this.content instanceof TemplateRef) {
            this.attachTemplate();
        }
        else if (this.content instanceof Type) {
            this.attachComponent();
        }
        else {
            this.attachString();
        }
    }
    attachTemplate() {
        this.overlayContainer
            .attachTemplatePortal(new NbTemplatePortal(this.content, null, { $implicit: this.context }));
    }
    attachComponent() {
        const portal = new NbComponentPortal(this.content, null, null, this.cfr);
        const ref = this.overlayContainer.attachComponentPortal(portal, this.context);
        ref.changeDetectorRef.detectChanges();
    }
    attachString() {
        this.overlayContainer.attachStringContent(this.content);
    }
};
__decorate([
    ViewChild(NbOverlayContainerComponent, { static: false }),
    __metadata("design:type", NbOverlayContainerComponent)
], NbPopoverComponent.prototype, "overlayContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbPopoverComponent.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbPopoverComponent.prototype, "context", void 0);
__decorate([
    Input(),
    __metadata("design:type", ComponentFactoryResolver)
], NbPopoverComponent.prototype, "cfr", void 0);
NbPopoverComponent = __decorate([
    Component({
        selector: 'nb-popover',
        template: `
    <span class="arrow"></span>
    <nb-overlay-container></nb-overlay-container>
  `,
        styles: [":host .arrow{position:absolute;width:0;height:0}\n"]
    })
], NbPopoverComponent);
export { NbPopoverComponent };
//# sourceMappingURL=popover.component.js.map