import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';

module.exports = (env: any, argv: any) => {
  let entry = './src/modules/manychat-lobby/index.tsx';
  let publicPath = 'https://leads.trianglecapital.es/';

  if (env.leads_form_demo) {
    entry = './src/modules/leads-form-demo/index.tsx';
    publicPath = 'https://novafinance.es/';
  } else if (env.solvia_drive_excel) {
    entry = './src/modules/solvia-drive-excel/index.tsx';
    publicPath = 'https://solvia.trianglecapital.es/';
  }

  return {
    mode: (process.env.NODE_ENV as 'production' | 'development' | undefined) ?? 'development',

    entry,

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:5100/' : publicPath,
    },

    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|mp3|wav|ogg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    devServer: {
      port: 5300,
      historyApiFallback: true,
      hot: true,
      open: true,
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),
      new Dotenv({
        path: path.resolve(__dirname, '.env'),
      }),
    ],
  };
};
