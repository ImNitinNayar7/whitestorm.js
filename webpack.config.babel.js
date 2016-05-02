import {join} from 'path';
import webpack from 'webpack';

function config(production) {
  return {
    devtool: production ? 'hidden-source-map' : 'eval-source-map',
    entry: './src/demo.js',
    output: {
      path: join(__dirname, 'assets', 'build'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
      ],
    },
    plugins: production
      ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
            warnings: false,
          },
        }),
      ]
      : [],
  };
}

export {
  config as default,
};
