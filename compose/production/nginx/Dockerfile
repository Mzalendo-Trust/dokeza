FROM nginx:latest
COPY dhparams.pem /etc/nginx/dhparam.pem
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i -r 's/(listen .*443)/\1;#/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\1/g' /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www/certbot && chown -Rf nginx /var/www/certbot
