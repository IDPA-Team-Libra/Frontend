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
import { Injectable } from '@angular/core';
import { NbSortDirection } from '../tree-grid-sort.component';
/**
 * Service used to sort tree grid data. Uses Array.prototype.sort method.
 * If you need custom sorting, you can extend this service and override comparator or whole sort method.
 */
let NbTreeGridSortService = class NbTreeGridSortService {
    sort(request, data) {
        if (!request) {
            return data;
        }
        const sorted = data.sort((na, nb) => this.comparator(request, na, nb));
        for (const node of data) {
            if (node.children) {
                node.children = this.sort(request, node.children);
            }
        }
        return sorted;
    }
    comparator(request, na, nb) {
        const key = request.column;
        const dir = request.direction;
        const a = na.data[key];
        const b = nb.data[key];
        let res = 0;
        if (a > b) {
            res = 1;
        }
        if (a < b) {
            res = -1;
        }
        return dir === NbSortDirection.ASCENDING ? res : res * -1;
    }
};
NbTreeGridSortService = __decorate([
    Injectable()
], NbTreeGridSortService);
export { NbTreeGridSortService };
//# sourceMappingURL=tree-grid-sort.service.js.map