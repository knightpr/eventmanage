OPTIMIZE			= node_modules/.bin/r.js -o
CONFIG				= app.build.js


all: deploy docs

npm-update:
	npm install

r.js: npm-update
	$(OPTIMIZE) $(CONFIG)


clean:
	-rm -r build

build:
	-mkdir build

build/www:
	-mkdir build/www

build/www/js: build/www
	-mkdir build/www/js

build/www/css: build/www
	-mkdir build/www/css

build/www/img: build/www
	-mkdir build/www/img

build/www/index.html: build/www r.js
	-cp build/www-raw/index.html build/www/index.html

build/www/css/app.css: build/www/css r.js
	-cp build/www-raw/css/app.css build/www/css/app.css

build/www/js/main.js: build/www/js r.js
	-mkdir build/www/js/libs
	-mkdir build/www/js/libs/require
	-cp build/www-raw/js/libs/require/require.js build/www/js/libs/require/require.js
	-cp build/www-raw/js/main.js build/www/js/main.js

build/www/img: build/www/img r.js
	-cp -r build/www-raw/img build/www/img

deploy: build r.js build/www build/www/index.html build/www/js/main.js build/www/css/app.css build/www/img
	@echo "You can find your web app at build/www."
