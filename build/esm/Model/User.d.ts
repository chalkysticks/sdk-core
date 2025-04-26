import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
export interface User {
    autoCheckin?: string;
    biography?: string;
    hometown?: string;
    lastLocation?: string;
    plays8Ball?: boolean;
    plays9Ball?: boolean;
    plays10Ball?: boolean;
    playsArtistic?: boolean;
    playsBanks?: boolean;
    playsBilliards?: boolean;
    playsOneCushion?: boolean;
    playsOnePocket?: boolean;
    playsPyramid?: boolean;
    playsSnooker?: boolean;
    playStraight?: boolean;
    talentLevel?: number;
}
export declare class User extends Base {
    endpoint: string;
    fields: string[];
    get avatar(): Model.Media;
    get games(): Collection.Meta;
    get lastCollection(): Model.Wallet;
    get media(): Collection.Media;
    get profile(): Collection.Meta;
    getBiography(): string;
    getHometown(): string;
    getLatitude(): number;
    getLongitude(): number;
    getName(): string;
    getPermissions(): number;
    getPhone(): string;
    getSlug(): string;
    getStatus(): number;
    getTalentLevel(): number;
    getWalletBalance(): number;
}
