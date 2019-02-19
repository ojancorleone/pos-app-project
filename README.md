# pos-app-project
 Point of Sales Application Using React and Express Js

## Requirement Environment
1. Node JS
1. NPM Package Manager
1. Docker

## Local Docker Postgres DB DEV mode Setup
1. docker-run -p 5432:5432 --name pos-app-db -e POSTGRESS_PASSWORD=postgres -d postgres
1. docker ps -a
1. start container docker start pos-app-db
1. add environment dev in database.json
1. DATABASE_URL=postgres://postgres:postgres@localhost:5432/posapp
1. db-migrate up -e dev