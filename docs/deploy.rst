Deploy
========

This is where you describe how the project is deployed in production.


Install Let's Encrypt
---------------------

For HTTPS, we have chosen Let's Encrypt. On the CLI, one must generate a dhparams.pem file before running docker-compose in a production environment.

    1. Open the **compose/nginx/dhparams.example.pem** and save it as **dhparams.pem** in the same location.

    2. For a standard cookiecutter-django project, the command to create it is - 
 
    $ openssl dhparam -out compose/nginx/dhparams.pem 2048


Install on the Production Server
--------------------------------

The deployment instructions here are for Digital Ocean, though one can use the preferred Cloud company. The important thing is the deployment is on Docker.

Navigate to the project's root folder on the CLI. List the Docker machines present::

    $ docker-machine ls

Create your production server on Digital Ocean using the following command on the CLI::

    $ docker-machine create --driver digitalocean --help

This will give all the options needed to spin up a Digital Ocean (DO) 'droplet'. For this size of project, these are the minimum specs and preferred location::

    $ docker-machine create --driver digitalocean --digitalocean-size 1gb \ --digitalocean-image ubuntu-16-04-x64 --digitalocean-region lon1 \ --digitalocean-access-token=$DOTOKEN machine-name

    $ eval $(docker-machine env machine-name)

NOTE: Take the IP of the droplet and put it on the the environment variable file, *.env* in the ``DJANGO_ALLOWED_HOSTS`` before you begin the Docker Build process.

Navigate to the root folder of the project, and beginning by building by building he project on the production server::

    $ docker-compose -f production.yml build

and after some amount of time::

    $ docker-compose -f production.yml up -d

Immediately create the database and the superuser::

    $ docker-compose run django python manage.py makemigrations
    $ docker-compose run django python manage.py migrate
    $ docker-compose run django python manage.py createsuperuser


Install PostgeSQL and PostGIS
---------------------------------

Navigate to the Docker container that has the PostgreSQL database::

    $ docker ps -a
    $ docker exec -it <postgres_container_id> bash
    root@<postgres_container_id>:/# apt-get update
    root@<postgres_container_id>:/# apt-get install postgresql-9.x-postgis

This will take some time. The download is over 400MB. Finally, enable GIS for the database::

    root@<postgres_container_id>:/# psql -U [yourdatabase] -c "CREATE EXTENSION postgis;"

The command will be echoed on the CLI, ```CREATE EXTENSION```. You can exit after that.

To see what the URL of the DO droplet that is related to **machine_name** use, type::

    $ docker-machine ls

On your browser, navigate to the URL http://<machine_name_IP>.

To access the admin, type the URL ```machine_name_IP\admin```. Enter the superuser name and password and confirm everything is intact.

Optional Installation
---------------------

