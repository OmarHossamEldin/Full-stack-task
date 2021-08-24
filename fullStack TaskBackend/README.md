# Full stack task 
> Backend Api

## description 
Basically, Full Stack task.


## Getting started
- run the commands in your terminal 
1. cp .env.example .env
1. vim .env 
1. press i in your keyboard
1. navigate into your database configs and change it to your locale database
1. press Esc then :x
1. run php artisan migrate --seed
1. you are ready to go now with backend Api

## App Directory Structure
```
├───Console
├───Exceptions
├───Http
│   ├───Controllers
│   │   └───Auth
│   ├───Middleware
│   └───Requests
├───InterFaces
├───Models
├───Providers
└───Repositories
├───bootstrap
│   └───cache
├───config
├───database
│   ├───factories
│   ├───migrations
│   └───seeders
├───public
│   ├───css
│   └───js
├───resources
│   ├───css
│   ├───js
│   ├───lang
│   │   └───en
│   ├───sass
│   └───views
├───routes
├───storage
│   ├───app
│   │   └───public
│   ├───framework
│   │   ├───cache
│   │   │   └───data
│   │   ├───sessions
│   │   ├───testing
│   │   └───views
│   └───logs
├───tests
│   ├───Feature
│   └───Unit
│   
└───vendor
```