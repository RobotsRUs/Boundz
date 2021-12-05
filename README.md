# GS-App-Template

## Setup

To use this as boilerplate, take the following steps:

```
git remote add gs_app_template git@github.com:ghsolomon/gs_app_template.git
git fetch gs_app_template
git merge gs_app_template/main
git branch -m master main
```

## Customize

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both the **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use the test database, while
  regular development uses development database

## Start

Sync and seed the database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start the server and build the client side files using webpack
- start:dev:logger is the same as start:dev, but will log SQL queries
- start:dev:seed will start the server and also seed the database (this is useful when making schema changes)

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

- **Creating a new app...**

  1.  `heroku create` or `heroku create your-app-name`
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
    ("provision") a postgres database to your heroku dyno (This creates your production database)

4.  `heroku config:set SEED=true` to get heroku to sync and seed the database

5.  note everytime the app restarts, the database tables will be dropped and re-created. To avoid this: `config:unset SEED`

- **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.
