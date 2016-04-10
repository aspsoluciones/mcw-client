/**
 * Created by epotignano on 9/4/16.
 */
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: {

      plugins: [ new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }), new webpack.ProvidePlugin({
        $: 'semantic'
      })],
      module: {
        loaders: [
          {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};