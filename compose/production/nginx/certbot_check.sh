# This bit waits until the letsencrypt container has done its thing.
# We see the changes here bceause there's a docker volume mapped.
echo Waiting for folder /etc/letsencrypt/live/dokeza.mzalendo.com to exist
while [ ! -d /etc/letsencrypt/live/dokeza.mzalendo.com ]; do
    sleep 2
done

while [ ! -f /etc/letsencrypt/live/dokeza.mzalendo.com/fullchain.pem ]; do
    echo Waiting for file fullchain.pem to exist
    sleep 2
done

while [ ! -f /etc/letsencrypt/live/dokeza.mzalendo.com/privkey.pem ]; do
    echo Waiting for file privkey.pem to exist
    sleep 2
done

# This is added so that when the certificate is being renewed or is already in place, nginx waits for everything to be good.
sleep 15

sed -i -r 's/#?;#//g' /etc/nginx/conf.d/default.conf
nginx -t && service nginx restart
