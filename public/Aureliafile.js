var cli = require('aurelia-cli');

var bundleCfg = {
  js: {
    "src/dist/app-bundle": {
      modules: [
        '*',
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-templating-binding',
        'aurelia-templating-resources',
        'aurelia-templating-router',
        'aurelia-loader-default',
        'aurelia-history-browser',
        'aurelia-auth'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

cli.command('bundle', bundleCfg);
cli.command('unbundle', bundleCfg);
