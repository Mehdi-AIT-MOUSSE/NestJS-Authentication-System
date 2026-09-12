# NestJS Authentication System

JWT authentication API built with NestJS, Drizzle ORM, and PostgreSQL (Neon). It covers registration, email verification, login, refresh tokens, password reset, role-based admin routes, and a simple per-user tasks API.

Interactive docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs) (after the server is running).

## Features

- Register with hashed passwords (bcrypt)
- Email verification via Resend (24-hour token)
- Login with access JWT + httpOnly refresh-token cookie
- Token rotation on refresh
- Logout (clears DB hash + cookie)
- Forgot / reset password (1-hour token)
- Global JWT guard; `@Public()` for open routes
- Role-based access (`user` / `admin`)
- Per-user tasks CRUD
- Rate limiting (global + stricter login / forgot-password)
- Swagger UI and request validation

## Stack

| Layer | Choice |
|---|---|
| Framework | NestJS 11 |
| Database | PostgreSQL (Neon serverless) |
| ORM | Drizzle |
| Auth | `@nestjs/jwt`, bcrypt, cookies |
| Email | Resend |
| Docs | Swagger (`@nestjs/swagger`) |

## Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon or local)
- A [Resend](https://resend.com) API key for verification and reset emails

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000

DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

JWT_ACCESS_SECRET=change-me-access
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=change-me-refresh
JWT_REFRESH_EXPIRES_IN=7d

RESEND_API_KEY=re_xxxxxxxxx
```

Use long, random values for the JWT secrets. `APP_URL` is used in email links (`/api/auth/verify-email` and `/api/auth/reset-password`).

Push the schema to the database:

```bash
npm run db:push
```

Optional:

```bash
npm run db:studio    # Drizzle Studio
npm run db:generate  # generate migrations
npm run db:migrate   # run migrations
```

## Run

```bash
npm run start:dev    # watch mode
npm run start        # production-style start
npm run start:prod   # node dist/main (after npm run build)
```

API base URL: `http://localhost:3000/api`

## Auth flow

1. **Register** — password is hashed; a verification token is stored and emailed. The user is not logged in yet (`isVerified = false`).
2. **Verify email** — `GET /api/auth/verify-email?token=...` marks the user verified and logs them in.
3. **Login** — only verified users. Response body includes `accessToken`; refresh token is set as cookie `refresh_token` and stored hashed in the database.
4. **Protected routes** — send `Authorization: Bearer <accessToken>`.
5. **Refresh** — `POST /api/auth/refresh` reads the cookie, checks it against the DB hash, then issues a new access token and a new refresh token.
6. **Logout** — requires a valid access token; clears the refresh hash and cookie.

Password reset: `forgot-password` always returns a generic message (so emails cannot be enumerated). If the account exists, a 1-hour reset token is emailed.

## Tokens

| Token | Where | Role |
|---|---|---|
| Access JWT | JSON body | Short-lived identity for API calls |
| Refresh JWT | httpOnly cookie + hash in DB | Get a new access token |
| Email verification | DB + email link | Confirm email (24h) |
| Password reset | DB + email link | Change password (1h) |

JWT payload: `sub` (user id), `email`, `role`.

Refresh cookie flags: `httpOnly`, `sameSite: lax`, `secure` in production, max age 7 days.

## API

All routes are under `/api`. Routes without `@Public()` require a Bearer access token.

### Auth

| Method | Path | Auth | Notes |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Body: `name`, `email`, `password` (min 8) |
| `GET` | `/auth/verify-email?token=` | Public | Auto-login on success |
| `POST` | `/auth/login` | Public | Max 5 requests / minute |
| `POST` | `/auth/refresh` | Public (cookie) | Uses `refresh_token` cookie |
| `POST` | `/auth/logout` | Bearer | Invalidates refresh token |
| `GET` | `/auth/me` | Bearer | Current user profile |
| `POST` | `/auth/forgot-password` | Public | Max 3 requests / minute. Body: `email` |
| `POST` | `/auth/reset-password` | Public | Body: `token`, `password` (min 8) |

### Tasks (authenticated user, own tasks only)

| Method | Path |
|---|---|
| `GET` | `/tasks` |
| `POST` | `/tasks` — body: `title`, optional `description` |
| `PATCH` | `/tasks/:id` |
| `DELETE` | `/tasks/:id` |

### Admin (`role = admin`)

| Method | Path |
|---|---|
| `GET` | `/admin/users` |
| `DELETE` | `/admin/users/:id` |

New users default to `role: user`. Promote a user to admin in the database if you need these routes.

## Rate limiting

- Global: 20 requests per minute per IP
- Login: 5 per minute
- Forgot password: 3 per minute

## Scripts

```bash
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
npm run db:push
```

## Project layout

```
src/
  auth/          Register, login, tokens, email
  users/         User persistence
  tasks/         Per-user tasks
  admin/         Admin-only user management
  common/        JWT + roles guards, decorators, exception filter
  db/            Drizzle schema and client
  main.ts        Bootstrap, cookies, Swagger, global prefix
```

Guards are registered globally in `AppModule`: throttling, JWT, then roles.
