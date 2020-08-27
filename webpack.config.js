const path = require('path');

const ROOT = process.cwd()
// const SRC = path.resolve(ROOT, 'js')

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    },]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      base: process.cwd(),
      img: `${ROOT}/img`,
      js: `${ROOT}/js`,
      json: `${ROOT}/json`
    },
    extensions: ['.html', '.js', '.jsx', '.json', '.scss']
  }
};

