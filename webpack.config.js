/* eslint-disable */

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var TerserPlugin = require('terser-webpack-plugin');

var ENV_DEV = 'development';
var ENV_PROD = 'production';
var ENV_TEST = 'test';

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var env = process.env.NODE_ENV || ENV_DEV;

var isDev = env === ENV_DEV;
var isProd = env === ENV_PROD;
var isTest = env === ENV_TEST;

console.log(env);

var pkg = require('./package.json');
var banner = [
  pkg.name,
  'Version - ' + pkg.version,
  'Author - ' + pkg.author
].join('\n');

var bannerPlugin = new webpack.BannerPlugin(banner);

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(env === ENV_DEV),
  __PROD__: JSON.stringify(env === ENV_PROD),
  __TEST__: JSON.stringify(env === ENV_TEST),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  'process.env.NODE_ENV': '"' +env+ '"'
});


function HashJsonPlugin() {}

HashJsonPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('HashJsonPlugin', function(stats) {
    fs.writeFileSync(
      path.join(__dirname, 'hash.json'),
      JSON.stringify(stats.toJson().assetsByChunkName)
    );
  });
};

function getPlugins(env) {
  var plugins = [definePlugin];
  if (!isProd) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  } else {
    plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
    }));

    plugins.push(new HashJsonPlugin());
    plugins.push(bannerPlugin);
  }
  return plugins;
}


function getEntry(env) {
  var entry = {};
  var entries = [];
  if (env !== ENV_PROD) {
    entry['vendor-react'] = [
      'babel-polyfill',
      'react',
      'react-dom',
      'immutable',
      'draft-js',
    ]
    entries.push('./index');
  } else {
    entries = ['./index'];
  }
  entry['medium-draft'] = entries;
  entry.example = './example';
  entry['basic'] = './basic.scss';
  return entry;
}

function getLoaders(env) {
  var loaders = [];
  loaders.push({
    test: /\.jsx?$/,
    include: APP_DIR,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  });

  // loaders.push({
  //   test: /\.jsx?$/,
  //   loaders: 'eslint-loader',
  //   enforce: "pre",
  //   include: APP_DIR,
  // });

  loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    type: 'asset/resource'
  });

  if (env === ENV_PROD ) {
    loaders.push({
      test: /(\.css|\.scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            implementation: require('sass'),
          },
        },
      ],
    });
  } else {
    loaders.push({
      test: /(\.css|\.scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            implementation: require('sass'),
          },
        },
      ],
    });
  }
  return loaders;
}


var options = {
  context: APP_DIR,
  mode: env,
  devtool: isProd ? false : 'eval-cheap-module-source-map',
  entry: getEntry(env),
  target: 'web',
  output: {
    path: BUILD_DIR,
    publicPath: '/static/',
    filename: '[name].js',
    // filename: env === ENV_DEV ? '[name].js' : '[name].[hash].js',
    chunkFilename: '[id].[hash].bundle.js',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    library: ['MediumDraft'],
    libraryTarget: 'umd',
  },
  plugins: getPlugins(env),
  module: {
    rules: getLoaders(env),
  },
  optimization: {
    splitChunks: isProd ? false : {
      chunks: 'all',
      cacheGroups: {
        common: {
          name: 'common',
          minChunks: 3,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            dead_code: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    modules: [
      APP_DIR,
      'node_modules'
    ],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    devMiddleware: {
      stats: 'normal',
    },
  },
};

if (isProd) {
  options.externals = [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react-transition-group/CSSTransitionGroup': {
        root: ['React', 'addons', 'CSSTransitionGroup'],
        commonjs2: 'react-transition-group/CSSTransitionGroup',
        commonjs: 'react-transition-group/CSSTransitionGroup',
        amd: 'react-transition-group/CSSTransitionGroup',
      }
    },
    {
      immutable: {
        root: 'Immutable',
        commonjs2: 'immutable',
        commonjs: 'immutable',
        amd: 'immutable'
      }
    },
    {
      'draft-js': {
        root: 'Draft',
        commonjs2: 'draft-js',
        commonjs: 'draft-js',
        amd: 'draft-js'
      }
    }
  ];
}

var appExportType = process.env.APP_EXPORT_TYPE || '';

if (appExportType === 'exporter') {
  console.log('Building HTML Exporter');
  options.entry = {
    'medium-draft-exporter': './exporter',
  };
  options.output.library = 'MediumDraftExporter';
  options.externals.push({
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs2: 'react-dom/server',
      commonjs: 'react-dom/server',
      amd: 'react-dom/server'
    }
  });
  options.externals.push({
    'draft-convert': {
      root: 'DraftConvert',
      commonjs2: 'draft-convert',
      commonjs: 'draft-convert',
      amd: 'draft-convert'
    }
  });
}

module.exports = options;
