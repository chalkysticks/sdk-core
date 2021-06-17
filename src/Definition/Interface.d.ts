
interface IGoogleAnalytics {
    id: string;
}

interface IEnvironmentApplication {
    api_url: string;
    limit: number;
}

interface IEnvironmentGoogle {
    analytics: IGoogleAnalyics;
    api_key: string;
}