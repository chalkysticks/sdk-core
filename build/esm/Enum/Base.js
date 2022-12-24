"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnumBase {
    static caption(value = 0) {
        let caption;
        if (!isNaN(value)) {
            caption = (this.search(value) || '').toString();
        }
        else {
            caption = value.toString();
        }
        caption = caption.split('_').join(' ');
        caption = caption.toLowerCase();
        caption = caption != ''
            ? caption.split(' ').map(x => x[0].toUpperCase() + x.substr(1)).join(' ')
            : caption;
        return caption;
    }
    static captions() {
        const keys = this.keys();
        const captions = [];
        keys.forEach(key => captions.push(this.caption(key)));
        return captions;
    }
    static captionsAndKeys() {
        const values = this.entries()
            .reduce((obj, [key, value]) => (Object.assign(Object.assign({}, obj), { [key.toLowerCase()]: this.caption(key) })), {});
        for (const key in values) {
            const value = values[key];
            values[key] = this.caption(value);
        }
        return values;
    }
    static captionsAndValues() {
        const values = this.entries()
            .reduce((obj, [key, value]) => (Object.assign(Object.assign({}, obj), { [value]: key })), {});
        for (const key in values) {
            const value = values[key];
            values[key] = this.caption(value);
        }
        return values;
    }
    static entries() {
        return Object.entries(this);
    }
    static keys() {
        return Object.keys(this);
    }
    static search(value) {
        const entry = this.entries().find(ary => ary[1] == value);
        return entry ? entry[0] : null;
    }
    static values() {
        return Object.values(this);
    }
    static slug(value, toLower = true) {
        let caption = '';
        if (isNaN(value)) {
            caption = this.search(value) || '';
        }
        else {
            caption = value;
        }
        caption = caption.replace('[^a-zA-Z0-9]', '_');
        caption = caption.toLowerCase();
        return caption;
    }
    static toArray() {
        return this.entries()
            .reduce((obj, [key, value]) => (Object.assign(Object.assign({}, obj), { [key]: value })), {});
    }
}
exports.default = EnumBase;
//# sourceMappingURL=Base.js.map