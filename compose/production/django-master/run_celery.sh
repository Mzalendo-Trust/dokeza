#!/usr/bin/env bash

set -e

/wait-for-it.sh $PG_HOST:$PG_PORT --timeout=10 --strict -- echo "postgres is up"

celery -E -A project worker -l info --autoscale=10,2 -Q my_queue -n worker -B