var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { NbPlatform } from '../overlay/mapping';
import { NbLayoutRulerService } from '../../../services/ruler.service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
let NbViewportRulerAdapter = class NbViewportRulerAdapter extends ViewportRuler {
    constructor(platform, ngZone, ruler, scroll) {
        super(platform, ngZone);
        this.ruler = ruler;
        this.scroll = scroll;
    }
    getViewportSize() {
        let res;
        /*
        * getDimensions call is really synchronous operation.
        * And we have to conform with the interface of the original service.
        * */
        this.ruler.getDimensions()
            .pipe(map(dimensions => ({ width: dimensions.clientWidth, height: dimensions.clientHeight })))
            .subscribe(rect => res = rect);
        return res;
    }
    getViewportScrollPosition() {
        let res;
        /*
        * getPosition call is really synchronous operation.
        * And we have to conform with the interface of the original service.
        * */
        this.scroll.getPosition()
            .pipe(map((position) => ({ top: position.y, left: position.x })))
            .subscribe(position => res = position);
        return res;
    }
};
NbViewportRulerAdapter = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NbPlatform, NgZone,
        NbLayoutRulerService,
        NbLayoutScrollService])
], NbViewportRulerAdapter);
export { NbViewportRulerAdapter };
//# sourceMappingURL=viewport-ruler-adapter.js.map