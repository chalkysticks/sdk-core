var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
import { RelationshipProperties } from '../Utility/Core.js';
let User = class User extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'users';
        this.fields = ['id', 'lat', 'lon', 'name', 'phone', 'slug', 'status', 'wallet_balance', 'created_at', 'updated_at'];
    }
    get avatar() {
        return this.media.avatar || new Model.Media();
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
    get profile() {
        return this.hasMany('profile', Collection.Meta);
    }
    getBiography() {
        return this.biography || '';
    }
    getHometown() {
        return this.hometown || '';
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
    getTalentLevel() {
        return Number.isInteger(this.talentLevel) ? this.talentLevel || 0 : parseInt(String(this.talentLevel).trim(), 10) || 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQTRHckQsSUFBTSxJQUFJLEdBQVYsTUFBTSxJQUFLLFNBQVEsSUFBSTtJQUF2Qjs7UUFPQyxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBTzNCLFdBQU0sR0FBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFrSWpJLENBQUM7SUE3SEEsSUFBVyxNQUFNO1FBQ2hCLE9BQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFzQixJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQWtCLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELElBQVcsY0FBYztRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQWUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQW1CLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQVcsT0FBTztRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQWtCLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQVlNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBT00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFPTSxXQUFXO1FBQ2pCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBT00sWUFBWTtRQUNsQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQU9NLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQU9NLGNBQWM7UUFDcEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFPTSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFPTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFPTSxTQUFTO1FBQ2YsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFPTSxjQUFjO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQU9NLGdCQUFnQjtRQUN0QixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFXLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBR0QsQ0FBQTtBQWhKWSxJQUFJO0lBN0VoQixzQkFBc0IsQ0FBQztRQUN2QixXQUFXLEVBQUU7WUFDWixHQUFHLEVBQUUsYUFBYTtZQUNsQixZQUFZLEVBQUUsU0FBUztTQUN2QjtRQUNELFNBQVMsRUFBRTtZQUNWLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLFlBQVksRUFBRSxTQUFTO1NBQ3ZCO1FBQ0QsUUFBUSxFQUFFO1lBQ1QsR0FBRyxFQUFFLFVBQVU7WUFDZixZQUFZLEVBQUUsU0FBUztTQUN2QjtRQUNELFlBQVksRUFBRTtZQUNiLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLFlBQVksRUFBRSxTQUFTO1NBQ3ZCO1FBQ0QsVUFBVSxFQUFFO1lBQ1gsR0FBRyxFQUFFLE9BQU87WUFDWixZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsUUFBUTtTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1gsR0FBRyxFQUFFLE9BQU87WUFDWixZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsUUFBUTtTQUNmO1FBQ0QsV0FBVyxFQUFFO1lBQ1osR0FBRyxFQUFFLFFBQVE7WUFDYixZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsU0FBUztTQUNoQjtRQUNELGFBQWEsRUFBRTtZQUNkLEdBQUcsRUFBRSxVQUFVO1lBQ2YsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLGFBQWE7U0FDcEI7UUFDRCxVQUFVLEVBQUU7WUFDWCxHQUFHLEVBQUUsT0FBTztZQUNaLFlBQVksRUFBRSxPQUFPO1lBQ3JCLEtBQUssRUFBRSxXQUFXO1NBQ2xCO1FBQ0QsY0FBYyxFQUFFO1lBQ2YsR0FBRyxFQUFFLFdBQVc7WUFDaEIsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLFdBQVc7U0FDbEI7UUFDRCxlQUFlLEVBQUU7WUFDaEIsR0FBRyxFQUFFLFlBQVk7WUFDakIsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLGFBQWE7U0FDcEI7UUFDRCxjQUFjLEVBQUU7WUFDZixHQUFHLEVBQUUsV0FBVztZQUNoQixZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsWUFBWTtTQUNuQjtRQUNELFlBQVksRUFBRTtZQUNiLEdBQUcsRUFBRSxTQUFTO1lBQ2QsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLGlCQUFpQjtTQUN4QjtRQUNELFlBQVksRUFBRTtZQUNiLEdBQUcsRUFBRSxTQUFTO1lBQ2QsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLFNBQVM7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDYixHQUFHLEVBQUUsVUFBVTtZQUNmLFlBQVksRUFBRSxPQUFPO1lBQ3JCLEtBQUssRUFBRSxvQkFBb0I7U0FDM0I7UUFDRCxXQUFXLEVBQUU7WUFDWixHQUFHLEVBQUUsY0FBYztZQUNuQixZQUFZLEVBQUUsU0FBUztTQUN2QjtLQUNELENBQUM7R0FDVyxJQUFJLENBZ0poQiJ9