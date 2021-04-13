# Docker Laravel

## Init app
docker run --rm -v $PWD:/app composer composer create-project --prefer-dist laravel/laravel NOM_APPLICATION(app) "8.*"

## Create and Modify .env
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user
DB_PASSWORD=password

## Install Vendor
docker-compose run composer install