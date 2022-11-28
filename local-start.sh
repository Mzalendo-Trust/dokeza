# docker volume create --name=dokeza_vers_2
# docker-sync start
docker compose -f local.yml build

docker compose -f local.yml up -d
