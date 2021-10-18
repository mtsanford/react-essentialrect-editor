const path = require('path');

module.exports = [
  {
    mode: "production",
    name: "EssentialRectEditor",
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      library: 'EssentialRectEditor',
      libraryTarget: 'umd',
      filename: 'EssentialRectEditor.js',
      globalObject: 'this',
      clean: true,
      path: path.resolve(__dirname, 'dist'),
    },
    externals: {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-image-crop': {
        commonjs: 'react-image-crop',
        commonjs2: 'react-image-crop',
        amd: 'react-image-crop',
      },
      'react-essentialrect': {
        commonjs: 'react-essentialrect',
        commonjs2: 'react-essentialrect',
        amd: 'react-essentialrect',
      }
    },
    target: 'web',
  },
];
