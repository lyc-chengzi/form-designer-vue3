module.exports = {
    apps: [
        {
            name: 'koaAPI',
            script: './dist/server/app.js',
            watch: false,
            watch_delay: 2000,
            instances: 3, // "max"
            instance_var: 'INSTANCE_ID',
            exec_mode: 'cluster',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            env: {
                NODE_ENV: 'production',
                KOA_APP_ENV: 'production',
                KOA_APP_PORT: 8080,
            },
            env_localhost: {
                NODE_ENV: 'development',
                KOA_APP_ENV: 'localhost',
                KOA_APP_PORT: 3030,
            },
            env_dev: {
                NODE_ENV: 'development',
                KOA_APP_ENV: 'development',
                KOA_APP_PORT: 3040,
            },
        },
    ],
};
