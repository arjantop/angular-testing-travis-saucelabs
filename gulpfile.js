'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    ngmin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    html2js = require('gulp-html2js'),
    concat = require('gulp-concat'),
    size = require('gulp-filesize'),
    protractor = require('gulp-protractor').protractor;

var http = require('http'),
    ecstatic = require('ecstatic');

var files = {
  js: [ 'src/app/app.js' ],
  less: [ 'src/less/**/*.less' ],
  tpl: [ 'src/**/*.tpl.html' ],
  unit: [ 'src/**/*.spec.js' ],
  e2e: [ 'src/**/*.e2e.js' ],
  vendor: [ 'vendor/**' ]
};

var useSaucelabs = process.env.SAUCE_USERNAME !== undefined;

function getKarmaConfig() {
  if(useSaucelabs) {
    return 'karma-saucelabs.conf.js';
  } else {
    return 'karma.conf.js';
  }
}

function getProtractorConfig() {
  if (process.env.TUNNEL_ID !== undefined) {
    return 'protractor-saucelabs.conf.js';
  } else if(useSaucelabs) {
    return 'protractor-travis.conf.js';
  } else {
    return 'protractor.conf.js';
  }
}

gulp.task('lint', function () {
  return gulp.src(files.unit)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test:unit', function () {
  return gulp.src(files.unit)
        .pipe(karma({
          configFile: getKarmaConfig(),
          action: 'run'
        }))
        .on('error', function (err) { throw err; });
});

gulp.task('test:e2e', function () {
  var server = http.createServer(
    ecstatic({ root: 'dist/' })
  ).listen(8000);
  return gulp.src(files.e2e)
        .pipe(protractor({
          configFile: getProtractorConfig()
        }))
        .on('error', function (err) {
          server.close();
          throw err;
        })
        .on('end', function () { server.close(); });
});

gulp.task('test', ['test:unit', 'test:e2e']);

gulp.task('less', function () {
  return gulp.src(files.less)
        .pipe(less({ sourceMap: true }))
        .pipe(gulp.dest('dist/css'))
        .pipe(size());
});

gulp.task('js', function () {
  return gulp.src(files.js, {
          base: 'src/app/',
          read: false
        })
        .pipe(browserify({
          insertGlobals: true,
          debug: true,
          external: ['angular', 'angular-route'],
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/src/app'))
        .pipe(size());
});

gulp.task('static', function () {
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
  gulp.src(files.tpl, { base: 'src/' })
      .pipe(gulp.dest('dist/src'));
  gulp.src(files.vendor, { base: 'vendor/' })
      .pipe(gulp.dest('dist/vendor'));
});

gulp.task('html2js', function () {
  return gulp.src(files.tpl)
        .pipe(html2js({
          outputModuleName: "templates",
          useStrict: true
        }))
        .pipe(concat('templates.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/src'))
        .pipe(size());
});

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('default', ['build'], function () {
  http.createServer(
    ecstatic({ root: 'dist/' })
  ).listen(8080);

  var server = livereload();
  gulp.watch('package.json', ['js']);
  gulp.watch(files.js, ['lint', 'js']);
  gulp.watch(files.less, ['less']);
  gulp.watch(files.unit, ['lint', 'test:unit']);
  gulp.watch(files.tpl, ['static', 'html2js']);
  gulp.watch('src/index.html', ['static']);
  gulp.watch('dist/**').on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('build', ['lint', 'test:unit', 'less', 'js', 'static', 'html2js']);
