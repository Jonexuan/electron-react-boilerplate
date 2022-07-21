const { resolve, join } = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const TerserPlugin = require('terser-webpack-plugin');


const INCLUDE = resolve(__dirname, '../', 'src');

const BUILD_FLAGS = {
  ENABLE_EXTENSIONS: false,
  ENABLE_AUTOFILL: false,
};

process.env = {
  ...process.env,
  ...BUILD_FLAGS,
};

const dev = process.env.DEV === '1';

process.env.NODE_ENV = dev ? 'development' : 'production';



const config = {
  mode: dev ? 'development' : 'production',

  devtool: dev ? 'eval-source-map' : false,

  output: {
    path: resolve(__dirname, '../', 'build'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: INCLUDE,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'res',
            },
          },
        ],
      },
      {
        test: /\.jsx|js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ],
                plugins: [
                    ["@babel/plugin-transform-runtime", {}]
                ]
            },
          },
        ],

        include: INCLUDE,
      },
      {
          test: /\.css$/,
          use: [
              {loader: "style-loader"},
              {
                  loader: "css-loader",
                  options: {
                      sourceMap: true
                  }
              }
          ]
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: {
      '~': INCLUDE,
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', ...Object.keys(BUILD_FLAGS)])
],

  externals: {
    keytar: `require('keytar')`,
    electron: 'require("electron")',
    fs: 'require("fs")',
    os: 'require("os")',
    path: 'require("path")',
  },

  optimization: {
    minimizer: !dev
      ? [
          new TerserPlugin({
            extractComments: true,
            terserOptions: {
              ecma: 8,
              output: {
                comments: false,
              },
            },
            parallel: true,
          }),
        ]
      : [],
  },
};


function getConfig(...cfg) {
  return merge(config, ...cfg);
}

const getHtml = (name) => {
  return new HtmlWebpackPlugin({
    title: 'Wexond',
    template: 'static/pages/app.html',
    filename: `${name}.html`,
    chunks: [name],
  });
};

const applyEntries = (config, entries) => {
  for (const entry of entries) {
    config.entry[entry] = [
      `./src/renderer/pre-entry`,
      `./src/renderer/views/${entry}`,
    ];
    config.plugins.push(getHtml(entry));
  }
};

const getBaseConfig = (name) => {
  const config = {
    plugins: [],

    output: {},

    entry: {},

    optimization: {
      runtimeChunk: {
        name: `runtime.${name}`,
      },
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
      },
    },
  };

  return config;
};

module.exports = { getConfig, dev, getHtml, applyEntries, getBaseConfig };
