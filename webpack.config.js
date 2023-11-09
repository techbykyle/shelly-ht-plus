const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ModuleFederationPlugin } = require('webpack').container
const pkg = require('./package.json')
const exposes = require('./exposes.json')

const IOT_API_SSL_CRT = process.env.IOT_API_SSL_CRT || '/home/user/ssl/cert.crt'
const IOT_API_SSL_KEY = process.env.IOT_API_SSL_KEY  || '/home/user/ssl/key.key'

module.exports = {
    entry: './src/index.js',
    devServer: {
        server: {
            type: 'https',
            options: {
                key: IOT_API_SSL_KEY,
                cert: IOT_API_SSL_CRT,
                requestCert: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                },
            },
        },
        host: '0.0.0.0',
        port: 3001
    },
    output: {
        chunkFilename: '[id].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: pkg["federated-module-name"],
            filename: 'remoteEntry.js',
            shared: { 
                react: { requiredVersion: "16.14.0", singleton: true, eager: true }, 
                "react-dom": { requiredVersion: "16.14.0", singleton: true, eager: true }, 
                "react-redux": { requiredVersion: "7.2.3", singleton: true, eager: true } 
            },
            exposes
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
}