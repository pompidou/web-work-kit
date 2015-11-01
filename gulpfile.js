'use strict';

var addsrc = require('gulp-add-src');
var autoprefixer = require('autoprefixer');
var browsersync = require('browser-sync');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var cssnext = require('cssnext');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
// var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var precss = require('precss');
var rename = require('gulp-rename');
var rubysass = require('gulp-ruby-sass');
// var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var webp = require('gulp-webp');

gulp.task('css', function () {
	var processors = [
		cssnext,
		precss,
		autoprefixer({browsers: ['last 2 versions']})
	];
	return gulp.src('./css/source/postcss/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css/build'))
		.pipe(addsrc.prepend('./css/source/vendor/**/*.css'))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./css/build'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css/build'))
		.pipe(notify({message: 'css task complete'}));
});

gulp.task('sass', function() {
	return rubysass('./css/source/sass/style.scss', {style: 'expanded'})
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./css/build'))
		.pipe(addsrc.prepend('./css/source/vendor/**/*.css'))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./css/build'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css/build'))
		.pipe(notify({ message: 'sass task complete' }));
});
// gulp.task('sass', function () {
// 	gulp.src('./css/source/sass/style.scss')
// 		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
// 		.pipe(gulp.dest('./css/build'))
// 		.pipe(notify({message: 'sass task complete'}));
// });

gulp.task('javascript-app', function () {
	return gulp.src([
			'./javascript/source/app/App.js',
			'./javascript/source/main.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./javascript/build'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./javascript/build'))
		.pipe(notify({message: 'javascript task complete'}));
});

gulp.task('javascript-vendor', function () {
	// TODO
});

gulp.task('images', function() {
	return gulp.src('./imagery/source/**/*')
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest('./imagery/build'))
		.pipe(notify({message: 'images task complete'}));
});

gulp.task('images-webp', function () {
	return gulp.src('./imagery/source/**/*.{gif,jpg,png}')
		.pipe(webp())
		.pipe(gulp.dest('./imagery/build'))
		.pipe(notify({message: 'images-webp task complete'}));
});

gulp.task('clean', function(callback) {
	del(['./css/build', './javascript/build', './imagery/build'], callback);
});

gulp.task('browsersync', function() {
	browsersync({server: {baseDir: './'}});
});

gulp.task('watch', ['browsersync'], function() {
	gulp.watch('./css/source/**/*', ['css']);
	gulp.watch('./javascript/source/**/*', ['javascript-app']);
	gulp.watch('./imagery/source/**/*', ['images']);
	// livereload.listen();
	// gulp.watch(['./css/build/**/*', './javascript/build/**/*', './imagery/build/**/*']).on('change', livereload.changed);
	gulp.watch(['./css/build/**/*', './javascript/build/**/*', './imagery/build/**/*']).on('change', browsersync.reload);
});

gulp.task('default', ['clean'], function() {
	gulp.start('css', 'javascript-app', 'images');
});
