import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import demoRoutes from './demo';

let routes: Array<RouteRecordRaw> = [
    {
        name: 'form_designer_index',
        path: '/',
        meta: {
            className: 'form-designer-page',
            label: '模板设计器',
            title: '通过json文件，生成对应的模板文件',
        },
        component: () => import(/* webpackChunkName: "form_designer_index" */ '../views/designer'),
    },
    {
        name: 'form_designer',
        path: '/designer',
        meta: {
            className: 'form-designer-page',
            label: '模板设计器',
            title: '通过json文件，生成对应的模板文件',
        },
        component: () => import(/* webpackChunkName: "form_designer" */ '../views/designer'),
    },
    // {
    //     name: 'table_list',
    //     path: '/table',
    //     meta: {
    //         className: 'table-list-page',
    //         label: '数据列表',
    //         title: '表单数据管理',
    //     },
    //     component: () => import(/* webpackChunkName: "table_list" */ '../views/table/index.vue'),
    // },
    {
        name: 'form_designer_preview',
        path: '/preview',
        meta: {
            className: 'form-renderer',
            label: '预览',
            title: '通过json文件动态渲染出vue组件',
        },
        component: () => import(/* webpackChunkName: "form_preview" */ '../views/designer/preview'),
    },
];

routes = routes.concat(demoRoutes);

const _createRouter = () => {
    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
    });

    router.beforeEach((to, from, next) => {
        const className: string = (to.meta?.className as string) || '';
        if (className) {
            const html = document.querySelector('html');
            const body = document.querySelector('body');
            if (html) {
                html.setAttribute('class', className);
            }
            if (body) {
                body.setAttribute('class', className);
            }
        }
        next();
    });
    return router;
};

export default _createRouter;
