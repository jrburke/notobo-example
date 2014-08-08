## notobo-example

An example project that uses npm and [notobo](https://github.com/jrburke/notobo)
for front-end browser dependencies. It uses [requirejs](http://requirejs.org) to
handle front-end module loading.

## Project structure

This web project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * app.js - the top-level config script used by index.html
    * app/ - the directory to store project-specific scripts.
    * node_modules/ - the directory to hold third party module packages.
* tools/ - tools around managing the project. Includes the build optimization
configuration to pass to the
[requirejs optimizer](http://requirejs.org/docs/optimization.html).

Once optimization is done, it will create a **www-built** directory as a sibling
to **www**.

The use of npm is two-fold in this project:

* At the top level, to handle build/optimization tools. notobo is not used here
since Node will be used to run command line programs. The code is not used in
the browser front end.
* In **www**, to handle the front end dependencies. This is where notobo would
be used, since it preps the node_modules packages to be usable in the browser.

## Suggested workflow

1) Get a snapshot of this project:

* Fetch https://github.com/jrburke/notobo-example/archive/master.zip
* If using [volo](http://volojs.org/): `volo create proj jrburke/notobo-example`

2) `npm install` in the root of the directory, to set up the build tools.

3) `npm run-script build` in the root of the directory to generate the optimized
**www-built** directory.

4) To add front end dependencies via npm:

* `cd www`
* `npm install --save ...` for any packages you want to use in www. This will
install them in **www/node_modules**.
* `npm run-script notobo` to update the dependencies to be usable for the
browser.

Commit anything new in **www/node_modules** to your source control system. It is
typical for front end dependencies to be committed with the project, and it
avoids a whole set of problems depending on a registry and network connection to
set up the code for things like automated testing and deployment, and it gives
a reliable way to fix the versions of dependencies used in the code.

If you do not want to commit ***www/node_modules** to source control, set up
something in the top level project automation to do the right combination of npm
install, dedupe, shrinkwrap, then run notobo over it at the end.

## Default example notes

This project is set up by default to have the
[requirejs-text](https://github.com/requirejs/text) loader plugin installed, and
the `app/routes` module shows how dynamic loading of a view could work, using
URL fragment IDs, for a single page web app.

This example is just a simple demonstration of the type of app construction that
is possible with a proper module system and loader that works with the network
IO in the browser, and it not possible with the default module system used in
Node.

However, it is very simplistic. In a real app, instead of just loading the HTML
template for each URL fragment ID, you would likely dynamically dispatch to
a view module, which would then also use one or more HTML templates.

The build optimizes the main app module, but does not optimize views because
right now the views are just one resource, the HTML template. However, in a
fancier example, you could put in more `modules` build config in
**tools/build.js** for each subview, and add an `exclude: ['app']` property to
those subview build layers to exclude the modules built into the main app build
layer.

For your app, you can remove any of the example modules, the
**www/node_modules** directory, and then reset the dependencies in
**www/package.json** if you want to start fresh.
