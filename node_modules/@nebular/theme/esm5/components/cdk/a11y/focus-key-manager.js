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
import { FocusKeyManager } from '@angular/cdk/a11y';
var NbFocusKeyManager = /** @class */ (function (_super) {
    __extends(NbFocusKeyManager, _super);
    function NbFocusKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbFocusKeyManager;
}(FocusKeyManager));
export { NbFocusKeyManager };
var NbFocusKeyManagerFactoryService = /** @class */ (function () {
    function NbFocusKeyManagerFactoryService() {
    }
    NbFocusKeyManagerFactoryService.prototype.create = function (items) {
        return new NbFocusKeyManager(items);
    };
    return NbFocusKeyManagerFactoryService;
}());
export { NbFocusKeyManagerFactoryService };
//# sourceMappingURL=focus-key-manager.js.map