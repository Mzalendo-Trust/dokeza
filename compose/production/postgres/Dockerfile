FROM postgres:15

COPY ./maintenance /usr/local/bin/maintenance
RUN chmod +x /usr/local/bin/maintenance/*
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rm -Rf /usr/local/bin/maintenance
