# React-Redux App

Simple React-Redux app with Node.js/Express CRUD backend using GraphQL, Sequelize, and Postgresql.

### Version
1.0.0

## API

Create Database (make sure Postgresql is running in `localhost:5432`)
* Note: The default database_name is `onerent`. You may configure the database in `api/db.js`

```bash
$ createdb <database_name>
```

Install packages

```bash
$ cd api
```

```bash
$ npm install
```

Run Server (Port `4000`)

```bash
$ npm run dev:server
```

## Webapp

Install packages

```bash
$ cd webapp
```

```bash
$ npm install
```

Create `.env` file (use `.env.sample` as template)

Run App (Port `3000`)

```bash
$ npm run dev
```