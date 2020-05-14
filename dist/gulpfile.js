var exec = require('child_process').exec;
var gulp = require('gulp');
var babel = require('gulp-babel');
var css = require('gulp-clean-css');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var connect = require('gulp-connect');
// copy main.html as is
gulp.task('html', function () {
    return gulp.src('src/html/index.html')
        .pipe(gulp.dest('dist/src/html', { overwrite: true }))
        .pipe(connect.reload());
});
// compile CSS files and move them to the app folder
gulp.task('css', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(css())
        .pipe(gulp.dest('dist/src/css', { overwrite: true }))
        .pipe(connect.reload());
});
// compile JS/TS files and move them to app folder
gulp.task('ts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist', { overwrite: true }))
        .pipe(connect.reload());
});
gulp.task('images', function () {
    return gulp.src('src/assets/*')
        .pipe(gulp.dest('dist/src/assets', { overwrite: true }))
        .pipe(connect.reload());
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/src/fonts', { overwrite: true }));
});
gulp.task('connect', function (callback) {
    connect.server({
        root: 'src',
        livereload: true,
    });
    callback();
});
gulp.task('watch', function (callback) {
    gulp.watch('src/html/*.html', gulp.series('html'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch(['src/components/*.ts', 'src/components/*.tsx'], gulp.series('ts'));
    gulp.watch('src/assets/**/*', gulp.series('images'));
    callback();
});
gulp.task('build', gulp.series('html', 'css', 'ts', 'images', 'fonts'));
// start electron process
gulp.task('start', gulp.parallel('connect', 'watch', gulp.series('build', function () {
    return exec(__dirname + '/node_modules/.bin/electron .')
        .on('close', function () { return process.exit(); });
})));
gulp.task('default', gulp.series('start'));
gulp.task('release', gulp.series('build', function () {
    return exec(__dirname + '/node_modules/.bin/electron-builder -mwl').on('close', function () { return process.exit(); });
}));
