const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ElectronConnectPlugin = require('webpack-electron-connect-plugin');

const commonConfig = {
    node: {
        __dirname: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: "pre", test: /\.jsx?$/, loader: 'source-map-loader' }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
};

module.exports = [
    Object.assign(
        {
            target: 'electron-main',
            entry: { main: './src/main/main.ts' },
            plugins: [
                new ElectronConnectPlugin({
                    type: "reload",
                    options: {}
                })
            ]
        },
        commonConfig
    ),
    Object.assign(
        {
            target: 'electron-renderer',
            entry: { gui: './src/renderer/gui.tsx' },
            plugins: [new HtmlWebpackPlugin()]
        },
        commonConfig
    )
];