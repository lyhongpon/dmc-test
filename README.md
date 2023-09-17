### Setup API

```
$ composer install
$ php artisan key:generate
$ php artisan migrate
$ php artisan passport:install
```

Configure required .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dbname
DB_USERNAME=username
DB_PASSWORD=password

PASSPORT_CLIENT_ID=2
PASSPORT_CLIENT_SECRET=client-secret-from-table-oauth_clients
```

Run `php artisan serve`

### Setup WEB

```
$ yarn install
$ yarn dev
```
