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
let NbTreeGridService = class NbTreeGridService {
    expand(data, row, options = {}) {
        const node = this.find(data, row);
        node.expanded = true;
        if (options.deep && node.hasChildren()) {
            node.children.forEach((n) => this.expand(data, n.data, options));
        }
    }
    collapse(data, row, options = {}) {
        const node = this.find(data, row);
        node.expanded = false;
        if (options.deep && node.hasChildren()) {
            node.children.forEach((n) => this.collapse(data, n.data, options));
        }
    }
    toggle(data, row, options = {}) {
        const node = this.find(data, row);
        if (node.expanded) {
            this.collapse(data, row, options);
        }
        else {
            this.expand(data, row, options);
        }
    }
    find(data, row) {
        const toCheck = [...data];
        for (const node of toCheck) {
            if (node.data === row) {
                return node;
            }
            if (node.hasChildren()) {
                toCheck.push(...node.children);
            }
        }
    }
};
NbTreeGridService = __decorate([
    Injectable()
], NbTreeGridService);
export { NbTreeGridService };
//# sourceMappingURL=tree-grid.service.js.map