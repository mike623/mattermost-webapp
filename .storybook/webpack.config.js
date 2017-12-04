// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');

module.exports = {
  resolve: {
    modules: [
      'node_modules',
      'non_npm_dependencies',
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '..', 'stories'),
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.(png|eot|tiff|svg|woff2|woff|ttf|gif|mp3|jpg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'files/[hash].[ext]'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {}
            }
        ]
    },
    ],
  },
};
