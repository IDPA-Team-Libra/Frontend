var NbFontIcon = /** @class */ (function () {
    function NbFontIcon(name, content, params) {
        if (params === void 0) { params = {}; }
        this.name = name;
        this.content = content;
        this.params = params;
    }
    NbFontIcon.prototype.getClasses = function (options) {
        var classes = [];
        if (this.params.packClass) {
            classes.push(this.params.packClass);
        }
        var name = this.params.iconClassPrefix ? this.params.iconClassPrefix + "-" + this.name : this.name;
        classes.push(name);
        return classes;
    };
    NbFontIcon.prototype.getContent = function (options) {
        return this.content;
    };
    return NbFontIcon;
}());
export { NbFontIcon };
var NbSvgIcon = /** @class */ (function () {
    function NbSvgIcon(name, content, params) {
        if (params === void 0) { params = {}; }
        this.name = name;
        this.content = content;
        this.params = params;
    }
    NbSvgIcon.prototype.getClasses = function (options) {
        var classes = [];
        if (this.params.packClass) {
            classes.push(this.params.packClass);
        }
        return classes;
    };
    NbSvgIcon.prototype.getContent = function (options) {
        return this.content;
    };
    return NbSvgIcon;
}());
export { NbSvgIcon };
//# sourceMappingURL=icon.js.map