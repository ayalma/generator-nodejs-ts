/**
 * Created by ali on 7/1/17.
 */
const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require("gulp-nodemon");

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
        return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch'],function () {
    return nodemon({
        script: 'dist/server.js',
    })
        .on('restart', function(){
            console.log('restarted');
        })
});
