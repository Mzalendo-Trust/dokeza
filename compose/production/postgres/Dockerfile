FROM postgis/postgis:12-3.0-alpine

COPY ./maintenance /usr/local/bin/maintenance
RUN chmod +x /usr/local/bin/maintenance/*
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rm -Rf /usr/local/bin/maintenance
