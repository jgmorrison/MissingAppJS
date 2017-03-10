var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {

    browserSync.init({
        server: "./src/html",
	port: 3000
    });

    gulp.watch("src/html/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
