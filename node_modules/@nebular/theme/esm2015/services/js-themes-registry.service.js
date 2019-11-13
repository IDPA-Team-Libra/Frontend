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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_THEME } from './js-themes/default.theme';
import { COSMIC_THEME } from './js-themes/cosmic.theme';
import { CORPORATE_THEME } from './js-themes/corporate.theme';
import { DARK_THEME } from './js-themes/dark.theme';
import { NB_BUILT_IN_JS_THEMES, NB_JS_THEMES } from '../theme.options';
export const BUILT_IN_THEMES = [
    DEFAULT_THEME,
    COSMIC_THEME,
    CORPORATE_THEME,
    DARK_THEME,
];
/**
 * Js Themes registry - provides access to the JS themes' variables.
 * Usually shouldn't be used directly, but through the NbThemeService class methods (getJsTheme).
 */
let NbJSThemesRegistry = class NbJSThemesRegistry {
    constructor(builtInThemes, newThemes = []) {
        this.themes = {};
        const themes = this.combineByNames(newThemes, builtInThemes);
        themes.forEach((theme) => {
            this.register(theme, theme.name, theme.base);
        });
    }
    /**
     * Registers a new JS theme
     * @param config any
     * @param themeName string
     * @param baseTheme string
     */
    register(config, themeName, baseTheme) {
        const base = this.has(baseTheme) ? this.get(baseTheme) : {};
        this.themes[themeName] = this.mergeDeep({}, base, config);
    }
    /**
     * Checks whether the theme is registered
     * @param themeName
     * @returns boolean
     */
    has(themeName) {
        return !!this.themes[themeName];
    }
    /**
     * Return a theme
     * @param themeName
     * @returns NbJSThemeOptions
     */
    get(themeName) {
        if (!this.themes[themeName]) {
            throw Error(`NbThemeConfig: no theme '${themeName}' found registered.`);
        }
        return JSON.parse(JSON.stringify(this.themes[themeName]));
    }
    combineByNames(newThemes, oldThemes) {
        if (newThemes) {
            const mergedThemes = [];
            newThemes.forEach((theme) => {
                const sameOld = oldThemes.find((tm) => tm.name === theme.name)
                    || {};
                const mergedTheme = this.mergeDeep({}, sameOld, theme);
                mergedThemes.push(mergedTheme);
            });
            oldThemes.forEach((theme) => {
                if (!mergedThemes.find((tm) => tm.name === theme.name)) {
                    mergedThemes.push(theme);
                }
            });
            return mergedThemes;
        }
        return oldThemes;
    }
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
    // TODO: move to helpers
    mergeDeep(target, ...sources) {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();
        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, { [key]: {} });
                    }
                    this.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return this.mergeDeep(target, ...sources);
    }
};
NbJSThemesRegistry = __decorate([
    Injectable(),
    __param(0, Inject(NB_BUILT_IN_JS_THEMES)),
    __param(1, Inject(NB_JS_THEMES)),
    __metadata("design:paramtypes", [Array, Array])
], NbJSThemesRegistry);
export { NbJSThemesRegistry };
//# sourceMappingURL=js-themes-registry.service.js.map