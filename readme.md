This is a template for setting up developmet environment inside **[docker ](https://www.docker.com/ "docker ")**for below microservices:
- [php](https://hub.docker.com/_/php "php")
- [mysql](https://hub.docker.com/_/mysql "mysql")
- [phpmyadmin](https://hub.docker.com/_/phpmyadmin "phpmyadmin")
- [nginx](https://hub.docker.com/_/nginx "nginx")
- [node js](https://hub.docker.com/_/node "node js")

------------

###### Quick setup Guide:
Assuming you have docker installed and running. If not, then [install docker for your OS](https://docs.docker.com/desktop/ "install docker for your OS") then:

1. Clone this repository

	`git clone https://github.com/nfsiam/dockerized-microservices.git`

2. Then, create two new folders named **mysql** and **src** inside the **dockerized-microservices** folder.

3. Open up your terminal (git bash/ CMD) in **dockerized-microservices** folder and run the first docker command

	`docker-compose up -d --build site`
	
	here, this docker command will build and run our first four containers (nginx, php, mysql, phpmyadmin) in background

4. After that, run below command to install laravel. This will install a fresh copy of laravel inside **src** folder.

	`docker-compose run --rm composer create-project laravel/laravel="5.8.*" .`

5. Once composer finishes installing laravel, go inside src folder and edit DB settings in **.env ** from
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
to
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret
```
6. Next, we make default authentication scaffolding by running below command

	`docker-compose run --rm artisan make:auth`

	and then for migration

	`docker-compose run --rm artisan migrate`

After completing above steps, a fresh install of laravel is now live at http://localhost:8000 with login and registration feature. **phpmyadmin** can be accessed by going at http://localhost:81 (use ***root* ** as username and ***secret***  as  password)

Now to start express server in node js, perform below steps.
1. Cut the **index.js** file and paste inside **src** folder

2. Install express using **npm** by running below command from **dockerized-microservices** folder

	`docker-compose run --rm npm install express`

3. Then build and start node server in background by running command

	`docker-compose up -d --build node`

Now the express server is running as well at http://localhost:3000


------------

All the volumes except the volume of mysql container is mountd to the **'src'** folder as it is a development setup. So, any change or update of project inside src folder is immediately reflected to running container.

To run any **composer** command
- `docker-compose run --rm composer  <your command>`

To run any **artisan** command
- `docker-compose run --rm artisan <your command>`

To run any **npm** command
- `docker-compose run --rm npm <your command>`


-----------
[click here to know more about docker-compose.yml file](https://docs.docker.com/compose/compose-file/ "click here to know more about docker-compose.yml file")

[click here to know more about dockerfiles ](https://docs.docker.com/engine/reference/builder/ "click here to know more about dockerfiles ")

------------

This workflow is a modified version of another [workflow](https://github.com/aschmelyun/docker-compose-laravel "workflow")  by [Andrew Schmelyun](https://github.com/aschmelyun). I had to modify it to run a node server and phpmyadmin alongside the laravel project under the same umbrella and I was having some issue with that template during my testing so I had to fix/add/remove few codes to have a fluent dev environment for my microservices in docker for windows.