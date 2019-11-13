/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { QueryList } from '@angular/core';
import { NbStepComponent } from './step.component';
export declare type NbStepperOrientation = 'vertical' | 'horizontal';
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
export declare class NbStepperComponent {
    /**
     * Selected step index
     */
    selectedIndex: number;
    protected _selectedIndex: number;
    /**
     * Disables navigation by clicking on steps. False by default
     * @param {boolean} value
     */
    disableStepNavigation: boolean;
    protected _disableStepNavigation: boolean;
    /**
     * Selected step component
     */
    selected: NbStepComponent | undefined;
    /**
     * Stepper orientation - `horizontal`|`vertical`
     */
    orientation: NbStepperOrientation;
    /**
     * Allow moving forward only if the current step is complete
     * @default true
     */
    linear: boolean;
    protected _linear: boolean;
    readonly vertical: boolean;
    readonly horizontal: boolean;
    steps: QueryList<NbStepComponent>;
    /**
     * Navigate to next step
     * */
    next(): void;
    /**
     * Navigate to previous step
     * */
    previous(): void;
    /**
     * Reset stepper and stepControls to initial state
     * */
    reset(): void;
    isStepSelected(step: NbStepComponent): boolean;
    protected isStepValid(index: number): boolean;
    protected canBeSelected(indexToCheck: number): boolean;
    protected markCurrentStepInteracted(): void;
}
