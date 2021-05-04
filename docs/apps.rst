*******
Dokeza Applications
*******

Dokeza uses a number of applications used to establish the required user experience.


Login via social media
======================

Django-allauth is a Django application that supports multiple authentication schemes (e.g. login by user name, or by e-mail), as well as multiple strategies for account verification (ranging from none to e-mail verification).

Dokeza has the Facebook, Google and Twitter app implementations.

Facebook
-------

Once you create an social app on the `admin` panel, go to the `developer.facebook.com <https://developers.facebook.com/>`_ and create your app. With `djngo-allauth` it is relatively painless.

Facebook has made a number of changes over time over security issues. So expect to check on your app once in a while.