# brydge-cashout-api

## Localhost

To start this service in your localhost you must have Node.JS installed and MySQL database. We suggest to you to use Docker to build those environments.

In your first time, execute docker-compose up for download container image on docker
After your first time, you can only execute docker-compose start

After that, execute:

```
1- Git clone repository
2- yarn install
3- docker-compose up
4- Configure your environment variables on .env.development and set your database configuration
5- yarn sequelize db:migrate
6- yarn start-dev
7- Check your localhost:5004
```

## Deploy

For now, to deploy it you have to let the DevOps team knows that you need it.
