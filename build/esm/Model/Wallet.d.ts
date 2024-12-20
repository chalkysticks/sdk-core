import * as Model from '.';
import { Base } from './Base';
export declare class Wallet extends Base {
    endpoint: string;
    fields: string[];
    collect(token: string): Promise<Wallet>;
    get user(): Model.User;
    get challenger(): Model.User;
    canCollect(): boolean;
    getSource(): string;
    getTransaction(): string;
    getCreatedAt(): string;
    getUpdatedAt(): string;
}
