import { Base } from './Base';
interface IThumborOptions {
    fitIn?: boolean;
    height?: number;
    smart?: boolean;
    width?: number;
    filters?: {
        blur?: number;
        brightness?: number;
        contrast?: number;
        format?: 'webp' | 'jpeg' | 'png';
        grayscale?: boolean;
        quality?: number;
        watermark?: {
            image: string;
            x: number;
            y: number;
            transparency?: number;
        };
    };
}
export declare class Media extends Base {
    endpoint: string;
    fields: string[];
    protected proxyUrl: string;
    getGroup(): string;
    getSubgroup(): string;
    getProxiedUrl(options?: IThumborOptions): string;
    getType(): string;
    getUrl(): string;
    getUrlSmall(): string;
    getUrlMedium(): string;
    getUrlLarge(): string;
    getCreatedAt(): string;
    getUpdatedAt(): string;
}
export {};
