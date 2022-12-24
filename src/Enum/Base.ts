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
    public static caption(value: any = 0): string {
        let caption: string;

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
    public static captions(): string[] {
        const keys: string[] = this.keys();
        const captions: string[] = [];

        keys.forEach(key => captions.push(this.caption(key)));

        return captions;
    }

    /**
     * Return object of captions + keys
     *
     * @return any
     */
    public static captionsAndKeys(): any {
        const values: any = this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [<string> key.toLowerCase()]: this.caption(key) }), {});

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
    public static captionsAndValues(): any {
        const values: any = this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [<string> value]: key }), {});

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
    public static entries(): any {
        return Object.entries(this);
    }

    /**
     * Get all keys
     *
     * @return string[]
     */
    public static keys(): string[] {
        return Object.keys(this);
    }

    /**
     * Find const based on value
     *
     * @param  string|number value
     * @return string[]
     */
    public static search(value: string | number): string | null {
        const entry = this.entries().find(ary => ary[1] == value);
        return entry ? entry[0] : null;
    }

    /**
     * Get all values
     *
     * @return string[]
     */
    public static values(): string[] | number[] {
        return Object.values(this);
    }

    /**
     * Convert to caption
     *
     * @return string
     */
    public static slug(value: string | number, toLower = true) {
        let caption = '';

        // @ts-ignore
        if (isNaN(value)) {
            caption = this.search(value) || '';
        }
        else {
            caption = <string> value;
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
    public static toArray(): any {
        return this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [<string> key]: value }), {});
    }
}
