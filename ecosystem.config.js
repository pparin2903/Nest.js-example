module.exports = {
    apps: [
        {
            name: 'NestJS-backend',
            script: 'node',
            args: 'dist/main.js',
            env_local: {
                PORT: 3000,
                APP_ENV: 'development',
                NODE_ENV: 'development',
            },
            env_test: {
                PORT: 9998,
                APP_ENV: 'production',
                NODE_ENV: 'production',
            },
            env_prod: {
                PORT: 5000,
                APP_ENV: 'production',
                NODE_ENV: 'production',
            },
        },
    ],
};
