export class Environment {
    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
    }
    get app() {
        return singleton.getVariable('app', {
            apiUrl: '',
            limit: 32,
            localUrl: '',
        });
    }
    get debug() {
        return singleton.getVariable('debug', false);
    }
    get env() {
        return singleton.getVariable('env', 'development');
    }
    get google() {
        return singleton.getVariable('google', {
            analytics: {
                id: '',
            },
            api_key: '',
        });
    }
    get headers() {
        return singleton.getVariable('headers', {});
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
        const environment = typeof window === 'object' && window['env'] ? window['env'] : {};
        const chalkysticks = typeof window === 'object' && window['chalky'] ? window['chalky'] : {};
        const merged = { ...environment, ...chalkysticks };
        const output = merged[key] || defaults;
        return output;
    }
}
const singleton = new Environment();
export default singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1CQSxNQUFNLE9BQU8sV0FBVztJQUF4QjtRQXFFUSxPQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBMEM3RCxDQUFDO0lBM0dBLElBQVcsR0FBRztRQUNiLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFJbkMsTUFBTSxFQUFFLEVBQUU7WUFLVixLQUFLLEVBQUUsRUFBRTtZQUtULFFBQVEsRUFBRSxFQUFFO1NBQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQU9ELElBQVcsS0FBSztRQUNmLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQU9ELElBQVcsR0FBRztRQUNiLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQU9ELElBQVcsTUFBTTtRQUNoQixPQUFPLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RDLFNBQVMsRUFBRTtnQkFDVixFQUFFLEVBQUUsRUFBRTthQUNOO1lBQ0QsT0FBTyxFQUFFLEVBQUU7U0FDWCxDQUFDLENBQUM7SUFDSixDQUFDO0lBT0QsSUFBVyxPQUFPO1FBQ2pCLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQWNNLE9BQU87UUFDYixPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDO0lBQ3JFLENBQUM7SUFPTSxZQUFZO1FBQ2xCLE9BQU8sU0FBUyxDQUFDLEdBQUcsS0FBSyxZQUFZLENBQUM7SUFDdkMsQ0FBQztJQU9NLFNBQVM7UUFDZixPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFPTyxXQUFXLENBQUMsR0FBVyxFQUFFLFFBQWE7UUFDN0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFLLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkcsTUFBTSxZQUFZLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFLLE1BQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUUsTUFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUcsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFDO1FBQ25ELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUM7UUFFdkMsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0NBQ0Q7QUFHRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ3BDLGVBQWUsU0FBUyxDQUFDIn0=