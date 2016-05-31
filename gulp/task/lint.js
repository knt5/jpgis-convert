/*
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var config = require('../config/config');
*/

// JavaScript lint
gulp.task('lint:js', function() {
	return gulp.src(config.lint.targets.js)
	.pipe(plumber())
	.pipe(eslint(config.eslint))
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

// Lint all
gulp.task('lint', [
	'lint:js'
]);
