// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// const workboxplugin = require('workbox-webpack-plugin');
// const CracoWorkboxPlugin = require('craco-workbox');
module.exports = {
  plugins: [
    {
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
          path: require.resolve('path-browserify'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
      module: {
        rules: [
          {
            test: /pdf\.worker\.js/,
            loader: 'file-loader',
            options: {
              name: 'static/js/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    },
  },
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
