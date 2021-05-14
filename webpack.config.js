const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV === 'development'
const isProfile = process.argv.includes('--profile')

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.ts',
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          },
          {
            test: /\.css$/,
            // loader: ,
            use: isDevelopment ? ['style-loader', 'css-loader'] : 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
  },
  plugins: isProfile ? [
    new BundleAnalyzerPlugin()
  ] : undefined
}