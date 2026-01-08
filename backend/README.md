# MPCircle — Backend

This repository contains the backend for the MPCircle application (NestJS + Prisma). This README is written for other developers who want to set up, run, test, and contribute to the project locally.

> Quick summary: a NestJS API using Prisma to talk to a PostgreSQL database. The Prisma seed script (prisma/seed.ts) creates 4 categories and at least 22 products (each product has inventory > 10) and is safe to run multiple times.

Table of contents
- Project overview
- Tech stack
- Prerequisites
- Environment variables
- Local setup
  - Install dependencies
  - Database: create & migrate
  - Generate Prisma client
  - Seeding the database
- Running the application
- Running tests & lint
- Seed details and idempotency
- Troubleshooting
- Contributing
- Contact


Project overview
----------------
This service is a NestJS backend exposing endpoints to manage users, products, categories, and sales. Prisma is used as the ORM against a PostgreSQL database. The included Prisma seed script populates categories and products for local development and testing.

Tech stack
----------
- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Jest (tests)

Prerequisites
-------------
- Node.js (LTS recommended)
- npm (bundled with Node) or yarn
- A running PostgreSQL instance and a valid connection URL

Environment variables
---------------------
Create a `.env` file in the repository root (same directory as package.json). At minimum set:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

Replace USER/PASSWORD/HOST/PORT/DATABASE with your PostgreSQL credentials.

Local setup
-----------
1. Install dependencies

```bash
npm install
```

2. Ensure your `.env` exists and `DATABASE_URL` points to a reachable PostgreSQL database.

3. Generate the Prisma client (required after updating the schema):

```bash
npx prisma generate
```

4. Run migrations

- For local development (creates or applies migrations and updates the local DB):

```bash
npx prisma migrate dev
```

- For CI / production deployments (apply existing migrations):

```bash
npx prisma migrate deploy
```

5. Seed the database

The project has a TypeScript seed script at `prisma/seed.ts`. It:
- Upserts 4 categories: `Electronics`, `Clothing`, `Home`, `Books`.
- Creates 22 products (grouped into these 4 categories) with `inventory` set > 10.
- Uses `createMany({ skipDuplicates: true })` so it is idempotent.
- The seed file uses `@prisma/adapter-pg` and `pg` to create a pool-based adapter for the Prisma client.

You can run the seed script directly with ts-node (devDependencies include `ts-node`):

```bash
npx ts-node prisma/seed.ts
```

Or, if you'd prefer to hook it into Prisma's native seeding mechanism, you can update `package.json` and `prisma/schema.prisma`'s `seed` config to run the compiled script or a Node entry point. The current project does not rely on the prisma "db seed" config by default.


Running the application
-----------------------
- Start in development (watch mode):

```bash
npm run start:dev
```

- Build and run a production build:

```bash
npm run build
npm run start:prod
```

