export declare function RelationshipProperties(propertyConfigs: Record<string, {
    key?: string;
    relationship?: string;
    value?: string;
}>): <T extends {
    new (...args: any[]): any;
}>(constructor: T) => {
    new (...args: any[]): {
        [x: string]: any;
    };
} & T;
