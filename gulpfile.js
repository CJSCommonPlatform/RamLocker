const gulp = require('gulp');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');
const runSequence = require('run-sequence');


gulp.task('test-e2e', () =>
    gulp.src('test/e2e/*.e2e.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
);

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
gulp.task('test', ['build'], cb => {
    runSequence('test-e2e', cb);
});