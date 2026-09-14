# NestJS Authentication System

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS 11" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  A complete authentication API built with NestJS, Drizzle ORM, and PostgreSQL.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-endpoints">API</a> •
  <a href="#project-structure">Structure</a>
</p>

---

## Overview

This project is a complete authentication system built with **NestJS 11**, **TypeScript**, **Drizzle ORM**, and **PostgreSQL using Neon**.

It includes user registration, email verification, login, JWT access and refresh tokens, password reset, role-based authorization, and a simple tasks API.

The project also includes Swagger documentation, request validation, rate limiting, and secure refresh-token handling.

<p align="center">
  <img src="Flow_Graphs_imges/NestJS_Authentication_System.jpeg" alt="NestJS Authentication System overview" width="800" />
</p>
<p align="center">
  <i>High-level overview of the authentication system.</i>
</p>

## Features

* User registration
* Password hashing with bcrypt
* Email verification using Resend
* Login with access and refresh tokens
* HTTP-only refresh-token cookies
* Refresh-token rotation
* Logout and refresh-token invalidation
* Forgot-password functionality
* Password reset with expiring tokens
* Global JWT authentication guard
* Public routes using `@Public()`
* Current user decorator using `@CurrentUser()`
* Role-based authorization: `user` and `admin`
* Per-user tasks CRUD
* Global and route-specific rate limiting
* Swagger API documentation
* DTO validation with `ValidationPipe`
* PostgreSQL database with Drizzle ORM
* Neon serverless PostgreSQL support

## Tech Stack

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
  <a href="https://orm.drizzle.team/">
    <img src="https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  </a>
  <a href="https://neon.tech/">
    <img src="https://img.shields.io/badge/Neon-000000?style=for-the-badge&logo=neon&logoColor=white" alt="Neon" />
  </a>
  <a href="https://jwt.io/">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  </a>
  <a href="https://resend.com/">
    <img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" />
  </a>
  <a href="https://swagger.io/">
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
  </a>
</p>

| Category          | Technology      |
| ----------------- | --------------- |
| Framework         | NestJS 11       |
| Language          | TypeScript      |
| Database          | PostgreSQL      |
| Database provider | Neon            |
| ORM               | Drizzle ORM     |
| Authentication    | JWT             |
| Password hashing  | bcryptjs        |
| Email provider    | Resend          |
| API documentation | Swagger         |
| Validation        | class-validator |
| Cookies           | cookie-parser   |

## Prerequisites

Before running the project, install:

* Node.js 18 or newer
* npm
* Git
* A PostgreSQL database
* A Neon account or local PostgreSQL installation
* A Resend API key

## Installation

Clone the repository:

```bash
git clone https://github.com/Mehdi-AIT-MOUSSE/NestJS-Authentication-System
```

Move into the project directory:

```bash
cd NestJS-Authentication-System
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000

DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

JWT_ACCESS_SECRET=your-long-random-access-secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your-long-random-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

RESEND_API_KEY=re_xxxxxxxxx
```

Use long and random values for the JWT secrets.

You can generate a secure secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

> Do not commit your `.env` file to GitHub.

Make sure your `.gitignore` contains:

```gitignore
node_modules
dist
.env
.env.*
!.env.example
```

## Database Setup

Push the Drizzle schema to your database:

```bash
npm run db:push
```

Generate migrations:

```bash
npm run db:generate
```

Run migrations:

```bash
npm run db:migrate
```

Open Drizzle Studio:

```bash
npm run db:studio
```

## Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

Start the application normally:

```bash
npm run start
```

Build the application:

```bash
npm run build
```

Run the production build:

```bash
npm run start:prod
```

The API will be available at:

```text
http://localhost:3000/api
```

Swagger documentation will be available at:

```text
http://localhost:3000/api/docs
```

## Authentication Flow

<p align="center">
  <img src="Flow_Graphs_imges/Authentication_flow.jpeg" alt="Authentication flow diagram" width="800" />
</p>
<p align="center">
  <i>End-to-end authentication flow: register, verify email, login, and access protected routes.</i>
</p>

### 1. Register

The user sends their name, email, and password.

The application:

1. Checks whether the email already exists.
2. Hashes the password with bcrypt.
3. Creates an email verification token.
4. Stores the token in the database.
5. Sends a verification email.
6. Creates the user with `isVerified = false`.

### 2. Verify Email

The user opens the verification link:

```text
GET /api/auth/verify-email?token=YOUR_TOKEN
```

The application:

1. Checks the verification token.
2. Checks whether the token has expired.
3. Marks the user as verified.
4. Removes the verification token.
5. Generates access and refresh tokens.
6. Stores the refresh-token hash.
7. Sets the refresh token in an HTTP-only cookie.

### 3. Login

The user sends their email and password.

The application:

1. Finds the user by email.
2. Compares the password with the stored hash.
3. Checks whether the email is verified.
4. Generates access and refresh tokens.
5. Stores the refresh-token hash.
6. Sets the refresh token in a cookie.
7. Returns the access token.

### 4. Access Protected Routes

Send the access token in the request header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 5. Refresh Tokens

<p align="center">
  <img src="Flow_Graphs_imges/Token_refresh_flow.jpeg" alt="Token refresh flow diagram" width="800" />
</p>
<p align="center">
  <i>Refresh-token rotation: the cookie token is verified, compared with the stored hash, and replaced.</i>
</p>

When the access token expires:

1. The refresh token is read from the cookie.
2. The token signature and expiration are checked.
3. The user is found in the database.
4. The token is compared with the stored hash.
5. A new access token and refresh token are generated.
6. The refresh-token cookie is replaced.

### 6. Logout

Logout:

* Removes the refresh-token hash from the database.
* Clears the `refresh_token` cookie.
* Makes the previous refresh token unusable.

## Token Types

| Token                    | Location                | Purpose                    | Expiration |
| ------------------------ | ----------------------- | -------------------------- | ---------- |
| Access JWT               | JSON response           | Access protected routes    | 15 minutes |
| Refresh JWT              | HTTP-only cookie        | Generate new access tokens | 7 days     |
| Email verification token | Database and email link | Verify email address       | 24 hours   |
| Password reset token     | Database and email link | Reset password             | 1 hour     |

Example JWT payload:

```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "role": "user"
}
```

The refresh-token cookie uses:

* `httpOnly: true`
* `sameSite: lax`
* `secure: true` in production
* A maximum age of 7 days

## API Endpoints

All routes use the `/api` prefix.

### Authentication

| Method | Endpoint                    | Access         | Description              |
| ------ | --------------------------- | -------------- | ------------------------ |
| `POST` | `/auth/register`            | Public         | Register a user          |
| `GET`  | `/auth/verify-email?token=` | Public         | Verify email and log in  |
| `POST` | `/auth/login`               | Public         | Login                    |
| `POST` | `/auth/refresh`             | Refresh cookie | Get a new access token   |
| `POST` | `/auth/logout`              | Bearer token   | Logout                   |
| `GET`  | `/auth/me`                  | Bearer token   | Get the current user     |
| `POST` | `/auth/forgot-password`     | Public         | Request a password reset |
| `POST` | `/auth/reset-password`      | Public         | Reset the password       |

### Register Request

```http
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Request

```http
POST /api/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tasks

Authenticated users can manage their own tasks.

| Method   | Endpoint     | Description          |
| -------- | ------------ | -------------------- |
| `GET`    | `/tasks`     | Get the user's tasks |
| `POST`   | `/tasks`     | Create a task        |
| `PATCH`  | `/tasks/:id` | Update a task        |
| `DELETE` | `/tasks/:id` | Delete a task        |

Example task request:

```http
POST /api/tasks
```

```json
{
  "title": "Learn NestJS",
  "description": "Study guards and authentication"
}
```

### Admin

Admin routes require the `admin` role.

| Method   | Endpoint           | Description   |
| -------- | ------------------ | ------------- |
| `GET`    | `/admin/users`     | Get all users |
| `DELETE` | `/admin/users/:id` | Delete a user |

New users receive the `user` role by default.

To access admin routes, update the user's role in the database:

```text
role = admin
```

## Rate Limiting

The application uses rate limiting to reduce abuse.

| Scope           | Limit                         |
| --------------- | ----------------------------- |
| Global requests | 20 requests per minute per IP |
| Login           | 5 requests per minute         |
| Forgot password | 3 requests per minute         |

## Security

* Passwords are hashed with bcrypt.
* JWT secrets are stored in environment variables.
* Refresh tokens are stored as hashes in the database.
* Refresh tokens are stored in HTTP-only cookies.
* Protected routes require a valid access token.
* Login and password-reset routes are rate-limited.
* Email verification tokens expire after 24 hours.
* Password reset tokens expire after 1 hour.
* Password-reset requests return a generic message to prevent email enumeration.
* The `.env` file must not be committed to Git.

## Project Structure

```text
src/
├── auth/
│   ├── dto/
│   ├── decorators/
│   ├── guards/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── email.service.ts
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── tasks/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
│
├── admin/
│   ├── admin.controller.ts
│   ├── admin.service.ts
│   └── admin.module.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   └── filters/
│
├── db/
│   ├── schema.ts
│   └── index.ts
│
├── app.module.ts
└── main.ts
```

Global guards are registered in `AppModule` in this order:

```text
Rate limiting → JWT authentication → Role authorization
```

<p align="center">
  <img src="Flow_Graphs_imges/Guard_flow.jpeg" alt="Guard flow diagram" width="800" />
</p>
<p align="center">
  <i>Request pipeline: rate limiting, JWT authentication (with <code>@Public()</code> bypass), and role authorization.</i>
</p>

## Available Scripts

```bash
npm run start
npm run start:dev
npm run start:prod
npm run build
npm run lint
npm run db:push
npm run db:studio
npm run db:generate
npm run db:migrate
```

## Resources

Official documentation for the technologies used in this project:

| Resource                                                              | Description                            |
| ---------------------------------------------------------------------- | --------------------------------------- |
| [NestJS Documentation](https://docs.nestjs.com/)                       | Framework used to build the API         |
| [TypeScript Documentation](https://www.typescriptlang.org/docs/)       | Language used across the project        |
| [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)    | ORM used to interact with PostgreSQL    |
| [PostgreSQL Documentation](https://www.postgresql.org/docs/)           | Relational database                     |
| [Neon Documentation](https://neon.tech/docs/introduction)              | Serverless PostgreSQL provider          |
| [JWT Introduction](https://jwt.io/introduction)                        | JSON Web Token authentication           |
| [@nestjs/jwt](https://github.com/nestjs/jwt)                           | JWT module used for NestJS              |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)                     | Password hashing library                |
| [Resend Documentation](https://resend.com/docs)                        | Transactional email provider            |
| [Swagger / OpenAPI](https://swagger.io/docs/)                          | API documentation                       |
| [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)        | Swagger integration for NestJS          |
| [class-validator](https://github.com/typestack/class-validator)        | DTO validation                          |
| [class-transformer](https://github.com/typestack/class-transformer)    | DTO transformation                      |
| [@nestjs/throttler](https://docs.nestjs.com/security/rate-limiting)    | Rate limiting                           |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser)           | Cookie parsing middleware               |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)              | Migration and schema management CLI     |


