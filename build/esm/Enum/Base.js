/**
 * @class Base
 * @package Enum
 * @project ChalkySticks SDK Core
 */
export default class EnumBase {
    /**
     * Convert constant key to readable value
     *
     * @param  string|number value
     * @return string
     */
    static caption(value = 0) {
        let caption;
        if (!isNaN(value)) {
            caption = (this.search(value) || '').toString();
        }
        else {
            caption = value.toString();
        }
        // Convert
        caption = caption.split('_').join(' ');
        caption = caption.toLowerCase();
        caption = caption != ''
            ? caption.split(' ').map(x => x[0].toUpperCase() + x.substr(1)).join(' ')
            : caption;
        return caption;
    }
    /**
     * Get all captions
     *
     * @return string[]
     */
    static captions() {
        const keys = this.keys();
        const captions = [];
        keys.forEach(key => captions.push(this.caption(key)));
        return captions;
    }
    /**
     * Return object of captions + keys
     *
     * @return any
     */
    static captionsAndKeys() {
        const values = this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [key.toLowerCase()]: this.caption(key) }), {});
        for (const key in values) {
            const value = values[key];
            values[key] = this.caption(value);
        }
        return values;
    }
    /**
     * Return object of captions + values
     *
     * @return any
     */
    static captionsAndValues() {
        const values = this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});
        for (const key in values) {
            const value = values[key];
            values[key] = this.caption(value);
        }
        return values;
    }
    /**
     * Get entries object
     *
     * @return any
     */
    static entries() {
        return Object.entries(this);
    }
    /**
     * Get all keys
     *
     * @return string[]
     */
    static keys() {
        return Object.keys(this);
    }
    /**
     * Find const based on value
     *
     * @param  string|number value
     * @return string[]
     */
    static search(value) {
        const entry = this.entries().find(ary => ary[1] == value);
        return entry ? entry[0] : null;
    }
    /**
     * Get all values
     *
     * @return string[]
     */
    static values() {
        return Object.values(this);
    }
    /**
     * Convert to caption
     *
     * @return string
     */
    static slug(value, toLower = true) {
        let caption = '';
        // @ts-ignore
        if (isNaN(value)) {
            caption = this.search(value) || '';
        }
        else {
            caption = value;
        }
        caption = caption.replace('[^a-zA-Z0-9]', '_');
        caption = caption.toLowerCase();
        // caption = toLower ? caption.toLowerCase() : ucwords(caption);
        return caption;
    }
    /**
     * Convert to Array
     *
     * @return array
     */
    static toArray() {
        return this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    }
}
