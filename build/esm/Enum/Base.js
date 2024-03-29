export class Base {
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
            .reduce((obj, [key, value]) => ({ ...obj, [key.toLowerCase()]: this.caption(key) }), {});
        for (const key in values) {
            const value = values[key];
            values[key] = this.caption(value);
        }
        return values;
    }
    static captionsAndValues() {
        const values = this.entries()
            .reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});
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
        const entry = this.entries().find((ary) => ary[1] == value);
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
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FbnVtL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxPQUFPLElBQUk7SUFPTixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQWEsQ0FBQztRQUNoQyxJQUFJLE9BQWUsQ0FBQztRQUVwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDaEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxDQUFDO2FBQ0ksQ0FBQztZQUNGLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUdELE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRTtZQUNuQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDekUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVkLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFPTSxNQUFNLENBQUMsUUFBUTtRQUNsQixNQUFNLElBQUksR0FBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBRTlCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FB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