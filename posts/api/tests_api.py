from django.test import TestCase

# Create your tests here.

"""
curl -X GET HTTP://radi.local:5757/api/auth/token/
> {"detail":"Authentication credentials were not provided."}%

curl -X GET  -d '{"user":"dokezamasta", "password": "gitts2mac"}' http://radi.local:5757/api/auth/token/
> curl: (6) Could not resolve host: GET

