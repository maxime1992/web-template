'use strict';

module.exports = (gulp, $) => (done) => {
    $.protractor.webdriver_update({}, done);
    gulp.src('protractor/.protractor.spec.js')
      .pipe($.protractor.protractor({
        configFile: 'protractor.conf.js',
        args: ['--baseUrl', `http://127.0.0.1:${$.env.PORT}`]
      }))
      .on('error', e => { throw e })
}
