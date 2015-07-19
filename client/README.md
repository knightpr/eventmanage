README.md

##Front-end technology used :

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

###Project folder structure

    `   events
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

 

