Installation
-------------

This repo is a new implementation of the Dokeza platform using the latest version of Djang 3 and Python 3.8. 

The Dokeza implementation is built using the `Docker <https://www.docker.com/>`_ for an easier and more consistent way to develop and deploy the platform.

Make sure the `docker` application is installed on your development environment. Clone this repo and enter it. Once you are in, run

::

$ docker-compose -f local.yml build


Once the build process is complete, you may now start up the platform in `docker`.

::

$ docker-compose -f local.yml up -d

The `-d` flag allows one to start the process without tying up the current terminal window as the application starts up.

Live reloading and Sass CSS compilation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Moved to `Live reloading and SASS compilation`_.

.. _`Live reloading and SASS compilation`: http://cookiecutter-django.readthedocs.io/en/latest/live-reloading-and-sass-compilation.html
