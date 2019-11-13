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
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NB_STEPPER } from './stepper-tokens';
import { convertToBoolProperty } from '../helpers';
/**
 * Component intended to be used within  the `<nb-stepper>` component.
 * Container for a step
 */
let NbStepComponent = class NbStepComponent {
    constructor(stepper) {
        this._completed = false;
        this.interacted = false;
        this.stepper = stepper;
    }
    /**
     * Check that label is a TemplateRef.
     *
     * @return boolean
     * */
    get isLabelTemplate() {
        return this.label instanceof TemplateRef;
    }
    /**
     * Whether step is marked as completed.
     *
     * @type {boolean}
     */
    get completed() {
        return this._completed || this.isCompleted;
    }
    set completed(value) {
        this._completed = convertToBoolProperty(value);
    }
    get isCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
    /**
     * Mark step as selected
     * */
    select() {
        this.stepper.selected = this;
    }
    /**
     * Reset step and stepControl state
     * */
    reset() {
        this.interacted = false;
        if (this.stepControl) {
            this.stepControl.reset();
        }
    }
};
__decorate([
    ViewChild(TemplateRef, { static: true }),
    __metadata("design:type", TemplateRef)
], NbStepComponent.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", AbstractControl)
], NbStepComponent.prototype, "stepControl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbStepComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbStepComponent.prototype, "hidden", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbStepComponent.prototype, "completed", null);
NbStepComponent = __decorate([
    Component({
        selector: 'nb-step',
        template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
    }),
    __param(0, Inject(NB_STEPPER)),
    __metadata("design:paramtypes", [Object])
], NbStepComponent);
export { NbStepComponent };
//# sourceMappingURL=step.component.js.map