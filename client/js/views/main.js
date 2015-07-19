//@author Pramod Rauniyar <pramod.rauniyar@gmail.com>
/*
  For rendering main structure of the application like header, empty body and footer etc
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!template/main'
], function (
  $,
  _,
  Backbone,
  template
) {

  // rendering the layout
  var render = function () {
    var context = {},
        view = template (context),
        main = this;

    this.$el.html(view);

    return this;
  };


  //initialize the view
  var initialize = function () {
  };


  var MainView = Backbone.View.extend ({
    el: $('#main'),

    events: {
      
    },
    render: render,
    initialize: initialize

  });

  return MainView;
});
