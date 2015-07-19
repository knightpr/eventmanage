// Filename: main.js
//@author Pramod Rauniyar <pramod.rauniyar@gmail.com>

// require configurations
// modules are named after file names (without the '.js' extension)
// starting from this file directory.

require.config({
  // for 3rd party libraries, shorthands are defined in
  // paths (this object is used if the file cannot be found in the
  // root directory.
  paths: {
    'jquery': 'libs/jquery/jquery-1.9.1',
    'jquery.validate': 'libs/jquery/jquery.validate',
    'jquery.dtp': 'libs/jquery/jquery.datetimepicker',
    'underscore': 'libs/underscore/underscore',
    'backbone': 'libs/backbone/backbone',
    'moment': 'libs/moment/moment',
    'handlebars': 'libs/handlebars',
    'bootstrap': 'libs/bootstrap/bootstrap',
    'bootbox' :'libs/bootstrap/bootbox',
    'i18nprecompile': 'libs/require/i18nprecompile',
    'hbs': 'libs/require/hbs',
    'template': '../template'
  }
  // shims are used to adapt imports/exports of 3rd party libraries
  //  + dependencies
  ,shim: {
    'jquery': {
      exports: 'jQuery'
      // exports: 'Zepto'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'bootstrap': ['jquery'],
    'moment': ['jquery'],
    'bootbox': ['jquery', 'bootstrap'],
    }
  // hbs config
  ,hbs: {
    disableI18n: true,
    templateExtension: "hbs",
    compileOptions: {}
  }
});

// # Main
// this is the entry point
require([
  'jquery', 'app'
], function ($, App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
