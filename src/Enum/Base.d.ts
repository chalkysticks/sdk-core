export declare class Base {
    static caption(value?: any): string;
    static captions(): string[];
    static captionsAndKeys(): any;
    static captionsAndValues(): any;
    static entries(): any;
    static keys(): string[];
    static search(value: string | number): string | null;
    static values(): string[] | number[];
    static slug(value: string | number, toLower?: boolean): string;
    static toArray(): any;
}
