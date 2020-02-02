This project is build on top of React (Front-end/client) and Laravel (Back-end/api/server) and can be use to add and track tasks having to-do's.

## How to setup this project?

As we are using Laravel Passport to authenticate the api requests. So, it need to setup each time the database has been changed.

Please follow below steps -

### `Clone this repo`

First clone this repo by executing below command inside the terminal -

`git clone https://github.com/dishantagnihotri/to-do-list-niyotail.git`

### `Setup Back-end`

Now, we need to setup our back-end first. Open terminal inside api and follow below commands -

1. `Update .env File`

First we need to let laravel know the credentials for the database. You can install xampp or any other phpmyadmin client for the database.

To update the credentails, go inside 'api/.env' and update the below values with your credentials -

`DB_DATABASE=niyotail DB_USERNAME=root DB_PASSWORD=`
The above are the default credentials for all databases.

2. `php artisan migrate`

Now, we will import all our database table and columns inside the DB. You can run the above command inside the API folder to let laravel setup everything for you or you can import the database client directly by using the 'database/niyotail.sql' file.

3. `php artisan passport:install`

Now, we are creating the client_id and client_secret for our API's. After running the above command inside 'api', you will return with one or two client_id and client_secret.

Copy any values and update them inside the 'client/.env' to let front-end know the credentials. They will include them for each request to generate the token for api calls.

Here, you can also update the base url for the api's.

4. `Running the server`

At last, you need to run both api and client (as this is not in production and require both of them running simultaneously).

For that run both the command inside the different terminals and don't close them to keep running the servers.

Inside API - `php artisan serve`

Inside Client - `yarn start`

By default, api will run on http://localhost:8000/
and, client on http://localhost:3000/

Now, create an account from http://localhost:3000/register or login to the existing on from http://localhost:3000/login.

The main app live inside the http://localhost:3000/dashboard.

### That's it.

For any queries, do let me know directly.
