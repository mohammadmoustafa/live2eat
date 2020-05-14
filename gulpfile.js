const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const connect = require('gulp-connect');

// copy main.html as is
gulp.task('html', () => {
  return gulp.src('src/html/index.html', {base: './'})
    .pipe(gulp.dest('dist', {overwrite: true}))
    .pipe(connect.reload());
});

// compile CSS files and move them to the app folder
gulp.task('css', () => {
  return gulp.src(['src/css/*.css'], {base: './'})
    .pipe(css())
    .pipe(gulp.dest('dist', {overwrite: true}))
    .pipe(connect.reload());
});

// compile JS/TS files and move them to app folder
gulp.task('ts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist', {overwrite: true}))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp.src('src/assets/*', {base: './'})
    .pipe(gulp.dest('dist', {overwrite: true}))
    .pipe(connect.reload());
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/*', {base: './'})
    .pipe(gulp.dest('dist/src/fonts', {overwrite: true}));
});

gulp.task('connect', (callback) => {
  connect.server({
    root: 'src',
    livereload: true,
  });
  callback();
});

gulp.task('watch', (callback) => {
  gulp.watch('src/html/*.html', gulp.series('html'));
  gulp.watch('src/css/*.css', gulp.series('css'));
  gulp.watch(['src/components/*.ts', 'src/components/*.tsx'], gulp.series('ts'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
  callback();
});

gulp.task('build', gulp.series('html', 'css', 'ts', 'images', 'fonts'));

// start electron process
gulp.task('start', gulp.parallel('connect', 'watch', gulp.series('build',
  () => {
    return exec(__dirname + '/node_modules/.bin/electron .')
      .on('close', () => process.exit());
})));

gulp.task('default', gulp.series('start'));

gulp.task('release', gulp.series('build', () => {
  return exec(
    __dirname + '/node_modules/.bin/electron-builder -mwl'
  ).on('close', () => process.exit());
}))