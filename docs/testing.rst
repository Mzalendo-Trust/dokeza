.. _testing:

Testing
========

As best practice, building application tests should be done immediately after documentation of the application being built. Only then should coding begin.

Pytest
------

This project uses the Pytest_, a framework for easily building simple and scalable tests. The project is set  to `develop locally with docker`_, run the following command: ::

   $ docker-compose -f local.yml run --rm django pytest

Targeting particular apps for testing in ``docker`` follows a similar pattern as previously shown above.

Coverage
--------

You should build your tests to provide the highest level of **code coverage**. You can run the ``pytest`` with code ``coverage`` by typing in the following command: ::

   $ docker-compose -f local.yml run --rm django coverage run -m pytest

Once the tests are complete, in order to see the code coverage, run the following command: ::

   $ docker-compose -f local.yml run --rm django coverage report

.. note::

   At the root of the project folder, you will find the `pytest.ini` file. You can use this to customize_ the ``pytest`` to your liking.

   There is also the `.coveragerc`. This is the configuration file for the ``coverage`` tool. You can find out more about `configuring`_ ``coverage``.

   Build unit tests using the Python `unittest`_ library and test them using the following comannad: ::

      $ docker-compose -f local.yml run --rm django python manage.py test


.. _Pytest: https://docs.pytest.org/en/latest/example/simple.html
.. _develop locally with docker: ./development.html
.. _customize: https://docs.pytest.org/en/latest/customize.html
.. _unittest: https://docs.python.org/3/library/unittest.html#module-unittest
.. _configuring: https://coverage.readthedocs.io/en/v4.5.x/config.html
