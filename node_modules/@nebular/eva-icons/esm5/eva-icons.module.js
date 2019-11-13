/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { NbIconLibraries, NbSvgIcon } from '@nebular/theme';
import { icons } from 'eva-icons';
var NbEvaSvgIcon = /** @class */ (function (_super) {
    __extends(NbEvaSvgIcon, _super);
    function NbEvaSvgIcon(name, content) {
        var _this = _super.call(this, name, '') || this;
        _this.name = name;
        _this.content = content;
        return _this;
    }
    NbEvaSvgIcon.prototype.getContent = function (options) {
        return this.content.toSvg(__assign({ width: '100%', height: '100%', fill: 'currentColor' }, options));
    };
    return NbEvaSvgIcon;
}(NbSvgIcon));
export { NbEvaSvgIcon };
var NbEvaIconsModule = /** @class */ (function () {
    function NbEvaIconsModule(iconLibrary) {
        this.NAME = 'eva';
        iconLibrary.registerSvgPack(this.NAME, this.createIcons());
        iconLibrary.setDefaultPack(this.NAME);
    }
    NbEvaIconsModule.prototype.createIcons = function () {
        return Object
            .entries(icons)
            .map(function (_a) {
            var name = _a[0], icon = _a[1];
            return [name, new NbEvaSvgIcon(name, icon)];
        })
            .reduce(function (newIcons, _a) {
            var name = _a[0], icon = _a[1];
            newIcons[name] = icon;
            return newIcons;
        }, {});
    };
    NbEvaIconsModule = __decorate([
        NgModule({}),
        __metadata("design:paramtypes", [NbIconLibraries])
    ], NbEvaIconsModule);
    return NbEvaIconsModule;
}());
export { NbEvaIconsModule };
//# sourceMappingURL=eva-icons.module.js.map