"use strict";

let config = {
	outputBase: "dist/",//has to contain trailing slash

	// if you use the glob syntax, files are concatenaten in alphabetical order, to force a specific order, specify a list of files
	cssSource: ['src/css/**/*.css'],
	mainCss: "src/css/style.css",
	ie9Css: "src/css/ie9.css",
	cssOutput: "css/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	cssName: "style.css",

	scriptsSource: ['src/scripts/**/*.js'], // for linting and watching
	startScript: "src/scripts/Script.js", // "main" file from which the bundle is created
	scriptsOutput: "scripts/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	scriptsName: "all.js",

	debug: true
};

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');


gulp.task('scripts', () => {
	const fs = require("fs");
	const browserify = require("browserify");
	const buffer = require('vinyl-buffer');
	const uglify = require('gulp-uglify');
	const source = require('vinyl-source-stream');

	return browserify({
			entries: `${config.startScript}`,
			debug: config.debug
		})
		.transform("babelify", {presets: ["es2015"]})
		.bundle()
		.pipe(source(config.scriptsName))
		.pipe(buffer())
		.pipe(gulpif(!config.debug, uglify()))
		.pipe(gulp.dest(config.outputBase + config.scriptsOutput))
});

gulp.task('lint', () => {
	const jshint = require('gulp-jshint');
	return gulp.src(config.scriptsSource)
		.pipe(plumber())
		.pipe(jshint({ esversion: 6 }))
		.pipe(jshint.reporter('default'));
});

gulp.task('css', (cb) => {
	const postcss = require('gulp-postcss');
	const cleanCSS = require('gulp-clean-css');
	const autoprefixer = require('autoprefixer');
	const precss = require('precss');

	gulp.src(config.ie9Css)
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(config.outputBase + config.cssOutput));

	gulp.src(config.mainCss)
		.pipe(gulpif(config.debug, sourcemaps.init()))
		.pipe(plumber())
		.pipe(postcss([ precss(), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] }) ]) )
		.pipe(cleanCSS({compatibility: 'ie8'}))
		//.pipe(concat(config.cssName))
		//.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput))
	cb();
});

gulp.task('images', () => {
	gulp.src(config.imgSource)
		.pipe(gulp.dest(config.outputBase + config.imgOutput));
});

gulp.task('clean', () => {
	// todo: only remove the files, not the entire folder, probably just need to append /**/*
	del.sync([config.outputBase + "**/*"]);
});

gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));

gulp.task('build', ['clean', 'scripts', 'css']);
gulp.task('default', ['scripts', 'css', 'watch-scripts', 'watch-css']);