const monacoEditorPlugin = require('monaco-editor-webpack-plugin');

process.env.VUE_APP_VERSION = require('./package.json').version;
const sourceMap = process.env.VUE_APP_SOURCEMAP === 'true';
const target = process.env.VUE_CLI_BUILD_TARGET;
module.exports = {
    pages: {
        index: 'src/entry/designer-client.ts',
    },
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
