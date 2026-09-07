# ERP Lite Backend

Node.js + TypeScript backend for ERP Lite, using Express, TypeORM and PostgreSQL.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

The API runs on `http://localhost:4000` by default.

Before starting the API, create a local PostgreSQL database and update `.env` with your own credentials:

```bash
createdb erp_lite
```

Example local database settings:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_DATABASE=erp_lite
DB_SSL=false
DB_SYNCHRONIZE=true
```

For development, `DB_SYNCHRONIZE=true` lets TypeORM create tables automatically from the entities. For production, turn it off and use migrations.

## Useful Scripts

- `npm run dev` - start the API in watch mode.
- `npm run build` - compile TypeScript into `dist`.
- `npm start` - run the compiled server.
- `npm run lint` - run ESLint.
- `npm run db:seed` - seed development data.
- `npm run migration:generate -- src/database/migrations/NameOfMigration` - generate a TypeORM migration.
- `npm run migration:run` - apply migrations.

## Project Layout

```text
src/
  app.ts                  Express app composition
  server.ts               Process bootstrap
  common/                 Shared errors, middleware and helpers
  config/                 Environment and TypeORM configuration
  database/               Seed data and migration directory
  modules/                Feature modules and routes
```

## API Surface

- `GET /health`
- `GET /api/v1/employees`
- `GET /api/v1/vendors`
- `GET /api/v1/requests`
- `PATCH /api/v1/requests/:id/status`
- `GET /api/v1/payments`
- `PATCH /api/v1/payments/:id/status`
- `GET /api/v1/accounts`
- `GET /api/v1/journal-entries`
- `GET /api/v1/audit-logs`
- `GET /api/v1/dashboard/summary`

All write endpoints validate request bodies with Zod before touching the database.
