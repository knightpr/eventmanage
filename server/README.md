### Technology used

- Silex php micro framework for handling APIs


##DATABASE 

- mysql database is used

### DATABASE CONFIGURATION
1. connect to mysql
mysql -u [user] -p[password] -h localhost 

2. Creating db and using it
CREATE DATABASE events
USE events

3. Creating event table
CREATE TABLE events (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name  varchar(255) NOT NULL,
	description text NOT NULL ,
	start_datetime DATETIME NOT NULL,
	end_datetime DATETIME NOT NULL,
	creation_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modification_datetime DATETIME NOT NULL ON UPDATE CURRENT_TIMESTAMP
);

4. copy config/sample.db.inc.php to db.inc.php and change the configuation according to your environment