module.exports = (gulp, $) => () =>
  gulp.src('src/**/*')
    	.pipe($.connect.reload());
