// Load plugins

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    lr    = require('tiny-lr'),
    server = lr(),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    csslint = require('gulp-csslint'),
    size = require('gulp-size');


// Task to minify all css files in the css directory
gulp.task('minify-css', function(){
  gulp.src('./css/*.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(gulp.dest('./css/'));
});

// Reload html
gulp.task('reload', function(){
  gulp.src('*.html')
    .pipe(watch(function(files) {
      return files.pipe(livereload(server));
    }));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function(){
  gulp.src('./css/*.css')
    .pipe(csslint({
          'compatible-vendor-prefixes': false,
          'box-sizing': false,
          'important': false
        }))
    .pipe(csslint.reporter());

});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./sass/fluidity.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass({loadPath: ['./sass/'], style: "compact"}))
          .pipe(prefix())
          .pipe(gulp.dest('./css/'))
          .pipe(livereload(server));
      }));
});

/*
   DEFAULT TASK

 • Process sass and lints outputted css
 • Outputted css is run through autoprefixer
 • Sends updates to any files in directory to browser for
   automatic reloading

*/
gulp.task('default', function(){
  server.listen(35729, function (err) {
    gulp.watch(['*.html', './sass/*.scss'], function(event) {
      gulp.run('reload', 'pre-process', 'csslint');
    });
  });
});

gulp.task('production', function(){
    gulp.run('minify-css');
     return gulp.src('css/fluidity.min.css')
        .pipe(size())
        .pipe(gulp.dest('css'));
});

