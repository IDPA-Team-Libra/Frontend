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
import { Attribute, ChangeDetectorRef, ElementRef, Inject, IterableDiffers, NgModule } from '@angular/core';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { NbBidiModule } from '../bidi/bidi.module';
import { NbDirectionality } from '../bidi/bidi-service';
import { NbPlatformModule } from '../platform/platform.module';
import { NbPlatform } from '../platform/platform-service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbCellDefDirective, NbCellDirective, NbColumnDefDirective, NbFooterCellDefDirective, NbFooterCellDirective, NbHeaderCellDefDirective, NbHeaderCellDirective, } from './cell';
import { NbCellOutletDirective, NbDataRowOutletDirective, NbFooterRowOutletDirective, NbHeaderRowOutletDirective, NbFooterRowComponent, NbFooterRowDefDirective, NbHeaderRowComponent, NbHeaderRowDefDirective, NbRowComponent, NbRowDefDirective, } from './row';
export const NB_TABLE_TEMPLATE = `
  <ng-container nbHeaderRowOutlet></ng-container>
  <ng-container nbRowOutlet></ng-container>
  <ng-container nbFooterRowOutlet></ng-container>`;
let NbTable = class NbTable extends CdkTable {
    constructor(differs, changeDetectorRef, elementRef, role, dir, document, platform) {
        super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
    }
};
NbTable = __decorate([
    __param(3, Attribute('role')),
    __param(5, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [IterableDiffers,
        ChangeDetectorRef,
        ElementRef, String, NbDirectionality, Object, NbPlatform])
], NbTable);
export { NbTable };
const COMPONENTS = [
    NbTable,
    // Template defs
    NbHeaderCellDefDirective,
    NbHeaderRowDefDirective,
    NbColumnDefDirective,
    NbCellDefDirective,
    NbRowDefDirective,
    NbFooterCellDefDirective,
    NbFooterRowDefDirective,
    // Outlets
    NbDataRowOutletDirective,
    NbHeaderRowOutletDirective,
    NbFooterRowOutletDirective,
    NbCellOutletDirective,
    // Cell directives
    NbHeaderCellDirective,
    NbCellDirective,
    NbFooterCellDirective,
    // Row directives
    NbHeaderRowComponent,
    NbRowComponent,
    NbFooterRowComponent,
];
let NbTableModule = class NbTableModule extends CdkTableModule {
};
NbTableModule = __decorate([
    NgModule({
        imports: [NbBidiModule, NbPlatformModule],
        declarations: [...COMPONENTS],
        exports: [...COMPONENTS],
    })
], NbTableModule);
export { NbTableModule };
//# sourceMappingURL=table.module.js.map