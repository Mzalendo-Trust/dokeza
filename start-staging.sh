# docker-compose -f staging.yml build
docker-compose -f staging.yml up -d django_staging
 
while [ ! "curl $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' django_staging):5050 | grep doctype" ]; do
echo Waiting for django_staging container to be up and running
sleep 2
done

docker-compose -f staging.yml up -d nginx

docker-compose -f staging.yml up certbot
docker exec nginx sed -i -r 's/#?;#//g' /etc/nginx/conf.d/default.conf
docker exec nginx service nginx restart

docker rm -f certbot
