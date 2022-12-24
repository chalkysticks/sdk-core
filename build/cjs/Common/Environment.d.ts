export default class Environment {
    static app: IEnvironmentApplication;
    static debug: boolean;
    static env: string;
    static google: IEnvironmentGoogle;
    static isLocal(): boolean;
    static isProduction(): boolean;
    static isStaging(): boolean;
    private static getVariable;
}
