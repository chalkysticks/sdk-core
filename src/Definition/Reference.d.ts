
declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare module '*.txt' {
    const content: string;
    export default content;
}

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
