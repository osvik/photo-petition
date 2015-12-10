// Include gulp

var gulp = require('gulp'); 

// Include Plugins

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

// Concatenate & Minify CSS

gulp.task('minify-css', function() {
    
    // bootstrap_custom.css or bootstrap_full.css
    gulp.src(['./assets/css/bootstrap_custom.css', './assets/css/style.css' ])
        .pipe(concat('all.css'))
        .pipe(minifycss({keepBreaks:true}))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./assets/css/'));
	
});

// Concatenate & Minify JS

gulp.task('scripts', function() {
	
	// End of bodt scripts: bootstrap_custom.js vs bootstrap_full.js
    gulp.src(['./assets/js/jquery-2.1.4.js', './assets/js/jquery.validate.js', './assets/js/additional-methods.js' ,'./assets/js/scripts.js' ])
        .pipe(concat('body.js'))
        .pipe(uglify())
        .pipe(rename('body.min.js'))
        .pipe(gulp.dest('./assets/js/'));
	
});

// Tasks

gulp.task('default', [ 'minify-css',  'scripts']);
