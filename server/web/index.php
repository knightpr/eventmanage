<?php
/*
  This is samll software for handling RESTful API for event management.
  @author Pramod Rauniyar <pramod.rauniyar@gmail.com>

  index.php

*/

//loading database configuration file 
require_once __DIR__.'/../config/db.inc.php';

//loading vendor libraries
require_once __DIR__.'/../vendor/autoload.php';


//using some basic components of silxe for managing database, http request and logging etc
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Silex\Provider\MonologServiceProvider;
use Silex\Provider\SessionServiceProvider;

//creating instance of the silex application
$app = new Silex\Application();

$app->register(new Silex\Provider\ServiceControllerServiceProvider());


//database confiuration setup from the conifuration parameter 
$config = new \Doctrine\DBAL\Configuration();
$connectionParams = array(
            'driver'   => DB_DRIVER,
            'dbname'   => DB_NAME,
            'host'     => DB_HOST,
            'user'     => DB_USER,
            'password' => DB_PASSWORD,
            'charset'  => DB_CHARSET
);

//database conneciton
$conn = \Doctrine\DBAL\DriverManager::getConnection($connectionParams, $config);
$app['dbconn'] = $conn;

		 
$app->register(new Silex\Provider\SessionServiceProvider(), array(
    'session.storage.options' => array(
        'cookie_lifetime' => (24 * 60 * 60) * 7 // 7 days
    )
));

//logging
$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' =>'/tmp/events.silex.log',
));

// Override default controller
$app['resolver'] = $app->share(function () use ($app) {
    return new app\Controller\ControllerResolver($app, $app['logger']);
});

//Event controller
$app['events.controller'] = $app->share(function($id,$request) use ($app) {
    return new app\Controller\EventsController();
});

/**
 * Routes definition
 */
//GET /events for listing all eventes
$app->get( '/events','events.controller:index');
//GET /events/{id} for listing specific event
$app->get( '/events/{id}','events.controller:show');
//POST /events for creating new event
$app->post( '/events','events.controller:create'); 
//PUT /events/{id} for updating exisiting event
$app->put( '/events/{id}','events.controller:update'); 
//DELETE /events/{ID} for deleting specific event
$app->delete('/events/{id}','events.controller:delete');



/**
 * Default error handler
 */
$app->error(function (\Exception $e, $code) {

    $message = NULL;

    switch ($code) {
        case 400:
            $message = 'Bad request.';
            break;
        case 404:
            $message = 'Page not found.';
            break;
    default:
      $message = 'Internal Server Error.';
    }

    if ($message) {
        return new Response($message, $code);
    }
});

//finally running the application 
$app->run();
