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
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList, } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbOptionComponent } from './option.component';
var NbOptionGroupComponent = /** @class */ (function () {
    function NbOptionGroupComponent() {
        this.alive = true;
        this._disabled = false;
    }
    Object.defineProperty(NbOptionGroupComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
            if (this.options) {
                this.updateOptionsDisabledState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionGroupComponent.prototype, "disabledAttribute", {
        get: function () {
            return this.disabled ? '' : null;
        },
        enumerable: true,
        configurable: true
    });
    NbOptionGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.options.length) {
            this.asyncUpdateOptionsDisabledState();
        }
        this.options.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.asyncUpdateOptionsDisabledState(); });
    };
    NbOptionGroupComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    /**
     * Sets disabled state for each option to current group disabled state.
     */
    NbOptionGroupComponent.prototype.updateOptionsDisabledState = function () {
        var _this = this;
        this.options.forEach(function (option) { return option.setDisabledByGroupState(_this.disabled); });
    };
    /**
     * Updates options disabled state after promise resolution.
     * This way change detection will be triggered after options state updated.
     * Use this method when updating options during change detection run (e.g. QueryList.changes, lifecycle hooks).
     */
    NbOptionGroupComponent.prototype.asyncUpdateOptionsDisabledState = function () {
        var _this = this;
        Promise.resolve().then(function () { return _this.updateOptionsDisabledState(); });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbOptionGroupComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbOptionGroupComponent.prototype, "disabled", null);
    __decorate([
        HostBinding('attr.disabled'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NbOptionGroupComponent.prototype, "disabledAttribute", null);
    __decorate([
        ContentChildren(NbOptionComponent, { descendants: true }),
        __metadata("design:type", QueryList)
    ], NbOptionGroupComponent.prototype, "options", void 0);
    NbOptionGroupComponent = __decorate([
        Component({
            selector: 'nb-option-group',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <span class=\"option-group-title\">{{ title }}</span>\n    <ng-content select=\"nb-option, ng-container\"></ng-content>\n  ",
            styles: [":host{display:block}.option-group-title{display:block}\n"]
        })
    ], NbOptionGroupComponent);
    return NbOptionGroupComponent;
}());
export { NbOptionGroupComponent };
//# sourceMappingURL=option-group.component.js.map