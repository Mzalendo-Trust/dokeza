FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # Integrating OnlyOffice Document Builder here so that it works directly with Django
  && apt-get install -y libstdc++6 libcurl3-gnutls libc6 libxml2 libcurl4 fonts-dejavu fonts-opensymbol \
  && apt-get install -y fonts-liberation fonts-crosextra-carlito \
  && curl -o onlyoffice-documentbuilder_amd64.deb https://download.onlyoffice.com/install/desktop/docbuilder/linux/onlyoffice-documentbuilder_amd64.deb \
  && apt-get install -y ./onlyoffice-documentbuilder_amd64.deb \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system django \
    && adduser --system --ingroup django django

# Requirements are installed here to ensure they will be cached.
COPY ./requirements /requirements
RUN pip install --no-cache-dir -r /requirements/production.txt \
    && rm -rf /requirements

COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint && \
    chmod +x /entrypoint && \
    chown django /entrypoint

COPY ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start && \
    chmod +x /start && \
    chown django /start

COPY ./compose/production/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker && \
    chmod +x /start-celeryworker && \
    chown django /start-celeryworker

COPY ./compose/production/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat && \
    chmod +x /start-celerybeat && \
    chown django /start-celerybeat

COPY ./compose/production/django/celery/flower/start /start-flower
RUN sed -i 's/\r$//g' /start-flower && \
    chmod +x /start-flower
    
COPY --chown=django:django . /app
RUN chown django:django /tmp

# This user is the only one who can write to django 'app/meida'
USER root

ENTRYPOINT ["/entrypoint"]
