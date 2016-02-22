module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'src/app/**/*.spec.js'
    ]
  });
};
