# Owning Team: @reliancehealthinc/nickmullen

Feel free to assign to a team!

# sample-ms

This sample microservice is intended for use as a template for node/typescript microservices. It demonstrates:

- a "good" structure that you can follow that seperates code into logical flows
  - routes
  - controllers
  - services
  - models
- interaction with databases
  - using Sequelize as an ORM
  - Polymorphic relationships between tables (a neat way of managing translations)
  - migrations and seeders
- testing
  - unit testing using JEST
  - load testing using K6
- instrumentation
  - using openTelemetry
- swagger
  - publishing documentation
- Docker
  - how to build and test locally
  - how to build a SMALL and efficient image that can be deployed to Production

## Overview

The service offers a demonstration of a very simple microservice.

The service in this case knows about Films and Books (we've actually only implemented Books, but Films is included in
the models to demonstrate how polymorphism works)

Books:

- Have an id
- Have an author
- Have names (which differ by language)
- Have descriptions (which differ by language)

Films:

- Have an id
- Have a director
- Have names (which differ by language)
- Have descriptions (which differ by language)

We will show how this can be done using 3 database tables:

- Books
- Films
- TranslatableItems

## Running locally

### Dependencies

- Node v22
- an instance of mySQL (the code is VERY easy to change to Postgres)
  - Later in the docker section, we can create a dockerised instance of mySQL for you to work with
- Rancher
  - so that you can test that your code works when dockerised (ie: it is ready to deploy somewhere)

### Initial setup

#### Fetch the code

```
git clone {the link to this repo}
cd sample-ms
npm install
```

#### Set environment variables

Create a file `.env` at the top level of the project. The code uses dotenv-safe which means your .env file MUST contain
ALL of the values that are included in `.env.example`

#### Configure the database

```
npm run prepareDB
```

which is equivalent to running:

```
npm run migrate:all
npm run seed:all
```

> **_REMEMBER:_**
>
> - MIGRATIONS are used to describe table structure ONLY (never content)
> - SEEDS are used to inject data ONLY (never structure)

What is happening under the hood when you run migration and seeds

- you are running sequelize-cli, NOT your main body of code
- sequlize-cli picks up config from the `.sequelizerc` file
