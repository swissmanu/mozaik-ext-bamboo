var gulp         = require('gulp')
    , del        = require('del')
    , rename     = require('gulp-rename')
    , babel      = require('gulp-babel')
    , plumber    = require('gulp-plumber')
    , replace    = require('gulp-regex-replace')
    , stripDebug = require('gulp-strip-debug');

gulp.task('lib-clean', function (done) {
    del('./lib', done);
});

gulp.task('lib-compile', [ 'lib-clean' ], function(){
    return gulp.src([
            './src/**/*.js',
            './src/**/*.jsx',
            '!./src/preprocessor.js',
            '!./src/__tests__/**'
        ])
        .pipe(plumber())
        .pipe(babel({}))
        .pipe(replace({regex: "\\.jsx", replace: ''}))
        .pipe(rename({ extname: '.js' }))
        //.pipe(stripDebug())
        .pipe(gulp.dest('./lib'))
    ;
});

gulp.task('lib', ['lib-clean', 'lib-compile']);