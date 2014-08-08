define(function (require) {
  // Load dependencies from node_modules from the top of the module ID space.
  var text = require('text');

  // Load any app-specific modules
  // with a relative require call,
  // like:
  require('./route')();
});
