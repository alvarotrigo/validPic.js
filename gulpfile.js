var gulp = require('gulp');
var gp_rename = require('gulp-rename');
var gp_sourcemaps = require('gulp-sourcemaps');
var gp_uglify = require('gulp-uglify');
var gp_minify_css = require('gulp-minify-css');
var gp_concat = require('gulp-concat');

gulp.task('js', function() {
    gulp.src([
        './validPic.js'
    ])
        .pipe(gp_sourcemaps.init())
        .pipe(gp_uglify({
            preserveComments: 'license'
        }))
        .pipe(gp_rename({suffix: '.min'}))
        .pipe(gp_sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['js']);