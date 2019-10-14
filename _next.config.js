const withCSS = require('@zeit/next-css')
const path = require('path')

const withOffline = require('next-offline')
const { ANALYZE } = process.env
if(ANALYZE) {
  const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')
}

module.exports = withOffline(withCSS({
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(
        new WebpackBundleSizeAnalyzerPlugin('stats.txt')
      )
    }
    config.node = {
      fs: 'empty'
    }
    
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext].js',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './.babelrc'),
            },
          },
          'styled-jsx-css-loader',
          'css-loader'
        ],
      }
    );

    return config;
  },
}))