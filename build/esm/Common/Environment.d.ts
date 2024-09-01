export declare class Environment {
    get app(): any;
    get debug(): boolean;
    get env(): string;
    get google(): any;
    id: string;
    isLocal(): boolean;
    isProduction(): boolean;
    isStaging(): boolean;
    private getVariable;
}
declare const singleton: Environment;
export default singleton;
