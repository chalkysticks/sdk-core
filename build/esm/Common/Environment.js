export class Environment {
    constructor() {
        this.app = singleton.getVariable('app', {
            api_url: '',
            limit: 32,
        });
        this.debug = singleton.getVariable('debug', false);
        this.env = singleton.getVariable('env', 'development');
        this.google = singleton.getVariable('google', {
            analytics: {
                id: '',
            },
            api_key: '',
        });
        this.id = Math.random().toString(36).substr(2, 9);
    }
    isLocal() {
        return singleton.env === 'local' || singleton.env === 'development';
    }
    isProduction() {
        return singleton.env === 'production';
    }
    isStaging() {
        return singleton.env === 'staging';
    }
    getVariable(key, defaults) {
        const output = typeof window === 'object' && window['env'] ? window['env'][key] : defaults;
        return output;
    }
}
const singleton = new Environment();
export default singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBSVEsUUFBRyxHQUFRLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzlDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEVBQUU7U0FDVCxDQUFDLENBQUM7UUFPSSxVQUFLLEdBQVksU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFPdkQsUUFBRyxHQUFXLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBTzFELFdBQU0sR0FBUSxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUNwRCxTQUFTLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFLEVBQUU7YUFDTjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1gsQ0FBQyxDQUFDO1FBT0ksT0FBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQXVDN0QsQ0FBQztJQWhDTyxPQUFPO1FBQ2IsT0FBTyxTQUFTLENBQUMsR0FBRyxLQUFLLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQztJQUNyRSxDQUFDO0lBT00sWUFBWTtRQUNsQixPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFPTSxTQUFTO1FBQ2YsT0FBTyxTQUFTLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBT08sV0FBVyxDQUFDLEdBQVcsRUFBRSxRQUFhO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSyxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRTdHLE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNEO0FBR0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUNwQyxlQUFlLFNBQVMsQ0FBQyJ9