import { ComponentRef } from '@angular/core';
import { NbComponentPortal } from '../cdk/overlay/mapping';
import { NbOverlayContainerComponent, NbPositionedContainer } from '../cdk/overlay/overlay-container';
export declare class NbDatepickerContainerComponent extends NbPositionedContainer {
    overlayContainer: NbOverlayContainerComponent;
    attach<T>(portal: NbComponentPortal<T>): ComponentRef<T>;
}
