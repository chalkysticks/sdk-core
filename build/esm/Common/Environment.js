export class Environment {
    static { this.app = Environment.getVariable('app', {
        api_url: '',
        limit: 32,
    }); }
    static { this.debug = Environment.getVariable('debug', false); }
    static { this.env = Environment.getVariable('env', 'development'); }
    static { this.google = Environment.getVariable('google', {
        analytics: {
            id: '',
        },
        api_key: '',
    }); }
    static { this.id = Math.random().toString(36).substr(2, 9); }
    static isLocal() {
        return Environment.env === 'local' || Environment.env === 'development';
    }
    static isProduction() {
        return Environment.env === 'production';
    }
    static isStaging() {
        return Environment.env === 'staging';
    }
    static getVariable(key, defaults) {
        const output = typeof window === 'object' && window['env'] ? window['env'][key] : defaults;
        return output;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxXQUFXO2FBSVQsUUFBRyxHQUFRLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZELE9BQU8sRUFBRSxFQUFFO1FBQ1gsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFDLENBQUM7YUFPVyxVQUFLLEdBQVksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFPekQsUUFBRyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBTzVELFdBQU0sR0FBUSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUM3RCxTQUFTLEVBQUU7WUFDVixFQUFFLEVBQUUsRUFBRTtTQUNOO1FBQ0QsT0FBTyxFQUFFLEVBQUU7S0FDWCxDQUFDLENBQUM7YUFPVyxPQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBTzVELE1BQU0sQ0FBQyxPQUFPO1FBQ3BCLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUM7SUFDekUsQ0FBQztJQU9NLE1BQU0sQ0FBQyxZQUFZO1FBQ3pCLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxZQUFZLENBQUM7SUFDekMsQ0FBQztJQU9NLE1BQU0sQ0FBQyxTQUFTO1FBQ3RCLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUM7SUFDdEMsQ0FBQztJQU9PLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBVyxFQUFFLFFBQWE7UUFDcEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFLLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFN0csT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDIn0=