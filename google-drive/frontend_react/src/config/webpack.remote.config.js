const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = () => ({
    plugins: [
        new ModuleFederationPlugin({
            name: 'remote_vue',
            filename: 'remoteEntry.js',
            exposes: {
                "./shared-component": "./src/vue-entry.js",
                "./FileCards": "./src/components/listers/FileCards"
            },
            remotes: {
                react: "react",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: false,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: false,
                },
            },
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8081,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
});
