process.env.VUE_APP_VERSION = require('./package.json').version;
module.exports = {
    pages: {
        index: 'src/entry/view-client.ts',
    },
};
