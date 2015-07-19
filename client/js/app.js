// Application Entry Point
// @author Pramod Rauniyar <pramod.rauniyar@gmail.com>

define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'views/main'

], function(
  $,
  _,
  Backbone,
  Router,
  MainView
){

  var initialize = function () {
    var main_view = new MainView();
    main_view.render();
    Router.initialize();
  };

  return {
    initialize: initialize
  };
});
