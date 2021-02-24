const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  // bundling mode
  mode: 'production',
  // entry files
  entry: './src/app/app.ts',
  // output bundles (location)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  // file resolutions
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({})]
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()]
};
