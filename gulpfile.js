const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const del = require('del');
const runSequence = require('run-sequence');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const assetsDir = path.resolve(__dirname, 'assets');

gulp.task('default', (done) => {
  runSequence('del', ['pug', 'sass', 'js', 'assets'], done);
});

gulp.task('watch', () => gulp.watch(srcDir + '/**/*', ['default']));

gulp.task('pug', () => {
  return gulp.src(srcDir + '/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(distDir));
});

gulp.task('sass', () => {
  return gulp.src(srcDir + '/*.sass')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest(distDir));
});

gulp.task('js', () => {
  return gulp.src(srcDir + '/*.js')
    .pipe(gulp.dest(distDir));
});

gulp.task('del', () => {
  return del(distDir + '/**/*');
});

gulp.task('assets', () => {
  return gulp.src(assetsDir + '/**/*')
    .pipe(gulp.dest(distDir));
});
