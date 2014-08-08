/*jshint browser: true */
define(function (require) {
  var defaultTemplate = 'welcome';

  function routeChanged(evt) {
    var template = location.hash.replace(/^#/, '');
    if (!template) {
      template = defaultTemplate;
    }

    // All templates are loaded relative to this module.
    template = template = './routes/' + template + '.html';

    require(['text!' + template], function(text) {
      document.body.innerHTML = text;
    });
  }

  return function route() {
    routeChanged();
    window.addEventListener('hashchange', routeChanged, false);
  };
});
