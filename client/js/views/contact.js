//@author Pramod Rauniyar <pramod.rauniyar@gmail.com>
/*
  For handling the contact page , this is just for test
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!template/contact'
], function (
  $,
  _,
  Backbone,
  template
) {
  
  //for rendering contact page
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
  var ContactView = Backbone.View.extend ({
    events: {
      
    },
    render: render,
    initialize: initialize

  });

  return ContactView;
});
