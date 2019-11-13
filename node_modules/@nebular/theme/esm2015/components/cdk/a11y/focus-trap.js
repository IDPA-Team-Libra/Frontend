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
import { FocusTrap, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { NB_DOCUMENT } from '../../../theme.options';
/**
 * Overrides angular cdk focus trap to keep restore functionality inside trap.
 * */
export class NbFocusTrap extends FocusTrap {
    constructor(element, checker, ngZone, document, deferAnchors) {
        super(element, checker, ngZone, document, deferAnchors);
        this.element = element;
        this.checker = checker;
        this.ngZone = ngZone;
        this.document = document;
        this.savePreviouslyFocusedElement();
    }
    restoreFocus() {
        this.previouslyFocusedElement.focus();
        this.destroy();
    }
    blurPreviouslyFocusedElement() {
        this.previouslyFocusedElement.blur();
    }
    savePreviouslyFocusedElement() {
        this.previouslyFocusedElement = this.document.activeElement;
    }
}
let NbFocusTrapFactoryService = class NbFocusTrapFactoryService extends FocusTrapFactory {
    constructor(checker, ngZone, document) {
        super(checker, ngZone, document);
        this.checker = checker;
        this.ngZone = ngZone;
        this.document = document;
    }
    create(element, deferCaptureElements) {
        return new NbFocusTrap(element, this.checker, this.ngZone, this.document, deferCaptureElements);
    }
};
NbFocusTrapFactoryService = __decorate([
    Injectable(),
    __param(2, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [InteractivityChecker,
        NgZone, Object])
], NbFocusTrapFactoryService);
export { NbFocusTrapFactoryService };
//# sourceMappingURL=focus-trap.js.map