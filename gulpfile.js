'use strict';

var gulp 				 = require('gulp'),
		sass 				 = require('gulp-sass'),
		sourcemaps	 = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss		 = require('gulp-clean-css'),
		jade				 = require('gulp-jade'),
		concat			 = require('gulp-concat'),
		uglify			 = require('gulp-uglify'),
		imagemin 		 = require('gulp-imagemin'),
    pngquant 		 = require('imagemin-pngquant'),
    clean 			 = require('gulp-rimraf'),
		browserSync	 = require('browser-sync').create();

gulp.task('browser-sync', ['styles', 'scripts', 'jade'], function() {
	browserSync.init({
		server: {
			 baseDir: "./build"
		},
		notify: false
	});
});

gulp.task('clean', function () {
	return gulp.src('./build/**/*.*', {read: false})
		.pipe(clean());
});

gulp.task('styles', function() {
	return gulp.src('./dev/styles/main.sass')
		.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 15 versions'],
				cascade: false
			}))
			.pipe(minifycss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('./dev/makeups/pages/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src('./dev/scripts/modules/*.js')
		.pipe(sourcemaps.init())
			.pipe(concat('main.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	return gulp.src('./dev/assets/img/**/*.*')
		.pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', function() {
	return gulp.src('./dev/assets/fonts/**/*.*')
		.pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', function() {
	gulp.watch('./dev/styles/**/*.sass', ['styles']);
	gulp.watch('./dev/makeups/**/*.jade', ['jade']);
	gulp.watch('./dev/scripts/**/*.js', ['scripts']);
	gulp.watch('./dev/assets/fonts/**/*.*', ['fonts']);
	gulp.watch('./dev/assets/img/**/*.*', ['images'])
	gulp.watch('./build/js/*.js').on('change', browserSync.reload);
	gulp.watch('./build/*.html').on('change', browserSync.reload);
	gulp.watch('./build/css/*.css').on('change', browserSync.reload);
});

gulp.task('default', ['fonts', 'images', 'browser-sync', 'watch']);