//@author Pramod Rauniyar <pramod.rauniyar@gmail.com>
/*
  For handling the about page , this is just for test
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!template/about'
], function (
  $,
  _,
  Backbone,
  template
) {
  //for rendering about page
  var render = function () {
    var context = {},
        view = template (context),
        main = this;

    this.$el.html(view);

    return this;
  };

  var initialize = function () {
  };
  //main about View method
  var AboutView = Backbone.View.extend ({
    events: {
      
    },
    render: render,
    initialize: initialize

  });

  return AboutView;
});
