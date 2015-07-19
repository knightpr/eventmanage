//@author Pramod Rauniyar <pramod.rauniyar@gmail.com>
/*
  For handling the events mechnism (lisinting, creating, updating and deleting)
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'moment',
  'bootbox',
  'hbs!template/home',
  'hbs!template/eventform',
  'hbs!template/singleEvent',
  'jquery.dtp',
  'jquery.validate',
], function (
  $,
  _,
  Backbone,
  bootstrap,
  moment,
  bootbox,
  template,
  templateEventForm,
  templateEventSingle
 
) {
    //for handling the ajax call                 
  var ajaxCall = function(path,method,data,cb){
    $.ajax({
      url: '/server/web/'+path,
      method : method,
      data: data,
      dataType: 'json',
      success: function(data){
        //retur to the call back method cb and passing result as a parameter 
        return cb(data);
      }
    });

  };
  //for getting locally stored event data
  var getLocalEventData = function(id){
    return JSON.parse(localStorage.getItem('event-'+id));
  };
  // this is main rendering method for rendering the event home page
  var render = function (options) {
      var noeventyet = true;
      $.each(options.data, function( index, value ) {
          noeventyet = false;
          console.log(options.data[index]['start_datetime']); 
          options.data[index]['start_datetime'] = moment(options.data[index]['start_datetime']).format('YYYY-MM-DD HH:mm');
          options.data[index]['end_datetime'] = moment(options.data[index]['end_datetime']).format('YYYY-MM-DD HH:mm');
          //storing event detail into the local storage 
          localStorage.setItem('event-'+value.id,JSON.stringify(options.data[index]));
      });
      var context = {events:options.data,noeventyet:noeventyet};
      //generating the rendered html template
      var view = template (context);
      //adding home page template to main content element 
      this.$el.html(view);
  
    _.defer(function(){
        //handling redering of, if it is your first event or not      
        toggleFirstEvent(noeventyet);
    });

    return this;
  };

  //Handling event remove
  var removeEvent = function(id){

     ajaxCall('events/'+id,'DELETE',{},function(data){
        $('tr[data-id='+id+']').remove();
        var v = ($('#table-event-list tbody tr').length > 0) ? false :true; 
         toggleFirstEvent(v); 
     });

  };
  //Handling if it is your first event
  var toggleFirstEvent = function(noevent){
     if(noevent){
        $('#table-event-list').hide();
        $('.noevent').show();
     }else{
      $('#table-event-list').show();
      $('.noevent').hide();
     }
      
  };

  //Handling event update
  var updateEvent = function(id){
    var context = {event:getLocalEventData(id)};
    bootbox.dialog(
            {
                title: "Update Event",
                message: templateEventForm(context),
                buttons: {
                    success: {
                        label: "Confirm",
                        className: "btn-success",
                        callback: function (e) {
                          $("#form-event-update").validate();

                          if(!$("#form-event-update").valid())
                            return false;
          
                          var s = $("#event-start-dt").val();
                          var e = $("#event-end-dt").val();
                          var n = $("#event-name").val();
                          var d = $('#event-description').val();
                          var isafter = moment(e).isAfter(moment(s));
                          if(!isafter){
                              bootbox.alert("Invalid event start and end time!");
                              return false;
                          }else{
                             var data= {
                                  name: n,
                                  description:d,
                                  start_datetime: s,
                                  end_datetime : e
                            };

                             ajaxCall('events/'+id,'PUT',data,function(data){
                                if(data){
                                    var s = moment(data.start_datetime).format('YYYY-MM-DD HH:mm');
                                    var e = moment(data.end_datetime).format('YYYY-MM-DD HH:mm');
                                     $('tr[data-id='+id+'] .event-title').html(data.name);
                                     $('tr[data-id='+id+'] .event-date').html(s+' - '+e);
                                     $('tr[data-id='+id+'] .event-description').html(d);
                  
                                }
                                bootbox.hideAll();
                                 return true;
                             });
                             return false;
                          }
                            
                        }
                    },
                    main: {
                      label: "Close",
                      className: "btn-default",
                      callback: function() {
                        return true;
                      }
                    }
                }
            });
     //inilializing datetimepicker and setting time step for 20 minutes
     $("#event-start-dt").datetimepicker({format:'Y-m-d H:i',step:20});
     $("#event-end-dt").datetimepicker({format:'Y-m-d H:i',step:20});
  };

  //Handling event create
  var createEvent = function(){
    var context = {};
    bootbox.dialog(
            {
                title: "New Event",
                message: templateEventForm(context),
                buttons: {
                    
                    success: {
                        label: "Create",
                        className: "btn-success",
                        callback: function (e) {
                          $("#form-event-update").validate();

                          if(!$("#form-event-update").valid())
                            return false;
          
                          var s = $("#event-start-dt").val();
                          var e = $("#event-end-dt").val();
                          var n = $("#event-name").val();
                          var d = $('#event-description').val();

                          var isafter = moment(e).isAfter(moment(s));
                          if(!isafter){
                              bootbox.alert("Invalid event start and end time!");
                              return false;
                          }else{
                             var data= {
                                  name: n,
                                  start_datetime: s,
                                  end_datetime : e,
                                  description :d
                            };
                             ajaxCall('events','POST',data,function(data){
                              
                                if(data){
                                     $('#table-event-list tbody').append(templateEventSingle(data));
                                     localStorage.setItem('event-'+data.id,JSON.stringify(data));
                                     bootbox.hideAll();

                                }
                                 toggleFirstEvent(false);
                                 return true;
                             });
                             return false;
                          }
                            
                        }
                    },
                    main: {
                      label: "Close",
                      className: "btn-default",
                      callback: function() {
                        return true;
                      }
                    }
                }
            });
     //inilializing datetimepicker and setting time step for 20 minutes
     $("#event-start-dt").datetimepicker({format:'Y-m-d H:i',step:20});
     $("#event-end-dt").datetimepicker({format:'Y-m-d H:i',step:20});
  };
  var initialize = function () {
  };
  //Main Event Home view method
  var HomeView = Backbone.View.extend ({
    //handling all click events
    events: {
        "click .btn-edit-event": "doEdit",
        "click .btn-remove-event": "doRemove",
        "click .btn-new-event": "doCreate"
    },
    //to create new event
    doCreate: function(e){
      createEvent();
      return false;
    },
    //to edit selected event
    doEdit : function(e){
      var id = $(e.target).closest('a').attr('data-id');
      updateEvent(id);
      return false;
    },
    //to remove selected event
    doRemove : function(e){
      var id = $(e.target).closest('a').attr('data-id');
      bootbox.dialog({
        message: "Are you sure to remove this event?",
        title: "Removing Event..",
        buttons: {
          success: {
            label: "Cancle!",
            className: "btn-default",
            callback: function() {
              return true;
            }
          },
          danger: {
            label: "Remove",
            className: "btn-danger",
            callback: function() {
              removeEvent(id);
            }
          }
        }
      });
      return false;

    },
    render: render,

    initialize: initialize
  });

  return HomeView;
});
