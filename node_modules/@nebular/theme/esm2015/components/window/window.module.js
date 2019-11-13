var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbWindowModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCardModule } from '../card/card.module';
import { NbIconModule } from '../icon/icon.module';
import { NbButtonModule } from '../button/button.module';
import { NbWindowService } from './window.service';
import { NbWindowsContainerComponent } from './windows-container.component';
import { NbWindowComponent } from './window.component';
import { NB_WINDOW_CONFIG } from './window.options';
let NbWindowModule = NbWindowModule_1 = class NbWindowModule {
    static forRoot(defaultConfig) {
        return {
            ngModule: NbWindowModule_1,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
    static forChild(defaultConfig) {
        return {
            ngModule: NbWindowModule_1,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
};
NbWindowModule = NbWindowModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule],
        declarations: [
            NbWindowsContainerComponent,
            NbWindowComponent,
        ],
        entryComponents: [NbWindowsContainerComponent, NbWindowComponent],
    })
], NbWindowModule);
export { NbWindowModule };
//# sourceMappingURL=window.module.js.map