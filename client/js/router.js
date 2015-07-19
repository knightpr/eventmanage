// # Router
// @author Pramod Rauniyar <pramod.rauniyar@gmail.com>
// Main Router file

define([
  'jquery',
  'underscore',
  'backbone',
  'views/home',
  'views/about',
  'views/contact'
], function(
  $,
  _,
  Backbone,
  HomeView,
  AboutView,
  ContactView

) {


  // redirect to dashboard.
  var redirectDashboard = function () {
    Backbone.history.navigate('meetspeaker', {
      trigger: true
    });
  };


  // for handling ajax call
  var ajaxCall = function(path,method,cb){
    $.ajax({
      url: '/server/web/'+path,
      method : method,
      contentType: "application/json; charset=utf-8",
      success: function(data){
        //retur to the call back method cb and passing result as a parameter 
        return cb(data);
      }
    });

  };

  //home page view rendering 
  //it listed all the events
  var showHome = function (q) {
    var view = new HomeView();
      ajaxCall('events','GET',function(data){
        view.render({data:data});
          $('#content')
            .empty()
            .append(view.$el);
     });
  };

  //about page rendering
  //just for test
  var showAbout = function (q) {
    var view = new AboutView();
    view.render();
          $('#content')
            .empty()
            .append(view.$el);
  };

  //contact page rendering
  //just for test
  var showContact = function (q) {
    var view = new ContactView();
    view.render();
          $('#content')
            .empty()
            .append(view.$el);
  };
  
  // ### handles all actions not already handled
  var defaultAction = function (action) {
    alert("not such path");

  };

  // ## Main Router Definition
  //
  var AppRouter = Backbone.Router.extend({
    routes: {
      '':                  'showHome',
      'about':                  'showAbout',
      'contact':                 'showContact',
      // Default
      '*action':              'defaultAction'
    },
    showHome : showHome,
    showAbout :showAbout,
    showContact:showContact,
    defaultAction: defaultAction
  });

  var appRouter = null;

  // initialize function
  var initialize = function () {
    var router = new AppRouter();
    Backbone.history.start();
    appRouter = router;
    return router;
  };

  return {
    initialize: initialize
  };
});
