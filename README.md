# REST API todo application

Application use express, passport-local auth, sequelize, posges, docker.
nodemon works with docker. monitors changes and restarts the project

## Install and run app

    docker-compose -f docker-compose.dev.yml up

.

## User

### Signup user

`POST /api/user/signup`

#### Request body

`{ username: "example", password: "123", email: "example@ex.ex", firstname: "Myfirstname", } `

### Login user

`POST /api/user/login`

#### Request body

`{ username: "example" password: "123" }`

### Logout user

`GET /api/user/logout`

### Get profile

`GET /api/user/profile`

## Todo

### Create task

`POST /api/todo/create`

#### Request body

`{ task: "example task" }`

### Delete task

`DELETE /api/todo/:id`

### Update task

`PUT /api/todo/:id`

#### Request body

`{ task: "example task", done: "true" }`

### Get all tasks

`GET /api/todo/`
