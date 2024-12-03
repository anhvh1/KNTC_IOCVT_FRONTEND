const {override, addWebpackPlugin} = require('customize-cra');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = function override(config, env) {
  // Đảm bảo rằng entry và output chỉ cần thiết nếu bạn cần tách bundle khác nhau
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/settings/index.js'),
          to: path.resolve(__dirname, 'build/config.js'),
        },
      ],
    }),
  );
  // config.entry = {
  //   main: './src/index.js',
  //   config: './src/configAPI.js', // Thêm entry cho file config.js
  // };
  // config.output = {
  //   ...config.output,
  //   filename: '[name].bundle.js', // Đặt tên file tương ứng với entry
  //   path: path.resolve(__dirname, 'build'),
  // };
  // config.plugins.push(
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       {
  //         from: path.resolve(__dirname, 'src/configAPI.js'),
  //         to: path.resolve(__dirname, 'build/configAPI.js'),
  //       },
  //     ],
  //   }),
  // );
  // return config;

  if (env === 'production') {
    config.devtool = false;
  }
  return config;
};
