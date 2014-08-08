// Configure loading modules from the node_modules directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: 'node_modules',
  paths: {
    app: '../app'
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
