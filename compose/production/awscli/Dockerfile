FROM garland/aws-cli-docker:latest

COPY ./awscli/maintenance /usr/local/bin/maintenance
COPY ./postgres/maintenance/_sourced /usr/local/bin/maintenance/_sourced

RUN chmod +x /usr/local/bin/maintenance/*

RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rm -Rf /usr/local/bin/maintenance
