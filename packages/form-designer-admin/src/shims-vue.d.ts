/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png';
declare module '*.jpg';

interface Window {
    $fd: {
        funcFactory: any;
    };
}

namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_ENV: string;
        VUE_APP_TITLE: string;
        VUE_APP_VERSION: string;
        VUE_APP_SOURCEMAP: string;
    }
}
