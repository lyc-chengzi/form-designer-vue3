import { RouteRecordRaw } from 'vue-router';
import vueDemo from '../views/demo/vueDemo.vue';

const demoRoutes: Array<RouteRecordRaw> = [
    {
        name: 'demo_vue',
        path: '/demo/vue',
        meta: {
            className: 'form-designer-demo-vue',
            label: 'vue组件语法',
            title: 'vue组件语法',
        },
        //component: () => import(/* webpackChunkName: "demo_vue" */ '../views/demo/vueDemo.vue'),
        component: vueDemo,
    },
    {
        name: 'demo_tsc',
        path: '/demo/tsx',
        meta: {
            className: 'form-designer-demo-tsx',
            label: 'tsx组件语法',
            title: 'tsx组件语法',
        },
        component: () => import(/* webpackChunkName: "demo_tsc" */ '../views/demo/tsxDemo'),
    },
];
export default demoRoutes;
