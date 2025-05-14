
FROM composer:2 AS vendor

# Directorio de trabajo dentro del contenedor
WORKDIR /var/www/html

# Copiamos todo el proyecto (incluye artisan, composer.json y composer.lock)
COPY . .

# Instalamos las dependencias de PHP sin ejecutar scripts que llamen a artisan
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --optimize-autoloader

FROM php:8.3-fpm-alpine

# Instalación de librerías nativas y extensiones PHP necesarias
RUN apk add --no-cache \
        icu-dev \
        oniguruma-dev \
        zlib-dev \
        libzip-dev \
        sqlite-dev \
    && docker-php-ext-install \
        pdo \
        pdo_sqlite \
        intl \
        mbstring \
        zip

# Fijamos mismo directorio de trabajo
WORKDIR /var/www/html

# Copiamos el código fuente y los vendors ya instalados en la etapa anterior
COPY --from=vendor /var/www/html /var/www/html

# Exponemos el puerto por el que correrá php artisan serve
EXPOSE 8000

# Comando por defecto al iniciar el contenedor:
#   1) Crear o tocar el archivo database.sqlite
#   2) Correr migraciones y seeders
#   3) Levantar el servidor en 0.0.0.0:8000
CMD ["sh", "-c", "\
    touch database/database.sqlite && \
    php artisan migrate:fresh --seed && \
    php artisan serve --host=0.0.0.0 --port=8000 \
"]
