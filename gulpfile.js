// Load plugins

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync'),
    header = require('gulp-header');
    browserReload = browserSync.reload;

/* MINIFY CSS
   Run this in the root directory of the project with 
   gulp minify-css
   Will output minified filesize both with and without gzip
*/

gulp.task('minify-css', function(){
  gulp.src('./css/fluidity.css') // set this to the file(s) you want to minify. 
    .pipe(minifyCSS())
    .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
    .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
    .pipe(header('/*!mrmrs/fluidity v<%= pkg.version %> (c)2014 @license <%= pkg.license %>')
    .pipe(rename('fluidity.min.css'))
    .pipe(gulp.dest('./css/'));
});


/* 
   IMAGE MINIFICATION 
   This will minify all images in the img directory. Run with 
   gulp minify-images 
*/

gulp.task('minify-images', function(){
  gulp.src('./img/*')
     .pipe(size({gzip: false, showFiles: true, title:'original image size'}))
     .pipe(size({gzip: true, showFiles: true, title:'original image size'}))
     .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
      }))
      .pipe(size({gzip: false, showFiles: true, title:'minified images'}))
      .pipe(size({gzip: true, showFiles: true, title:'minified images'}))
      .pipe(gulp.dest('./img')); // change the dest if you don't want your images overwritten
});

// JS Hint that code
// Run this in the root directory of the project with `gulp js-hint`
gulp.task('js-hint', function(){
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('stylish'));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function(){
  gulp.src('./css/fluidity.css')
    .pipe(csslint({
          'compatible-vendor-prefixes': false,
          'box-sizing': false,
          'important': false,
          'known-properties': false
        }))
    .pipe(csslint.reporter());
});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./sass/fluidity.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass())
          .pipe(size({gzip: false, showFiles: true, title:'without vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title:'without vendor prefixes'}))
          .pipe(prefix())
          .pipe(size({gzip: false, showFiles: true, title:'after vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title:'after vendor prefixes'}))
          .pipe(gulp.dest('css'))
          .pipe(browserSync.reload({stream:true}));
      }));
});

// Initialize browser-sync which starts a static server also allows for 
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/*
   DEFAULT TASK

 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['pre-process', 'minify-css', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process', 'csslint');
  gulp.watch('sass/*.scss', ['pre-process', 'minify-css']);
  gulp.watch('css/fluidity.css', ['bs-reload', 'minify-css']);
  gulp.watch('*.html', ['bs-reload']);
});

