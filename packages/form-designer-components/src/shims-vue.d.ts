declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
    export { register, ccc };
}
declare module '*.png';
declare module '*.jpg';

declare module 'three/examples/jsm/libs/dat.gui.module' {
    export class GUI {
        constructor();
        add: (
            control: unknown,
            filedName: string,
            min?: number | string | boolean | string[],
            max?: number | string | boolean
        ) => GUI;
        destroy: () => void;
        listen: () => void;
        name: (name: string) => void;
    }
}

interface Window {
    $fd: {
        funcFactory: any;
    };
}

declare namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_TITLE: string;
        VUE_APP_VERSION: string;
    }
}
