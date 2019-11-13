import { NgModule } from '@angular/core';
import { NbIconLibraries, NbSvgIcon } from '@nebular/theme';
import { icons } from 'eva-icons';

/*
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
class NbEvaSvgIcon extends NbSvgIcon {
    constructor(name, content) {
        super(name, '');
        this.name = name;
        this.content = content;
    }
    getContent(options) {
        return this.content.toSvg(Object.assign({ width: '100%', height: '100%', fill: 'currentColor' }, options));
    }
}
let NbEvaIconsModule = class NbEvaIconsModule {
    constructor(iconLibrary) {
        this.NAME = 'eva';
        iconLibrary.registerSvgPack(this.NAME, this.createIcons());
        iconLibrary.setDefaultPack(this.NAME);
    }
    createIcons() {
        return Object
            .entries(icons)
            .map(([name, icon]) => {
            return [name, new NbEvaSvgIcon(name, icon)];
        })
            .reduce((newIcons, [name, icon]) => {
            newIcons[name] = icon;
            return newIcons;
        }, {});
    }
};
NbEvaIconsModule = __decorate([
    NgModule({}),
    __metadata("design:paramtypes", [NbIconLibraries])
], NbEvaIconsModule);

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NbEvaSvgIcon, NbEvaIconsModule };
