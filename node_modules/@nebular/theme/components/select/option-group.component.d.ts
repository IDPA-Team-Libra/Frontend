import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { NbOptionComponent } from './option.component';
export declare class NbOptionGroupComponent implements AfterContentInit, OnDestroy {
    protected alive: boolean;
    title: string;
    disabled: boolean;
    protected _disabled: boolean;
    readonly disabledAttribute: '' | null;
    options: QueryList<NbOptionComponent<any>>;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Sets disabled state for each option to current group disabled state.
     */
    protected updateOptionsDisabledState(): void;
    /**
     * Updates options disabled state after promise resolution.
     * This way change detection will be triggered after options state updated.
     * Use this method when updating options during change detection run (e.g. QueryList.changes, lifecycle hooks).
     */
    protected asyncUpdateOptionsDisabledState(): void;
}
