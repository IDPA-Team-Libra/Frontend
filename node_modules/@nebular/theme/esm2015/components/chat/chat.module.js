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
var NbChatModule_1;
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbInputModule } from '../input/input.module';
import { NbIconModule } from '../icon/icon.module';
import { NbChatComponent } from './chat.component';
import { NbChatMessageComponent } from './chat-message.component';
import { NbChatFormComponent } from './chat-form.component';
import { NbChatMessageTextComponent } from './chat-message-text.component';
import { NbChatMessageFileComponent } from './chat-message-file.component';
import { NbChatMessageQuoteComponent } from './chat-message-quote.component';
import { NbChatMessageMapComponent } from './chat-message-map.component';
import { NbChatOptions } from './chat.options';
const NB_CHAT_COMPONENTS = [
    NbChatComponent,
    NbChatMessageComponent,
    NbChatFormComponent,
    NbChatMessageTextComponent,
    NbChatMessageFileComponent,
    NbChatMessageQuoteComponent,
    NbChatMessageMapComponent,
];
let NbChatModule = NbChatModule_1 = class NbChatModule {
    static forRoot(options) {
        return {
            ngModule: NbChatModule_1,
            providers: [
                { provide: NbChatOptions, useValue: options || {} },
            ],
        };
    }
    static forChild(options) {
        return {
            ngModule: NbChatModule_1,
            providers: [
                { provide: NbChatOptions, useValue: options || {} },
            ],
        };
    }
};
NbChatModule = NbChatModule_1 = __decorate([
    NgModule({
        imports: [
            NbSharedModule,
            NbIconModule,
            NbInputModule,
            NbButtonModule,
        ],
        declarations: [
            ...NB_CHAT_COMPONENTS,
        ],
        exports: [
            ...NB_CHAT_COMPONENTS,
        ],
    })
], NbChatModule);
export { NbChatModule };
//# sourceMappingURL=chat.module.js.map