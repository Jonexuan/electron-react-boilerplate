const {
    getConfig,
    applyEntries,
    getBaseConfig,
    dev,
  } = require('./webpack.config.base');
  const { join } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');
  /* eslint-enable */
  
  const PORT = 4444;
  
  const appConfig = getConfig(getBaseConfig('app'), {
    target: 'web',
  
    devServer: {
      contentBase: join(__dirname, 'build'),
      port: PORT,
      hot: true,
      inline: true,
      disableHostCheck: true,
    },
  
    plugins: dev
      ? [
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [],
  });
  
  const extPopupConfig = getConfig({
    target: 'web',
  
    entry: {},
    output: {},
  });
  
  applyEntries(appConfig, [
    "main",
    "apps",
    "appstore",
    "login"
  ]);
  
  if (process.env.ENABLE_EXTENSIONS) {
    extPopupConfig.entry['extension-popup'] = [
      `./src/renderer/views/extension-popup`,
    ];
    extPopupConfig.plugins.push(
      new HtmlWebpackPlugin({
        title: 'Wexond',
        template: 'static/pages/extension-popup.html',
        filename: `extension-popup.html`,
        chunks: [`vendor.app`, 'extension-popup'],
      }),
    );
  
    module.exports = [appConfig, extPopupConfig];
  } else {
    module.exports = appConfig;
  }
  