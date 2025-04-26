var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
import { RelationshipProperties } from '../index.js';
let User = class User extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'users';
        this.fields = ['id', 'lat', 'lon', 'name', 'phone', 'slug', 'status', 'wallet_balance', 'created_at', 'updated_at'];
    }
    get avatar() {
        return this.media.primary || new Model.Media();
    }
    get games() {
        return this.hasMany('games', Collection.Meta);
    }
    get lastCollection() {
        return this.hasOne('last_collection', Model.Wallet);
    }
    get media() {
        return this.hasMany('media', Collection.Media);
    }
    get metadata() {
        return this.hasMany('meta', Collection.Meta);
    }
    getLatitude() {
        return parseFloat(this.attr('lat'));
    }
    getLongitude() {
        return parseFloat(this.attr('lon'));
    }
    getName() {
        return this.attr('name');
    }
    getPermissions() {
        return parseFloat(this.attr('permissions'));
    }
    getPhone() {
        return this.attr('phone');
    }
    getSlug() {
        return this.attr('slug');
    }
    getStatus() {
        return parseFloat(this.attr('status'));
    }
    getWalletBalance() {
        return parseFloat(this.attr('wallet_balance'));
    }
};
User = __decorate([
    RelationshipProperties({
        autoCheckin: {
            key: 'autocheckin',
            relationship: 'profile',
        },
        biography: {
            key: 'brief_bio',
            relationship: 'profile',
        },
        hometown: {
            key: 'hometown',
            relationship: 'profile',
        },
        lastLocation: {
            key: 'last_location',
            relationship: 'profile',
        },
        plays8Ball: {
            key: '8ball',
            relationship: 'games',
            value: '8 Ball',
        },
        plays9Ball: {
            key: '9ball',
            relationship: 'games',
            value: '9 Ball',
        },
        plays10Ball: {
            key: '10ball',
            relationship: 'games',
            value: '10 Ball',
        },
        playsArtistic: {
            key: 'artistic',
            relationship: 'games',
            value: 'Trick Shots',
        },
        playsBanks: {
            key: 'banks',
            relationship: 'games',
            value: 'Bank Pool',
        },
        playsBilliards: {
            key: 'billiards',
            relationship: 'games',
            value: 'Billiards',
        },
        playsOneCushion: {
            key: 'onecushion',
            relationship: 'games',
            value: 'One Cushion',
        },
        playsOnePocket: {
            key: 'onepocket',
            relationship: 'games',
            value: 'One Pocket',
        },
        playsPyramid: {
            key: 'pyramid',
            relationship: 'games',
            value: 'Russian Pyramid',
        },
        playsSnooker: {
            key: 'snooker',
            relationship: 'games',
            value: 'Snooker',
        },
        playStraight: {
            key: 'straight',
            relationship: 'games',
            value: '14.1 Straight Pool',
        },
        talentLevel: {
            key: 'talent_level',
            relationship: 'profile',
        },
    })
], User);
export { User };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUE0RzlDLElBQU0sSUFBSSxHQUFWLE1BQU0sSUFBSyxTQUFRLElBQUk7SUFBdkI7O1FBT0MsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQU8zQixXQUFNLEdBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBdUdqSSxDQUFDO0lBbEdBLElBQVcsTUFBTTtRQUNoQixPQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBdUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFrQixPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFlLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFtQixPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDbEIsT0FBTyxJQUFJLENBQUMs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