var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbIconPackType } from './icon-pack';
import { NbFontIcon, NbSvgIcon } from './icon';
import * as i0 from "@angular/core";
export class NbIconDefinition {
}
function throwPackNotFoundError(name) {
    throw Error(`Icon Pack '${name}' is not registered`);
}
function throwNoDefaultPackError() {
    throw Error('Default pack is not registered.');
}
function throwIconNotFoundError(name, pack) {
    throw Error(`Icon '${name}' is not registered in pack '${pack}'. Check icon name or consider switching icon pack.`);
}
function throwWrongPackTypeError(name, type, desiredType) {
    throw Error(`Pack '${name}' is not an '${desiredType}' Pack and its type is '${type}'`);
}
/**
 * This service allows to register multiple icon packs to use them later within `<nb-icon></nb-icon>` component.
 */
let NbIconLibraries = class NbIconLibraries {
    /**
     * This service allows to register multiple icon packs to use them later within `<nb-icon></nb-icon>` component.
     */
    constructor() {
        this.packs = new Map();
    }
    /**
     * Registers new Svg icon pack
     * @param {string} name
     * @param {NbIcon} icons
     * @param {NbIconPackParams} params
     */
    registerSvgPack(name, icons, params = {}) {
        this.packs.set(name, {
            name,
            icons: new Map(Object.entries(icons)),
            params,
            type: NbIconPackType.SVG,
        });
    }
    /**
     * Registers new font pack
     * @param {string} name
     * @param {NbIconPackParams} params
     */
    registerFontPack(name, params = {}) {
        this.packs.set(name, {
            name,
            params,
            icons: new Map(),
            type: NbIconPackType.FONT,
        });
    }
    /**
     * Returns pack by name
     * @param {string} name
     */
    getPack(name) {
        return this.packs.get(name);
    }
    /**
     * Sets pack as a default
     * @param {string} name
     */
    setDefaultPack(name) {
        if (!this.packs.has(name)) {
            throwPackNotFoundError(name);
        }
        this.defaultPack = this.packs.get(name);
    }
    /**
     * Returns Svg icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getSvgIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.SVG) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'SVG');
        }
        const icon = this.getIconFromPack(name, iconsPack);
        return {
            name,
            pack: iconsPack.name,
            type: NbIconPackType.SVG,
            icon: this.createSvgIcon(name, icon, iconsPack.params),
        };
    }
    /**
     * Returns Font icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getFontIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.FONT) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'Font');
        }
        const icon = this.getIconFromPack(name, iconsPack, false);
        return {
            name,
            pack: iconsPack.name,
            type: NbIconPackType.FONT,
            icon: this.createFontIcon(name, icon ? icon : '', iconsPack.params),
        };
    }
    /**
     * Returns an icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type === NbIconPackType.SVG) {
            return this.getSvgIcon(name, pack);
        }
        return this.getFontIcon(name, pack);
    }
    createSvgIcon(name, content, params) {
        return content instanceof NbSvgIcon ? content : new NbSvgIcon(name, content, params);
    }
    createFontIcon(name, content, params) {
        return content instanceof NbFontIcon ? content : new NbFontIcon(name, content, params);
    }
    getPackOrThrow(name) {
        const pack = this.packs.get(name);
        if (!pack) {
            throwPackNotFoundError(name);
        }
        return pack;
    }
    getDefaultPackOrThrow() {
        if (!this.defaultPack) {
            throwNoDefaultPackError();
        }
        return this.defaultPack;
    }
    getIconFromPack(name, pack, shouldThrow = true) {
        if (shouldThrow && !pack.icons.has(name)) {
            throwIconNotFoundError(name, pack.name);
        }
        return pack.icons.get(name);
    }
};
NbIconLibraries.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NbIconLibraries_Factory() { return new NbIconLibraries(); }, token: NbIconLibraries, providedIn: "root" });
NbIconLibraries = __decorate([
    Injectable({ providedIn: 'root' })
], NbIconLibraries);
export { NbIconLibraries };
//# sourceMappingURL=icon-libraries.js.map