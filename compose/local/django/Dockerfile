FROM python:3.9-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && \
  # dependencies for building Python packages
  apt-get install -y build-essential && \
  # psycopg2 dependencies
  apt-get install -y libpq-dev && \
  # Translations dependencies
  apt-get install -y gettext && \
  # Integrating OnlyOffice Document Builder here so that it works directly with Django
  apt-get install -y libstdc++6 libcurl3-gnutls libc6 libxml2 libcurl4 fonts-dejavu fonts-opensymbol && \
  apt-get install -y fonts-liberation fonts-crosextra-carlito && \
  curl -o onlyoffice-documentbuilder_amd64.deb https://download.onlyoffice.com/install/desktop/docbuilder/linux/onlyoffice-documentbuilder_amd64.deb && \
  apt-get install -y ./onlyoffice-documentbuilder_amd64.deb && \
  # cleaning up unused files
  apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -rf /var/lib/apt/lists/*


# Requirements are installed here to ensure they will be cached.
COPY ./requirements /requirements
COPY ./compose/production/django/entrypoint /entrypoint
COPY ./compose/local/django/start /start
COPY ./compose/local/django/celery/worker/start /start-celeryworker
COPY ./compose/local/django/celery/beat/start /start-celerybeat
COPY ./compose/local/django/celery/flower/start /start-flower

RUN pip install -r /requirements/local.txt && \
 sed -i 's/\r$//g' /entrypoint && \
 chmod +x /entrypoint && \
 sed -i 's/\r$//g' /start && \
 chmod +x /start && \
 sed -i 's/\r$//g' /start-celeryworker && \
 chmod +x /start-celeryworker && \
 sed -i 's/\r$//g' /start-celerybeat && \
 chmod +x /start-celerybeat && \
 sed -i 's/\r$//g' /start-flower && \
 chmod +x /start-flower

WORKDIR /app

ENTRYPOINT ["/entrypoint"]
