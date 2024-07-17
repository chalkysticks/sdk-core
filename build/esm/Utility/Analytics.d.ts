interface IRedditPixelOptions {
    aaid?: string;
    email?: string;
    externalId?: string;
    idfa?: string;
    optOut?: boolean;
    useDecimalCurrencyValues?: boolean;
}
export declare function embedGoogleAnalytics(id: string): void;
export declare function embedRedditPixel(pixelId: string, options?: IRedditPixelOptions): void;
export declare function embedMetaPixel(pixelId: string): void;
export {};
