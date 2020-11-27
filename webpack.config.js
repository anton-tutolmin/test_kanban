const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './public'),
  assets: 'static/'
}

module.exports = {
  entry: {
    app: `${PATHS.src}/index.tsx`
  },

  output: {
    filename: `${PATHS.assets}/[name].js`,
    path: PATHS.dist,
    publicPath: './'
  },

  resolve: {
    extensions: ['.tsx', '.ts']
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: 'index.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ],
  }
}