# Hunter — Job Application Tracker

Hunter is a full-stack web app for tracking job applications: add, edit, filter, search, and monitor your applications through a stats dashboard. Built as a monorepo with a React/TypeScript frontend and a Node/Express/TypeScript backend backed by PostgreSQL.

- **Live app:** [hunter-job-tracker.vercel.app](https://hunter-job-tracker.vercel.app)
- **Repository:** [github.com/zinebh12/Hunter](https://github.com/zinebh12/Hunter)

## Features

- **Authentication** — register/login with email + password, sessions handled via HTTP-only JWT cookies (no tokens exposed to client JS)
- **Job application CRUD** — create, view, edit, delete applications (company, position, location, status, date applied, salary, notes)
- **Bulk delete** — remove multiple applications at once
- **Search & filters** — search by company/position/location, filter by status and location
- **Pagination** — server-side paginated application lists
- **Dashboard statistics** — total, active, applied, interview, offer, and rejected counts, computed server-side
- **Protected routes** — dashboard and application detail pages require an authenticated session
- **Toast notifications & loading/empty states** for a polished UX

## Tech Stack

**Frontend**
- React 19 + TypeScript, built with Vite
- React Router (client-side routing incl. protected routes)
- Tailwind CSS 4
- Radix UI primitives, `class-variance-authority`, `tailwind-merge` (shadcn-style components)
- Zod (client-side form validation, mirrors backend schemas)
- Font Awesome / Lucide icons, Motion (animations)

**Backend**
- Node.js + Express 5, written in TypeScript
- PostgreSQL via `pg` (raw SQL queries, parameterized)
- JWT authentication (`jsonwebtoken`) stored in HTTP-only cookies
- `bcrypt` for password hashing
- Zod for request validation
- `cors` + `cookie-parser` for cross-origin cookie-based auth

**Deployment**
- Both frontend and backend are deployed on Vercel as separate projects; the frontend proxies `/api/*` requests to the backend via `vercel.json` rewrites.

## Project Structure

```
Hunter/
├── backend/
│   ├── schemas/                # Zod validation schemas (auth, applications)
│   ├── src/
│   │   ├── controllers/        # Route handlers (auth, applications)
│   │   ├── middleware/         # JWT auth middleware, error handler
│   │   ├── routes/             # Express routers
│   │   ├── db.ts               # PostgreSQL connection pool
│   │   └── server.ts           # App entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # UI components (forms, cards, filters, states)
    │   ├── context/             # Auth context
    │   ├── hooks/               # useAuth, useApplications
    │   ├── pages/               # Dashboard, Login, Register, ApplicationDetails
    │   ├── routes/              # ProtectedRoute
    │   ├── schema/               # Zod schemas (mirrors backend)
    │   ├── services/            # API client functions (fetch wrappers)
    │   └── types/                # Shared TypeScript types
    └── package.json
```

## API Overview

All `/api/applications/*` routes require authentication (JWT cookie).

| Method | Endpoint                  | Description                              |
|--------|----------------------------|-------------------------------------------|
| POST   | `/api/auth/register`       | Create a new user account                |
| POST   | `/api/auth/login`          | Log in, sets an HTTP-only JWT cookie     |
| POST   | `/api/auth/logout`         | Clear the session cookie                 |
| GET    | `/api/auth/user`           | Get the current authenticated user       |
| GET    | `/api/applications`        | List applications (supports `page`, `limit`, `search`, `status`, `location`) + stats |
| GET    | `/api/applications/:id`    | Get a single application                 |
| POST   | `/api/applications`        | Create a new application                 |
| PATCH  | `/api/applications/:id`    | Update an application                    |
| DELETE | `/api/applications/:id`    | Delete a single application              |
| DELETE | `/api/applications`        | Bulk delete applications (`{ ids: number[] }`) |

## Getting Started

### Prerequisites
- Node.js
- A PostgreSQL database (e.g. local Postgres, Supabase, Neon, or Railway)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
DB_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=<a-long-random-secret>
FRONTEND_URL=http://localhost:5173
PORT=5000
```

You'll need an `applications` table (company, position, location, status, date_applied, salary, notes, user_id, created_at) and a `users` table (email, password_hash, created_at) in your database.

Run the backend in dev mode:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

By default the frontend expects the API to be reachable at `/api/*` — in local development, configure a Vite proxy (or run the backend on the same origin) so requests reach your local backend; in production this is handled by the `vercel.json` rewrite to the backend's deployed URL.

```bash
npm run build     # production build
npm run lint       # run ESLint
```

## Notes

- Passwords are hashed with bcrypt before storage; the JWT is only ever transmitted via an HTTP-only, `secure`, `sameSite=lax` cookie.
- All application queries are scoped to the authenticated `user_id`, so users only ever see their own data.
- Input validation is enforced with Zod on both the client (for instant feedback) and the server (as the source of truth).