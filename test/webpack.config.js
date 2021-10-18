/* eslint-env node */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'test.tsx'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
