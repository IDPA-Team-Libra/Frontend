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
import { Component, ContentChildren, HostBinding, Input, QueryList, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NB_STEPPER } from './stepper-tokens';
import { NbStepComponent } from './step.component';
/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * ### Installation
 *
 * Import `NbStepperModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbStepperModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If step label is string you can pass it as `label` attribute. Otherwise ng-template should be used:
 * ```html
 * // ...
 * <nb-stepper orientation="horizontal">
 *   <nb-step label="step number one">
 *       // ... step content here
 *   </nb-step>
 *   <nb-step label="stepLabel">
 *       <ng-template #stepLabel>
 *           <div>
 *               step number two
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   </nb-step>
 * </nb-stepper>
 * ```
 *
 * When linear mode enabled user can't move forward unless current step is complete.
 * @stacked-example(Linear, stepper/stepper-linear.component)
 *
 * Specify `[stepControl]="form"` and stepper allow go to the next step only if form is valid.
 * You can disable it via `linear` mode setting.
 * ```html
 * // ...
 * <nb-stepper  orientation="horizontal">
 *   <nb-step label="step number one" [stepControl]="form">
 *     <form [formGroup]="form">
 *       // ...
 *     </form>
 *   </nb-step>
 *    // ...
 * </nb-stepper>
 * ```
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * Stepper component has two layout options - `vertical` & `horizontal`
 * @stacked-example(Vertical, stepper/stepper-vertical.component)
 *
 * `disableStepNavigation` disables navigation by clicking on steps, so user can navigate only using
 * 'nbStepperPrevious' and 'nbStepperNext' buttons.
 * @stacked-example(Disabled steps navigation, stepper/stepper-disabled-step-nav.component)
 *
 * @styles
 *
 * stepper-step-text-color:
 * stepper-step-text-font-family:
 * stepper-step-text-font-size:
 * stepper-step-text-font-weight:
 * stepper-step-text-line-height:
 * stepper-step-active-text-color:
 * stepper-step-completed-text-color:
 * stepper-step-index-border-color:
 * stepper-step-index-border-style:
 * stepper-step-index-border-width:
 * stepper-step-index-border-radius:
 * stepper-step-index-width:
 * stepper-step-index-active-border-color:
 * stepper-step-index-completed-background-color:
 * stepper-step-index-completed-border-color:
 * stepper-step-index-completed-text-color:
 * stepper-connector-background-color:
 * stepper-connector-completed-background-color:
 * stepper-horizontal-connector-margin:
 * stepper-vertical-connector-margin:
 * stepper-step-content-padding:
 */
var NbStepperComponent = /** @class */ (function () {
    function NbStepperComponent() {
        this._selectedIndex = 0;
        this._disableStepNavigation = false;
        /**
         * Stepper orientation - `horizontal`|`vertical`
         */
        this.orientation = 'horizontal';
        this._linear = true;
    }
    NbStepperComponent_1 = NbStepperComponent;
    Object.defineProperty(NbStepperComponent.prototype, "selectedIndex", {
        /**
         * Selected step index
         */
        get: function () {
            return this._selectedIndex;
        },
        set: function (index) {
            if (!this.steps) {
                this._selectedIndex = index;
                return;
            }
            this.markCurrentStepInteracted();
            if (this.canBeSelected(index)) {
                this._selectedIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "disableStepNavigation", {
        get: function () {
            return this._disableStepNavigation;
        },
        /**
         * Disables navigation by clicking on steps. False by default
         * @param {boolean} value
         */
        set: function (value) {
            this._disableStepNavigation = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "selected", {
        /**
         * Selected step component
         */
        get: function () {
            return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
        },
        set: function (step) {
            if (!this.steps) {
                return;
            }
            this.selectedIndex = this.steps.toArray().indexOf(step);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "linear", {
        get: function () {
            return this._linear;
        },
        /**
         * Allow moving forward only if the current step is complete
         * @default true
         */
        set: function (value) {
            this._linear = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "vertical", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "horizontal", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Navigate to next step
     * */
    NbStepperComponent.prototype.next = function () {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.steps.length - 1);
    };
    /**
     * Navigate to previous step
     * */
    NbStepperComponent.prototype.previous = function () {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    };
    /**
     * Reset stepper and stepControls to initial state
     * */
    NbStepperComponent.prototype.reset = function () {
        this._selectedIndex = 0;
        this.steps.forEach(function (step) { return step.reset(); });
    };
    NbStepperComponent.prototype.isStepSelected = function (step) {
        return this.selected === step;
    };
    NbStepperComponent.prototype.isStepValid = function (index) {
        return this.steps.toArray()[index].completed;
    };
    NbStepperComponent.prototype.canBeSelected = function (indexToCheck) {
        var noSteps = !this.steps || this.steps.length === 0;
        if (noSteps || indexToCheck < 0 || indexToCheck >= this.steps.length) {
            return false;
        }
        if (indexToCheck <= this.selectedIndex || !this.linear) {
            return true;
        }
        var isAllStepsValid = true;
        for (var i = this.selectedIndex; i < indexToCheck; i++) {
            if (!this.isStepValid(i)) {
                isAllStepsValid = false;
                break;
            }
        }
        return isAllStepsValid;
    };
    NbStepperComponent.prototype.markCurrentStepInteracted = function () {
        if (this.selected) {
            this.selected.interacted = true;
        }
    };
    var NbStepperComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NbStepperComponent.prototype, "selectedIndex", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbStepperComponent.prototype, "disableStepNavigation", null);
    __decorate([
        Input(),
        __metadata("design:type", NbStepComponent),
        __metadata("design:paramtypes", [NbStepComponent])
    ], NbStepperComponent.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbStepperComponent.prototype, "orientation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbStepperComponent.prototype, "linear", null);
    __decorate([
        HostBinding('class.vertical'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbStepperComponent.prototype, "vertical", null);
    __decorate([
        HostBinding('class.horizontal'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbStepperComponent.prototype, "horizontal", null);
    __decorate([
        ContentChildren(NbStepComponent),
        __metadata("design:type", QueryList)
    ], NbStepperComponent.prototype, "steps", void 0);
    NbStepperComponent = NbStepperComponent_1 = __decorate([
        Component({
            selector: 'nb-stepper',
            template: "<ng-template><ng-content select=\"nb-step\"></ng-content></ng-template>\n<div class=\"header\">\n  <ng-container *ngFor=\"let step of steps; let index = index; let first = first\">\n\n    <div *ngIf=\"!first && !step.hidden\"\n         [class.connector-past]=\"index <= selectedIndex\"\n         class=\"connector\"></div>\n\n    <div *ngIf=\"!step.hidden\" class=\"step\"\n         [class.selected]=\"isStepSelected(step)\"\n         [class.completed]=\"!isStepSelected(step) && step.completed\"\n         [class.noninteractive]=\"disableStepNavigation\"\n         (click)=\"!disableStepNavigation && step.select()\">\n      <div class=\"label-index\">\n        <span *ngIf=\"!step.completed || isStepSelected(step)\">{{ index + 1 }}</span>\n        <nb-icon *ngIf=\"!isStepSelected(step) && step.completed\" icon=\"checkmark-outline\" pack=\"nebular-essentials\">\n        </nb-icon>\n      </div>\n      <div class=\"label\">\n        <ng-container *ngIf=\"step.isLabelTemplate\">\n          <ng-container *ngTemplateOutlet=\"step.label\"></ng-container>\n        </ng-container>\n        <span *ngIf=\"!step.isLabelTemplate\">{{ step.label }}</span>\n      </div>\n    </div>\n  </ng-container>\n</div>\n<div class=\"step-content\">\n  <ng-container [ngTemplateOutlet]=\"selected?.content\"></ng-container>\n</div>\n",
            providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent_1 }],
            styles: [":host(.horizontal) .header .step{flex-direction:column}:host(.horizontal) .header .connector{height:2px}:host(.horizontal) .label-index{margin-bottom:10px}:host(.vertical){display:flex;height:100%}:host(.vertical) .header{flex-direction:column}:host(.vertical) .header .label{margin:0 10px}:host(.vertical) .header .connector{width:2px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}.header .connector{flex:auto}.header .step{display:flex;align-items:center;cursor:pointer}.header .step.noninteractive{cursor:default}.header .label-index{display:flex;justify-content:center;align-items:center}.header .label{width:max-content}\n"]
        })
    ], NbStepperComponent);
    return NbStepperComponent;
}());
export { NbStepperComponent };
//# sourceMappingURL=stepper.component.js.map