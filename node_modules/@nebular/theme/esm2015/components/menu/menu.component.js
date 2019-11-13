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
import { Component, Input, Output, EventEmitter, Inject, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeWhile, filter, map } from 'rxjs/operators';
import { NbMenuInternalService, NbMenuService } from './menu.service';
import { convertToBoolProperty } from '../helpers';
import { NB_WINDOW } from '../../theme.options';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NbLayoutDirectionService } from '../../services/direction.service';
export var NbToggleStates;
(function (NbToggleStates) {
    NbToggleStates["Expanded"] = "expanded";
    NbToggleStates["Collapsed"] = "collapsed";
})(NbToggleStates || (NbToggleStates = {}));
let NbMenuItemComponent = class NbMenuItemComponent {
    constructor(menuService, directionService) {
        this.menuService = menuService;
        this.directionService = directionService;
        this.menuItem = null;
        this.hoverItem = new EventEmitter();
        this.toggleSubMenu = new EventEmitter();
        this.selectItem = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.alive = true;
    }
    ngDoCheck() {
        this.toggleState = this.menuItem.expanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed;
    }
    ngAfterViewInit() {
        this.menuService.onSubmenuToggle()
            .pipe(takeWhile(() => this.alive), filter(({ item }) => item === this.menuItem), map(({ item }) => item.expanded))
            .subscribe(isExpanded => this.toggleState = isExpanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed);
    }
    ngOnDestroy() {
        this.alive = false;
    }
    onToggleSubMenu(item) {
        this.toggleSubMenu.emit(item);
    }
    onHoverItem(item) {
        this.hoverItem.emit(item);
    }
    onSelectItem(item) {
        this.selectItem.emit(item);
    }
    onItemClick(item) {
        this.itemClick.emit(item);
    }
    getExpandStateIcon() {
        if (this.menuItem.expanded) {
            return 'chevron-down-outline';
        }
        return this.directionService.isLtr()
            ? 'chevron-left-outline'
            : 'chevron-right-outline';
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbMenuItemComponent.prototype, "menuItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbMenuItemComponent.prototype, "hoverItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbMenuItemComponent.prototype, "toggleSubMenu", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbMenuItemComponent.prototype, "selectItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbMenuItemComponent.prototype, "itemClick", void 0);
NbMenuItemComponent = __decorate([
    Component({
        selector: '[nbMenuItem]',
        template: "<span *ngIf=\"menuItem.group\">\n  <nb-icon class=\"menu-icon\" [config]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  {{ menuItem.title }}\n</span>\n<a *ngIf=\"menuItem.link && !menuItem.url && !menuItem.children && !menuItem.group\"\n   [routerLink]=\"menuItem.link\"\n   [queryParams]=\"menuItem.queryParams\"\n   [fragment]=\"menuItem.fragment\"\n   [skipLocationChange]=\"menuItem.skipLocationChange\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"onItemClick(menuItem);\">\n  <nb-icon class=\"menu-icon\" [config]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.url && !menuItem.children && !menuItem.link && !menuItem.group\"\n   [attr.href]=\"menuItem.url\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"onSelectItem(menuItem)\">\n  <nb-icon class=\"menu-icon\" [config]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"!menuItem.children && !menuItem.link && !menuItem.url && !menuItem.group\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"$event.preventDefault(); onItemClick(menuItem);\">\n  <nb-icon class=\"menu-icon\" [config]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.children\"\n   (click)=\"$event.preventDefault(); onToggleSubMenu(menuItem);\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   href=\"#\">\n  <nb-icon class=\"menu-icon\" [config]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n  <nb-icon class=\"expand-state\" [icon]=\"getExpandStateIcon()\" pack=\"nebular-essentials\"></nb-icon>\n</a>\n<ul *ngIf=\"menuItem.children\"\n    [class.collapsed]=\"!(menuItem.children && menuItem.expanded)\"\n    [class.expanded]=\"menuItem.expanded\"\n    [@toggle]=\"toggleState\"\n    class=\"menu-items\">\n  <ng-container *ngFor=\"let item of menuItem.children\">\n    <li nbMenuItem *ngIf=\"!item.hidden\"\n        [menuItem]=\"item\"\n        [class.menu-group]=\"item.group\"\n        (hoverItem)=\"onHoverItem($event)\"\n        (toggleSubMenu)=\"onToggleSubMenu($event)\"\n        (selectItem)=\"onSelectItem($event)\"\n        (itemClick)=\"onItemClick($event)\"\n        class=\"menu-item\">\n    </li>\n  </ng-container>\n</ul>\n",
        animations: [
            trigger('toggle', [
                state(NbToggleStates.Collapsed, style({ height: '0', margin: '0' })),
                state(NbToggleStates.Expanded, style({ height: '*' })),
                transition(`${NbToggleStates.Collapsed} <=> ${NbToggleStates.Expanded}`, animate(300)),
            ]),
        ]
    }),
    __metadata("design:paramtypes", [NbMenuService,
        NbLayoutDirectionService])
], NbMenuItemComponent);
export { NbMenuItemComponent };
/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * Basic example
 * @stacked-example(Showcase, menu/menu-showcase.component)
 *
 * ```ts
 * // ...
 * items: NbMenuItem[] = [
 *  {
 *    title: home,
 *    link: '/'
 *  },
 *  {
 *    title: dashboard,
 *    link: 'dashboard'
 *  }
 * ];
 * // ...
 * <nb-menu [items]="items"></nb-menu>
 * ```
 * ### Installation
 *
 * Import `NbMenuModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbMenuModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Two-level menu example
 * @stacked-example(Two Levels, menu/menu-children.component)
 *
 *
 * Autocollapse menu example
 * @stacked-example(Autocollapse Menu, menu/menu-autocollapse.component)
 *
 *
 * @styles
 *
 * menu-background-color:
 * menu-text-color:
 * menu-text-font-family:
 * menu-text-font-size:
 * menu-text-font-weight:
 * menu-text-line-height:
 * menu-group-text-color:
 * menu-item-border-radius:
 * menu-item-padding:
 * menu-item-hover-background-color:
 * menu-item-hover-cursor:
 * menu-item-hover-text-color:
 * menu-item-icon-hover-color:
 * menu-item-active-background-color:
 * menu-item-active-text-color:
 * menu-item-icon-active-color:
 * menu-item-icon-color:
 * menu-item-icon-margin:
 * menu-item-icon-width:
 * menu-item-divider-color:
 * menu-item-divider-style:
 * menu-item-divider-width:
 * menu-submenu-background-color:
 * menu-submenu-text-color:
 * menu-submenu-margin:
 * menu-submenu-padding:
 * menu-submenu-item-border-color:
 * menu-submenu-item-border-style:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-hover-background-color:
 * menu-submenu-item-hover-border-color:
 * menu-submenu-item-hover-text-color:
 * menu-submenu-item-icon-hover-color:
 * menu-submenu-item-active-background-color:
 * menu-submenu-item-active-border-color:
 * menu-submenu-item-active-text-color:
 * menu-submenu-item-icon-active-color:
 * menu-submenu-item-active-hover-background-color:
 * menu-submenu-item-active-hover-border-color:
 * menu-submenu-item-active-hover-text-color:
 * menu-submenu-item-icon-active-hover-color:
 */
let NbMenuComponent = class NbMenuComponent {
    constructor(window, menuInternalService, router) {
        this.window = window;
        this.menuInternalService = menuInternalService;
        this.router = router;
        this._autoCollapse = false;
        this.alive = true;
    }
    /**
     * Collapse all opened submenus on the toggle event
     * Default value is "false"
     * @type boolean
     */
    get autoCollapse() {
        return this._autoCollapse;
    }
    set autoCollapse(value) {
        this._autoCollapse = convertToBoolProperty(value);
    }
    ngOnInit() {
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService
            .onAddItem()
            .pipe(takeWhile(() => this.alive), filter((data) => this.compareTag(data.tag)))
            .subscribe(data => this.onAddItem(data));
        this.menuInternalService
            .onNavigateHome()
            .pipe(takeWhile(() => this.alive), filter((data) => this.compareTag(data.tag)))
            .subscribe(() => this.navigateHome());
        this.menuInternalService
            .onGetSelectedItem()
            .pipe(takeWhile(() => this.alive), filter((data) => this.compareTag(data.tag)))
            .subscribe((data) => {
            data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
        });
        this.menuInternalService
            .onCollapseAll()
            .pipe(takeWhile(() => this.alive), filter((data) => this.compareTag(data.tag)))
            .subscribe(() => this.collapseAll());
        this.router.events
            .pipe(takeWhile(() => this.alive), filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
            this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
        });
    }
    ngAfterViewInit() {
        setTimeout(() => this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse));
    }
    onAddItem(data) {
        this.items.push(...data.items);
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
    }
    onHoverItem(item) {
        this.menuInternalService.itemHover(item, this.tag);
    }
    onToggleSubMenu(item) {
        if (this.autoCollapse) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    }
    // TODO: is not fired on page reload
    onSelectItem(item) {
        this.menuInternalService.selectItem(item, this.items, this.autoCollapse, this.tag);
    }
    onItemClick(item) {
        this.menuInternalService.itemClick(item, this.tag);
    }
    ngOnDestroy() {
        this.alive = false;
    }
    navigateHome() {
        const homeItem = this.getHomeItem(this.items);
        if (homeItem) {
            if (homeItem.link) {
                this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
            }
            if (homeItem.url) {
                this.window.location.href = homeItem.url;
            }
        }
    }
    collapseAll() {
        this.menuInternalService.collapseAll(this.items, this.tag);
    }
    getHomeItem(items) {
        for (const item of items) {
            if (item.home) {
                return item;
            }
            const homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
    }
    compareTag(tag) {
        return !tag || tag === this.tag;
    }
    getSelectedItem(items) {
        let selected = null;
        items.forEach((item) => {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = this.getSelectedItem(item.children);
            }
        });
        return selected;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbMenuComponent.prototype, "tag", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NbMenuComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbMenuComponent.prototype, "autoCollapse", null);
NbMenuComponent = __decorate([
    Component({
        selector: 'nb-menu',
        template: `
    <ul class="menu-items">
      <ng-container *ngFor="let item of items">
        <li nbMenuItem *ngIf="!item.hidden"
            [menuItem]="item"
            [class.menu-group]="item.group"
            (hoverItem)="onHoverItem($event)"
            (toggleSubMenu)="onToggleSubMenu($event)"
            (selectItem)="onSelectItem($event)"
            (itemClick)="onItemClick($event)"
            class="menu-item">
        </li>
      </ng-container>
    </ul>
  `,
        styles: [":host ::ng-deep{display:block}:host ::ng-deep .menu-items,:host ::ng-deep .menu-item>.menu-items{list-style-type:none;overflow:hidden}:host ::ng-deep .menu-item a{display:flex;color:inherit;text-decoration:none;align-items:center}:host ::ng-deep .menu-item a .menu-title{flex:1 0 auto}[dir=rtl] :host ::ng-deep .menu-item a .menu-title{text-align:right}:host ::ng-deep .menu-group span{display:flex}\n"]
    }),
    __param(0, Inject(NB_WINDOW)),
    __metadata("design:paramtypes", [Object, NbMenuInternalService,
        Router])
], NbMenuComponent);
export { NbMenuComponent };
//# sourceMappingURL=menu.component.js.map