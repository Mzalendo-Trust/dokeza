*******
Dokeza Applications
*******

Dokeza uses a number of applications used to establish the required user experience.

Annotator
=========

Annotator is an open-source JavaScript library to easily add annotation functionality to any webpage. Annotations can have comments, tags, links, users, and more. Annotator is designed for easy extensibility so its a cinch to add a new feature or behaviour. 

However, the development of this particular application has been `discontinued <http://annotateit.org/>`_. `Apache Annotator <https://annotator.apache.org/>`_ is now preferred. As of the 23 August 2018, the code in this repo is not ready for production.

Login via social media
======================

Django-allauth is a Django application that supports multiple authentication schemes (e.g. login by user name, or by e-mail), as well as multiple strategies for account verification (ranging from none to e-mail verification).

Dokeza has the Facebook, Google and Twitter app implementations.

Facebook
-------

Once you create an social app on the `admin` panel, go to the `developer.facebook.com <https://developers.facebook.com/>`_ and create your app. With `djngo-allauth` it is relatively painless.

Facebook has made a number of changes over time over security issues. So expect to check on your app once in a while.