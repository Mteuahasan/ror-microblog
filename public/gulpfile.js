var gulp = require('gulp')
var bundler = require('aurelia-bundler')

var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "src/dist/app-bundle": {
      includes: [
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
}

gulp.task('bundle', function() {
 return bundler.bundle(config)
})

gulp.task('unbundle', function() {
 return bundler.unbundle(config)
})
