# Notes Manager

A small Notes API that provides CRUD operations to manage your notes.

## Getting started

- Clone the repository
- Install dependencies

```bash
npm install
```

- Generate SQLite database with Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

- Run the project locally

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see the result or open a Postman and test the endpoints

## Production build

- In case you have the local database created, remove it first if you want a clean database. The location is `prisma/notes.db` or some other name if specified in `.env`

- Then run

```bash
npx prisma generate
npx prisma migrate deploy
```

- To build the project, run

```bash
npm run build
```

- Run the project

```bash
npm start
```

## Testing

The tests are written using Jest

- Run the tests

```bash
npm run test
```

## ESLint

- To check code for linter errors, run a script

```bash
npm run lint
```
