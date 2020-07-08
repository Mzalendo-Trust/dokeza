"""
 

curl -X POST -d "username=dokezamasta&password=gitts2mac" http://192.168.59.100:8000/api/auth/token/

curl -X POST -d "username=dokezamasta&password=gitts2mac" 'http://radi.local:5757/api/auth/token/'

curl -X POST -H "Content-Type: application/json" -d "{"username":"dokezamasta", "password":"gitts2mac"}" "http://radi.local:5757/api/auth/token/"


curl -X POST -H 'Content-Type: application/json' -d 'username=mbiginjii&password=gitts2mac' 'http://192.168.59.100:8000/api/auth/token/'

->
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hc3RhQGRva2V6YS5temFsZW5kby5jb20iLCJleHAiOjE0ODY5MTczMTgsInVzZXJuYW1lIjoiZG9rZXphbWFzdGEifQ.MGUq_gfT4Rquope81KmhKK93ohTd67dma7NCKCrUykc","active":true,"user":"dokezamasta"}

curl -X POST -H "Content-Type: application/json" -d "username=dokezamasta&password=gitts2mac" "http://192.168.59.100:8000/api/auth/token/"


curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hc3RhQGRva2V6YS5temFsZW5kby5jb20iLCJleHAiOjE0ODY5MTczMTgsInVzZXJuYW1lIjoiZG9rZXphbWFzdGEifQ.MGUq_gfT4Rquope81KmhKK93ohTd67dma7NCKCrUykc" http://192.168.59.100:8000/api/annotations/


curl -X POST -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hc3RhQGRva2V6YS5temFsZW5kby5jb20iLCJleHAiOjE0ODY5MTczMTgsInVzZXJuYW1lIjoiZG9rZXphbWFzdGEifQ.MGUq_gfT4Rquope81KmhKK93ohTd67dma7NCKCrUykc" -H "Content-Type: application/json" -d '{"content":"This is too deadly. A curl entry"}' 'http://192.168.59.100:8000/api/comments/create/?type=post&slug=quick-and-fast'
>
{"id":2,"parent":null,"content":"This is too deadly. A curl entry","timestamp":"2017-02-11T17:31:58.015258Z"}


curl -X POST -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hc3RhQGRva2V6YS5temFsZW5kby5jb20iLCJleHAiOjE0ODY5MTczMTgsInVzZXJuYW1lIjoiZG9rZXphbWFzdGEifQ.MGUq_gfT4Rquope81KmhKK93ohTd67dma7NCKCrUykc" -H "Content-Type: application/json" -d '{"content":"This is deadlier. A curl reply to a curl entry"}' 'http://192.168.59.100:8000/api/comments/create/?type=post&slug=quick-and-fast&parent_id=2'
"""