const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../package.json').dependencies;

// ----------------------------- Vue Host  -----------------------  //

module.exports = () => ({
    plugins: [
        new ModuleFederationPlugin({
            name: 'host_vue',
            remotes: {
                remote_react: 'remote_react@http://localhost:8081/remoteEntry.js',
                home: `home@http://localhost:3002/remoteEntry.js`,
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 8080,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
});
