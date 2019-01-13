var gulp = require('gulp'),
    Server = require('karma').Server,
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var originPaths = {
  "developmentComponents": "development/**/*.component.js",
  "developmentScripts": "development/**/*.payload.js",
  "developmentStyles": "development/**/*.scss",
  "htmlRoot": "development/root.html",
  "scriptsDest": "src/js",
  "stylesDest": "src/css"
};

gulp.task('default', ['copy-html', 'styles', 'lint', 'scripts'], function() {
  gulp.watch(originPaths.developmentStyles, ['styles']);
  gulp.watch([originPaths.developmentComponents, originPaths.developmentScripts], ['lint', 'scripts']);
  gulp.watch(originPaths.htmlRoot, ['copy-html']);
  gulp.watch([
    'index.html',
    originPaths.developmentScripts,
    originPaths.developmentComponents,
    originPaths.developmentStyles
  ]).on('change', browserSync.reload);

  browserSync.init({
      ui: {
       port: 8080
      },
      server: './'
  });
});

gulp.task('deploy', [
  'copy-html',
  'styles',
  'lint',
  'scripts-deploy'
]);

gulp.task('scripts', function() {
  gulp.src(originPaths.developmentComponents)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(originPaths.scriptsDest));
  gulp.src(originPaths.developmentScripts)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(originPaths.scriptsDest));
});

gulp.task('scripts-deploy', function() {
  gulp.src(originPaths.developmentComponents)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(originPaths.scriptsDest));
  gulp.src(originPaths.developmentScripts)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(originPaths.scriptsDest));
});

gulp.task('copy-html', function() {
  gulp.src(originPaths.htmlRoot)
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  gulp.src(originPaths.developmentStyles)
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(originPaths.stylesDest));
});

gulp.task('lint', function () {
  return gulp.src([originPaths.developmentScripts, originPaths.developmentComponents])
    .pipe(eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        'modules': true
      },
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false
      },
      rules: {
        'camelcase': 1,
        'comma-dangle': 2,
        'quotes': 0,
        'semi': 1,
        'indent': ['error', 2]
      },
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
  });

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});
