/**
 * Created by wangx on 2018-03-10.
 */
const path = require('path');

const config = {
    entry: './webpack/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
};

module.exports = config;