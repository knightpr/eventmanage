<?php
/* This includes main Event Controller Class.
   It hanldes all the listing, showing, creating, updating and deleting the event.

 * @author Pramod Rauniyar
 
 * Controller/EventsController.php
*/
namespace app\Controller;
use app\Model\Event;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

// class EventsController
class EventsController
{
    //index action returning all the events
    //Request: GET /events
    public function index(Request $request, Application $app) {
         $sql = "SELECT * FROM events";
         $post = $app['dbconn'] ->fetchAll($sql);

         $app['monolog']->addDebug('Listing events');
         return $app->json($post, 201);
    }

    //returning event detail by id
    //Request GET /events/{id}
    public function show($id,Request $request, Application $app) {
    	$event = new Event($app['dbconn']);
    	if($event->isEventExist($id)){
			$error = array("message"=>"Event {$id} does not exist."); 
			return $app->json($error,403);
    	}
    	
	     $sql = "SELECT * FROM events where id= ?";
	     $post = $app['dbconn'] ->fetchAssoc($sql, array((int) $id));

	     $app['monolog']->addDebug('Shoing event detail of event id : '.$id. '');
	     return $app->json($post, 201);
    }

    //validate fileds method to check if required fields are missing or not
    //used by both update and create method 
	protected function validateFields(Request $request, Application $app){
 		 
 		 $event 				= new Event($app['dbconn']);
    	 $class_vars 			= get_class_vars(get_class($event));
    	 $missing_fields_key    = array();
	     $event_post		    = array();

   	 	 foreach ($class_vars as $key => $value){
	  	 	if($key != 'orm' and $key !='auto_prefix_models'){
  	 		   if(!$request->get($key)){
  	 		   		$missing_fields = true;
			    	switch ($key) {
			    		case 'name':
			    			array_push($missing_fields_key, 'Missing event name');
			    			break;
		    			case 'description':
			    			array_push($missing_fields_key, 'Missing event description');
			    			break;	
		    			case 'start_datetime':
			    			array_push($missing_fields_key, 'Missing event start datetime');
			    			break;
	    				case 'end_datetime':
			    			array_push($missing_fields_key, 'Missing event end datetime');
			    			break;
			    		default:
			    			break;
			    	}
			    	
			    }else{
			    	$event_post[$key]=$request->get($key);
			    }
	  	 	}
			 
		 }
		 //chekcing if there was any missing fields
		 //if yes then through error
	     if(sizeof($missing_fields_key)){
	     	$event_post['missing'] = $missing_fields_key; 
			return $event_post;
	     }else{

	     	return $event_post;
	     }

	}
	//creating new event
	//Request POST /events
    public function create(Request $request, Application $app) {
	    	 $event_post = $this->validateFields($request,$app);
	    	 if($event_post['missing']){
	    	 	   $error = array("message"=>$event_post['missing']); 
				   return $app->json($error,403);
	    	 }

	     	//if there are no missing fields then start saving them into the database
     	  	try {
		   		 // now saving event into the events table	
				 $app['dbconn']->beginTransaction();
			     $id = $app['dbconn'] ->insert('events', $event_post);
			     $event_post['id']=$app['dbconn']->lastInsertId('events');
				 $app['dbconn']->commit();
				
				 //return json data of the newly created event
				 return $app->json($event_post,201);

			} catch (\Exception $e) {
			   // through error if there are any exception while saving the event	
			   $app['dbconn']->rollback();	
			   $error = array("message"=>$e->getMessage()); 
			   
			   return $app->json($error,403);
			}
	}

    //updating existing event by id
    //Request PUT /events/{id}
    public function update($id,Request $request, Application $app) {
	    	 $event_post = $this->validateFields($request,$app);
	    	 if($event_post['missing']){
	    	 	   $error = array("message"=>$event_post['missing']); 
				   return $app->json($error,403);
	    	 }
	    	 //if there are no missing fields then start updating them into the database
     	  	try {
		   		 // now updating event into the events table	
				 $app['dbconn']->beginTransaction();
			     $id = $app['dbconn'] ->update('events', $event_post,array('id' => $id));
				 $app['dbconn']->commit();
				 //return json data of the updated event
				 return $app->json($event_post,201);

			} catch (\Exception $e) {
			   // through error if there are any exception while updating the event	
			   $app['dbconn']->rollback();	
			   $error = array("message"=>$e->getMessage()); 
			   
			   return $app->json($error,403);
			}


    }
	
	//deleting event by id
	//Request DELETE /events/{id}
	public function delete($id,Request $request, Application $app) {
	    $event = new Event($app['dbconn']);
    	if($event->isEventExist($id)){
			$error = array("message"=>"Event {$id} does not exist."); 
			return $app->json($error,403);
    	}

	 	try {
		     $result = $app['dbconn'] ->delete('events', array('id' => $id));
				
			 if($result)
			 	return $app->json(array("message"=>"Event {$id} is deleted!"),201);
			 else 
			 	return $app->json($issue_post,403);
				 
			} catch (\Exception $e) {
			   $error = array("message"=>$e->getMessage()); 
			   return $app->json($error,403);
			}

	    }

}
