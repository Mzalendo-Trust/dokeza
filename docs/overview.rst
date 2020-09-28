********
Overview
********

Dokeza is based on the `Django <https://www.djangoproject.com/>`_ framework. The project is Cloud ready and we chose to deploy it in Docker containers. We used the `Cookiecutter Django <https://github.com/pydanny/cookiecutter-django>`_, a framework for jumpstarting production-ready Django projects quickly. Cookiecutter Django comes in "dockerised" for development and production.

The Docker environments are specified in the YAML files, ``local.yml`` for development and ``production.yml`` for production. We created a ``staging.yml`` for the staging the release as we progress towards deployment.

Python dependencies are specified in the files in the ``requirements`` folder. Most are standard Python packages but some are repositories.

The ``compose`` folder has the specific Dockerfiles and the shell scripts for deployment in production. Some of these are shared woth development and staging if there are no changes relative to the environment.

Configuration is done by editing the values of the files in ``config/settings`` folder. Values which affect both the dev and production setups are in the ``base.py`` file. ``local.py`` is for settings specific to the development environment, ``production.py`` for final deployment and ``test.py`` for the tests that are to be carried out.

All data is stored in a `PostgreSQL` database in development and production. We intend to implement Full-Text Search using only Django and PostgreSQL, without resorting to external products at a future date once we move to ``Django 3+``.
