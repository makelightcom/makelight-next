const withOffline = require('next-offline')
const withManifest = require('next-manifest')
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const path = require('path')
const glob = require('glob')

module.exports = withBundleAnalyzer(withManifest(withOffline({
  manifest: {
    // all of manifest properties.
    //...manifestProperties,
    // if src value is exist, icon image will be generated from src image, and ovwewritten
    // icons value exist in the properties. if you want to keep your own icons path? do not pass
    // src path to this plugin
    icons: {
      // source image path, to generate applications icons in 192x192, 512x512 sizes for manifest.
      src: './static/images/makelight-petal-icon-512.png',
      // default is true, cache images until the hash value of source image has changed
      // if false, generating new icon images while every build time.
      cache: true
    }
  },
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
      ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
      ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  },
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}
)))