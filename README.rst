Dokeza 2.0 Platform
===================

The **Dokeza platform** allows the Kenyan public to participate in the development of a legislative bill in a structured manner. The platform allows for sections of legislative bills to be annotated and commented on. 

The ability for an interested member of the public to comment on the entire bill is also possible. Go to the `Dokeza platform <https://dokeza.mzalendo.com/>`_ and have a look at how it is done.

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

Usage
-----
This repository is built on top of the `Cookiecutter-django <https://github.com/pydanny/cookiecutter-django>`_, a speedy way to set up a production ready project for development. For further 

Ownership
---------

This project is built by the Red Afro Limited for Mzalendo Trust.

License
-------
`MIT <https://choosealicense.com/licenses/mit/>`_

.. image:: https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg
     :target: https://github.com/pydanny/cookiecutter-django/
     :alt: Built with Cookiecutter Django
.. image:: https://img.shields.io/badge/code%20style-black-000000.svg
     :target: https://github.com/ambv/black
     :alt: Black code style


