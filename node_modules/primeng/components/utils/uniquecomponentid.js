"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastId = 0;
function UniqueComponentId() {
    var prefix = 'pr_id_';
    exports.lastId++;
    return "" + prefix + exports.lastId;
}
exports.UniqueComponentId = UniqueComponentId;
//# sourceMappingURL=uniquecomponentid.js.map