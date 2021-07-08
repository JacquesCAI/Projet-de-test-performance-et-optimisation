FROM php:7.4-fpm

RUN apt-get update && apt-get install -y libicu-dev  wget gnupg2

RUN wget -q -O - https://packages.blackfire.io/gpg.key | apt-key add -
RUN echo "deb http://packages.blackfire.io/debian any main" | tee /etc/apt/sources.list.d/blackfire.list
RUN apt-get update && apt-get install -y blackfire-php blackfire

RUN docker-php-ext-install pdo_mysql intl opcache

COPY ./start.sh /bin/start.sh

WORKDIR /usr/share/nginx/html

CMD "/bin/start.sh"