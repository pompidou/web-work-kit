'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('./css/source/sass/style.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./css/build'))
		.pipe(notify({message: 'sass task complete'}));
});
gulp.task('sass:watch', function () {
	gulp.watch('./css/source/sass/**/*.scss', ['sass']);
});

gulp.task('css', function () {
	var processors = [
	];
	return gulp.src('./css/source/postcss/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css/build'));
});

gulp.task('default', function() {
	// place code for your default task here
});
