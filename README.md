#Test Event Manager application 
This is very basic example for simple event manage application by using PHP,MYSQL in the backend and backbonejs,bootstrap, HTML5 and CSS3 in the fronend.

###Main folder strcuture
        events
        -->client
        -->server
        -->README.md

## Back-end(server) technology used
- PHP (5.6.10)
- [Silex](http://silex.sensiolabs.org/) php micro framework for handling APIs



##DATABASE 

- MYSQL server (5.6.25) database is used

### DATABASE CONFIGURATION

1. connect to mysql
mysql -u [user] -p[password] -h localhost 

2. Creating db and using it
CREATE DATABASE events
USE events

3. Creating event table
4. 


        CREATE TABLE events (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name  varchar(255) NOT NULL,
          description text NOT NULL ,
          start_datetime DATETIME NOT NULL,
          end_datetime DATETIME NOT NULL,
          creation_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          modification_datetime DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
        );



4. copy config/sample.db.inc.php to db.inc.php and change the configuation according to your environment

### Application structure

         server
          ->config
          ->src
          -->app
          ---->Controller
          ---->Model
          ->vendor
          ->web
          -->index.php
          



##Front-end(client) technology used :

 1. Backbonejs
      - Javascript framework for providing MVC and routine structure to the application 
      - although Controllers and Models are not used for this use case
 2. Bootstrapsjs
   - HTML, CSS and JS framework for fast responsive design is used
 3. Requirejs
       - RequireJS is a JavaScript file and module loader and used for css and js files optimization for this assignment
 4. Handlebarjs
    - As a templating engline Handlebarjs is used for this assignment
 5. CSS3 AND HTML5
 6. Basic SASS stylesheet language is used  
 7. JQuery 

### client folder structure

    `   client
      ->build
       -->www
       -->www-raw
       ->css
       ->img
       ->js
       -->libs
       ---->backbone
       ---->bootstrap
        ---->jquery
        ---->underscore
        ---->handlebarjs
        .....
        ->node_modules
        ->sass
        ->template
        ->MakeFile
        ->README.md
        ->index.html
        ->package.json
      `

###*Main Interested files might be* ,

router.js for handling all the routes

main.js for over all structure of the application

home.js for event handling

##Running application
Running with web server . If you want to run this application with web server setting, you can use same Nginx configuration file to configure your Nginx environment


##Generating build
 I have used requirejs for generating compressed version of all js files and css files into singe css and js file. To generate build you can run the make command.
 

    make deploy

you can install requirejs with npm install command

    npm install 

##Tracking changes in sass file by using watch, install sass and watch library using npm

    npm install -g watch
    npm install -g sass 
I have added small scripts under package.json to run the watch and keep tracking of changes in sass file during development process and compile it into css file. So you can simple run the following command to keep tracking the changes into the sass file:

    npm run dev

 
##Web server setup
For I have tested with [Nginx](http://nginx.org/) webserve.


    Please have a look **sample.ngix.conf** for sample configuration for nginx, you can change the configuration according to your environment setup. 

