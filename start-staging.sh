docker compose -f staging.yml build --compress --force-rm --pull --parallel
docker compose -f staging.yml up -d django
 
while [ ! "curl $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' django):5000 | grep doctype" ]; do
echo Waiting for django container to be up and running
sleep 2
done

docker compose -f staging.yml up -d nginx

docker compose -f staging.yml up certbot
docker exec nginx sed -i -r 's/#?;#//g' /etc/nginx/conf.d/staging.conf
docker exec nginx service nginx restart
docker compose -f staging.yml up -d documentserver

docker rm -f certbot
