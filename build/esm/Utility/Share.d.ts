export declare function native(files?: File[], title?: string, text?: string, url?: string): Promise<boolean>;
export declare function remoteFile(remoteFileUrl: string, title?: string, text?: string, url?: string): Promise<boolean>;
export declare function hasSupport(): boolean;
export declare function canShare(): boolean;
