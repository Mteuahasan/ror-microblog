var cli = require('aurelia-cli');

var bundleCfg = {
  js: {
    "src/dist/app-bundle": {
      modules: [
        '*',
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'npm:aurelia-templating-binding',
        'npm:aurelia-templating-resources',
        'npm:aurelia-templating-router',
        'npm:aurelia-loader-default',
        'npm:aurelia-history-browser'
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
