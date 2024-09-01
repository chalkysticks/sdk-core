export declare class Environment {
    app: any;
    debug: boolean;
    env: string;
    google: any;
    id: string;
    isLocal(): boolean;
    isProduction(): boolean;
    isStaging(): boolean;
    private getVariable;
}
declare const singleton: Environment;
export default singleton;
