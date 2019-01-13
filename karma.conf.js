// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'src/js/**/all.js',
      'tests/spec/**/*.js'
    ]
  });
};
