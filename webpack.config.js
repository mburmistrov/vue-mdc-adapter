const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const entry = {
  'demo': path.resolve(__dirname,'demo/main.js'),
  'plugin': path.resolve(__dirname,'components/entry.js'),
}

const resolve  = {
  alias: {
    'vue': 'vue/dist/vue.runtime.js',
    'vue-mdc-adapter': entry.plugin
  }
}

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      'import': false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
      plugins: () => [require('autoprefixer')({grid: false})],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: false,
      includePaths: [path.resolve(__dirname,'./node_modules')],
    },
  },
];

const extractStylesRule = {
  test: /\.(css|scss)$/,
  use: ExtractTextPlugin.extract({
    use: cssLoaders,
    fallback: 'style-loader'
  })
}

const loadStylesRule = {
  test: /\.(css|scss)$/,
  use: ['style-loader'].concat(cssLoaders)
}

const rules = [
  {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: { 
      loaders:  ['vue-style-loader'].concat(cssLoaders) 
    }
  }, 
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      path.resolve(__dirname, 'components'),
      path.resolve(__dirname, 'demo'),
      path.resolve(__dirname, 'node_modules/@material')
    ]
  }, 
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    }
  }, 
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    }
  }
]

const plugins = [
  new FriendlyErrorsWebpackPlugin(),

  // create index.html
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'demo/index.html',
    inject: true,
    minify: false,
    chunksSortMode: 'dependency'
  }),

  // first explicit common entries    
  new webpack.optimize.CommonsChunkPlugin({
    names: ['plugin'],
    minChunks: Infinity
  }),
  
  // vendor    
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: function(module){
      return module.context && module.context.indexOf("node_modules") !== -1;
    }
  }),

  // manifest    
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    chuncks: ['vendor']
  }),
  
]

const config = {
  entry,
  resolve,
  module: { rules },
  plugins
};

module.exports = (env) => {

  const prod = env && env.prod

  config.devtool = prod ? 'source-map' : 'cheap-eval-source-map' 
  config.module.rules.push(prod ? extractStylesRule : loadStylesRule)

  
  if (prod) {

    config.output = {
      filename:  '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname,'public'),
    }

    config.resolve.alias.vue= 'vue/dist/vue.runtime.min.js'

    config.plugins.push(
      new CleanWebpackPlugin(config.output.path),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        allChunks: true
      }),
      new CopyWebpackPlugin([ 
        {
          from: path.resolve(__dirname, 'static'),
          to: config.output.path,
          ignore: ['.*']
        }
      ]),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })

    );
  } 
  else {

    config.output = {
      filename:  '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname,'public'),
    }

    config.plugins.push( 
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
    
    config.devServer = {
      contentBase: path.resolve(__dirname, 'static'),
      hot: true
    }
  }

  return config 

}
