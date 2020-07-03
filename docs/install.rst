=======
Install
=======

Installing cookiecutter globally
--------------------------------

In order to begin development in cookiecutter-django, one would need to install cookiecutter::

    $ pip install cookiecutter

You will need to install `Cookie Cutter Django`__ and Docker on the computer you are using for development. Now execute the following command to generate a bootstrapped django project::

    $ cookiecutter https://github.com/pydanny/cookiecutter-django.git

This command runs cookiecutter with the cookiecutter-django repo, allowing us to enter project-specific details. The options can be found at the Cookie Cutter Django docs.

.. _cookie_cutter_django: https://cookiecutter-django.readthedocs.io/en/latest/index.html

__ cookie_cutter_django_


Installation using Docker for Mac/Windows
-----------------------------------------

This repo is a new implementation of the Dokeza platform using the latest version of Django 3 and Python 3.8. 

The Dokeza implementation is built using the `Docker <https://www.docker.com/>`_ for an easier and more consistent way to develop and deploy the platform.

Make sure the `docker` application is installed on your development environment. Clone this repo and enter it. Once you are in, run::

    $ docker-compose -f local.yml build


Once the build process is complete, you may now start up the platform in `docker`::

    $ docker-compose -f local.yml up -d

The ``-d`` flag allows one to start the process without tying up the current terminal window as the application starts up.

Installing using the Docker Engine on the CLI
---------------------------------------------

This project can also be run using the Docker Toolbox for the older Mac OSX and certain *Nix* versions.

Set up the **Docker Engine** using the application best for the platform. For the install the Docker Engine, go to `Install Docker Engine`_.

Clone the repo and go to the project's root folder on the CLI(Command Line Interface).
List the Docker machines present::

    $ docker-machine ls

Start up the default Docker machine and go into it:: 

    $ docker-machine start default
    $ eval $(docker-machine env default)

When using default Docker machine, no database or session data is saved once the default machine shut down or the computer being used is restarted. This might be useful if the design of the database is not complete. Once the database schema is settled, a specific machine can be created.

To create a specific machine for development, type::
    
    $ docker-machine create --driver virtualbox --help

This will give print out the options to use when creating the machine. Then type::

    $ docker-machine create --driver virtualbox dev-machine
    $ eval $(docker-machine env dev-machine)

The ``dev-machine`` will have a fixed IP. Confirm that you are in the root folder of the project, by listing the files. You should see ``production.yml`` and ``local.yml``.

Install PostGIS
-----------------------------

We have replaced in the Postgres ``DockerFile`` with the ``postgis/postgis`` image on from the Docker hub. 

The ``postgis/postgis`` image provides tags for running Postgres with PostGIS extensions installed. This image is based on the official postgres image and provides debian and alpine variants for PostGIS both 2.5.x and 3.0.x for each supported version of Postgres (9.5, 9.6, 10, 11, and 12). 

Additionally, an image version is provided which is built from the latest version of Postgres (12) with versions of PostGIS and its dependencies built from their respective master branches.

This image ensures that the default database created by the parent postgres image will have the following extensions installed:

- postgis
- postgis_topology
- fuzzystrmatch
- postgis_tiger_geocoder

Now open your text editor and code some magic.


.. _Install Docker Engine: https://docs.docker.com/engine/installation/
