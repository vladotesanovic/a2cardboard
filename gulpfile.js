var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemap = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('ts-lint', function() {

	return gulp
		.src(config.allTs)
		.pipe(tslint())
		.pipe(tslint.report('prose', {
			emmitError: false
		}))
});

gulp.task('compile-ts', function() {

	var sourceTsFiles = [
		config.allTs,
		config.typings
	];

	var toResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemap.init())
		.pipe(tsc(tsProject));

	return toResult.js
		.pipe(sourcemap.write('.'))
		.pipe(gulp.dest(config.toOutputhPath));
});


gulp.task('default', ['ts-lint', 'compile-ts']);