const monacoEditorPlugin = require('monaco-editor-webpack-plugin');

process.env.VUE_APP_VERSION = require('./package.json').version;
const sourceMap = process.env.VUE_APP_SOURCEMAP === 'true';
const target = process.env.VUE_CLI_BUILD_TARGET;
module.exports = {
    pages: {
        index: 'src/entry/designer-client.ts',
    },
    publicPath: '.',
    productionSourceMap: sourceMap,
    configureWebpack: (config) => {
        if(target !== 'lib') {
            config.plugins.push(
                new monacoEditorPlugin({
                    languages: ['css', 'javascript', 'typescript', 'json'],
                }),
            );
        }
    },
    devServer: {
        proxy: {
            '/form': {
                target: 'https://tdp-dev.lenovo.com/form',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/form': '',
                },
            },
            '/api-repo': {
                target: 'https://tdp-dev.lenovo.com/api-repo',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-repo': '',
                },
            },
            '/dm': {
                target: 'https://tdp-dev.lenovo.com/dm',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/dm': '',
                },
            },
            '/uidesigner': {
                target: 'https://tdp-dev.lenovo.com/uidesigner',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/uidesigner': '',
                },
            },
            '/import/csv': {
                target: 'http://10.99.166.218:3030/upload/csv/v1',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/import/csv': '',
                },
            },
            '/import/config': {
                target: 'http://10.99.166.218:3030/upload/importConfig/v1',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/import/config': '',
                },
            },
        },
    }
};
