export default class Environment {
    static app: any;
    static debug: boolean;
    static env: string;
    static google: any;
    static isLocal(): boolean;
    static isProduction(): boolean;
    static isStaging(): boolean;
    private static getVariable;
}
