const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const connect = require('gulp-connect');

// copy html as is
gulp.task('html', () => {
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('dist/html/', { base: '.' }))
    .pipe(connect.reload());
});

// compile CSS files and move them to the app folder
gulp.task('css', () => {
  return gulp.src(['src/css/*.css'])
    .pipe(css())
    .pipe(gulp.dest('dist/css/', { base: '.' }))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp.src(['src/js/*.js', 'src/js/*.ts'])
    .pipe(babel())
    .pipe(gulp.dest('dist/js', { base: '.' }))
    .pipe(connect.reload());
})

gulp.task('ts', () => {
  return gulp.src('main.ts')
    .pipe(babel())
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('tsx', () => {
  return gulp.src('src/components/*.tsx')
    .pipe(babel())
    .pipe(gulp.dest('dist/components/', { base: '.' }))
    .pipe(connect.reload());
});

// // compile JS/TS files and move them to app folder
// gulp.task('ts', () => {
//   return tsProject.src()
//     .pipe(tsProject())
//     .js
//     .pipe(gulp.src(['src/js/*.js'], {base: './'}))
//     .pipe(gulp.dest('dist', {overwrite: true}))
//     .pipe(connect.reload());
// });

gulp.task('images', () => {
  return gulp.src('src/assets/*')
    .pipe(gulp.dest('dist/assets/', { base: '.' }))
    .pipe(connect.reload());
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts/', { base: '.' }));
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
  gulp.watch('main.ts', gulp.series('ts'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/components/*.tsx', gulp.series('tsx'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
  callback();
});

gulp.task('build', gulp.series('html', 'css', 'js', 'ts', 'tsx', 'images', 'fonts'));

// start electron process
gulp.task('start', gulp.parallel('connect', 'watch', gulp.series('build',
  () => {
    return exec(__dirname + '/node_modules/.bin/electron .')
      .on('close', () => process.exit());
})));

gulp.task('default', gulp.series('start'));

gulp.task('release', gulp.series('build', () => {
  return exec(
    __dirname + '/node_modules/.bin/electron-builder --macos'
  ).on('close', () => process.exit());
}))