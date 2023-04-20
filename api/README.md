# Covid Metrics API

This project provides database and API that returns covid related metrics based on filters selected by the user.

## Technologies

- Node
- Docker
- Express
- Prisma
- Postgres
- Jest

## Available Scripts

In the project directory, you can run:

### `npm i`

To install dependencies

### `npm start`

Runs the app.\
Runs in the PORT 4000 [http://localhost:4000](http://localhost:4000) by default.

### `npm test`

Runs all tests.

### `npm test:watch`

Runs all tests and keeps watching for changes.

### `npm run dev`

Runs the app in the development mode.\
Runs in the PORT 4000 [http://localhost:4000](http://localhost:4000) by default.

The server will reload if you make edits.

## Database setup

1. To initialize a new postgres database, run this Docker command in the `api` root folder:

`docker-compose up -d`

2. Update `docker-compose.yml` database credentials

   environment:

   - POSTGRES_USER=username
   - POSTGRES_PASSWORD=password
   - POSTGRES_DB=comparative

3. Setup the `.env` variable in the `api` root folder and define a `DATABASE_URL`

`DATABASE_URL="postgresql://username:password@localhost:5432/comparative?schema=public"`

4. Create initial database structure based on the "Metrics" prisma model

`npx prisma migrate dev --name init`

5. Import data from `./prisma/seeds/covid-data.csv`

- Open the file: `prisma/seeds/s.sql`.
- Update the path defined after the `FROM` command to use your file's full path.
- Run the `s.sql` file (I suggest using phadmin sql tool in the newly created Metrics table), this should bring all the csv data to your postgresql database.

## Routes

This project has 2 routes:

### `api/metrics`: single query result

### `api/compare`: 2 query results to be compared
