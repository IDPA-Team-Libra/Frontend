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
import { NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './tree-grid.model';
let NbTreeGridDataService = class NbTreeGridDataService {
    constructor() {
        this.defaultGetters = {
            dataGetter: node => node.data,
            childrenGetter: d => d.children || undefined,
            expandedGetter: d => !!d.expanded,
        };
    }
    toPresentationNodes(nodes, customGetters, level = NB_DEFAULT_ROW_LEVEL) {
        const getters = Object.assign({}, this.defaultGetters, customGetters);
        return this.mapNodes(nodes, getters, level);
    }
    mapNodes(nodes, getters, level) {
        const { dataGetter, childrenGetter, expandedGetter } = getters;
        return nodes.map(node => {
            const childrenNodes = childrenGetter(node);
            let children;
            if (childrenNodes) {
                children = this.toPresentationNodes(childrenNodes, getters, level + 1);
            }
            return new NbTreeGridPresentationNode(dataGetter(node), children, expandedGetter(node), level);
        });
    }
    flattenExpanded(nodes) {
        return nodes.reduce((res, node) => {
            res.push(node);
            if (node.expanded && node.hasChildren()) {
                res.push(...this.flattenExpanded(node.children));
            }
            return res;
        }, []);
    }
    copy(nodes) {
        return nodes.map((node) => {
            let children;
            if (node.hasChildren()) {
                children = this.copy(node.children);
            }
            return new NbTreeGridPresentationNode(node.data, children, node.expanded, node.level);
        });
    }
};
NbTreeGridDataService = __decorate([
    Injectable()
], NbTreeGridDataService);
export { NbTreeGridDataService };
//# sourceMappingURL=tree-grid-data.service.js.map