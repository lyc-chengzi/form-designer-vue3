declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
declare module '*.png';
declare module '*.jpg';

declare namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_TITLE: string;
        VUE_APP_VERSION: string;
    }
}
