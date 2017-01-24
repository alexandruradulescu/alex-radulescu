"use strict";

let config = {
	outputBase: "dist/",//has to contain trailing slash
	
	// if you use the glob syntax, files are concatenaten in alphabetical order, to force a specific order, specify a list of files
	cssSource: ['src/css/**/*.css', 'src/scripts/appstract-scripts/components/css/**.css'],
	cssOutput: "css/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	cssName: "style.css",
	
	scriptsSource: ['src/scripts/**/*.js'], // for linting and watching
	startScript: "src/scripts/Script.js", // "main" file from which the bundle is created
	scriptsOutput: "scripts/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	scriptsName: "all.js",

	imgSource: ["src/images/**/*"],
	imgOutput: "images",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)	

	debug: true
};

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');


///////
// ALTERNATIVE SCRIPTS TASK USING WATCHIFY
// const watchify = require('watchify');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
// const uglify = require('gulp-uglify');

// const bundle = () => {
// 	console.log( "rebundle start..." );
// 	return bundler.bundle(() => {
// 			console.log( "rebundled!" );
// 		})
// 		.on('error', (a, b, c) => { console.log("error: ", a, b, c); } )
// 		.pipe(source(config.scriptsName))
// 		.pipe(buffer())
// 		.pipe(gulpif(!config.debug, uglify()))
// 		.pipe(gulp.dest(config.outputBase + config.scriptsOutput));
// };


// const bundler = watchify(browserify({
// 			entries: `${config.startScript}`,
// 			debug: config.debug
// 		}));
// 	bundler.transform("babelify", { presets: ["es2015"] });

// 	gulp.task('js', bundle);
// 	bundler.on('update', bundle);

///////

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
		.pipe(gulp.dest(config.outputBase + config.scriptsOutput));
});

gulp.task('lint', () => {
	const jshint = require('gulp-jshint');
	return gulp.src(config.scriptsSource)
		.pipe(jshint({ esversion: 6 }))
		.pipe(jshint.reporter('default'));
});

gulp.task('css', (cb) => {
	const postcss = require('gulp-postcss');
	const cleanCSS = require('gulp-clean-css');
	const autoprefixer = require('autoprefixer');

	gulp.src(config.cssSource)
		//.pipe(gulpif(config.debug, sourcemaps.init()))
		.pipe(postcss([ autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] }) ]) )
		.pipe(concat(config.cssName))
		//.pipe(cleanCSS({compatibility: 'ie8'}))
		//.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput));
	cb();
});

gulp.task('images', () => {
	gulp.src(config.imgSource)
		.pipe(gulp.dest(config.outputBase + config.imgOutput));
});

gulp.task('clean', (cb) => {
	// todo: only remove the files, not the entire folder, probably just need to append /**/*
	del.sync([config.outputBase]);
	cb();
});

gulp.task('set-production', (cb) => {config.debug = false; cb(); });
gulp.task('set-development', (cb) => {config.debug = true; cb(); });

gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));
gulp.task('watch-images', () => gulp.watch(config.imgSource, ['images']));

gulp.task('build', ['clean', 'set-production', 'scripts', 'css', 'images', 'set-development']); // PRODUCTION
gulp.task('default', ['clean', 'scripts', 'css', 'images', 'watch-scripts', 'watch-css', 'watch-images']); // DEVELOPMENT
