module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
   	  'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/assets/app_components/app/app.js',
      'src/assets/app_components/app/tests/**/*.js'
    ]
  });
};
