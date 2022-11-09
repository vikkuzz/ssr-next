const ErudaWebpackPlugin = require('eruda-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 1000,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new ErudaWebpackPlugin({
            entry: /index\.js$/,
        }),
    ],
};
