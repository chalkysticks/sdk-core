export declare class Environment {
    static app: any;
    static debug: boolean;
    static env: string;
    static google: any;
    static id: string;
    static isLocal(): boolean;
    static isProduction(): boolean;
    static isStaging(): boolean;
    private static getVariable;
}
