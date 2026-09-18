# Task Tracker

A responsive task management app built with Next.js, TypeScript, Prisma, and Supabase Auth. Tasks are stored in a cloud-hosted PostgreSQL database (Neon) and all data access goes through Next.js API routes.

## Live demo

https://task-tracker-web-app-omega.vercel.app

## Features

- Email/password authentication (signup, login, logout) via Supabase Auth
- Create, edit, delete tasks
- Task fields: title, description, priority (Low/Medium/High), status (To Do / In Progress / Done), due date
- Change task status via dropdown
- Dashboard stats: counts per status + overdue tasks highlighted
- Responsive layout for mobile (375px) and desktop (1280px+)

## Tech stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Auth**: Supabase Auth (`@supabase/ssr`)
- **Database**: Neon (PostgreSQL), accessed via Prisma ORM
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint with `eslint-plugin-prettier`, `eslint-plugin-sonarjs`, `eslint-plugin-jsx-a11y`, `eslint-config-prettier`

## Architecture

- **Atomic Design** component structure: `components/atoms`, `molecules`, `organisms`, `templates`, `pages`
- **API layer**: Next.js route handlers under `app/api/tasks`. UI components never talk to the database directly.
- **Auth separation**: Supabase is used for identity only; user records are mirrored into the `users` table on first authenticated request, and tasks reference that row via a foreign key.

## Data model

Two tables linked by a foreign key:

- `users` — id, email, createdAt
- `tasks` — id, title, description, priority, status, dueDate, userId → users.id

## Local setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values (see below).

3. Push the Prisma schema to the database:

   ```bash
   npx prisma db push
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 and create an account.

## Environment variables

| Variable                        | Description                                              |
| ------------------------------- | -------------------------------------------------------- |
| `DATABASE_URL`                  | Pooled PostgreSQL connection string (Neon)               |
| `DIRECT_URL`                    | Direct PostgreSQL connection string (used by Prisma CLI) |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon key                            |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npx prisma db push` — sync schema to database

## Known limitations

- Row Level Security (RLS) is not enabled on Supabase tables, because data lives in Neon and is accessed through Prisma on the server. Authorization is enforced in the API layer via ownership checks (`userId` match) on every task mutation.
- No drag-and-drop for status changes; a dropdown is used instead.
- Email confirmation is disabled in Supabase for ease of testing.
- No pagination — all tasks are fetched in a single request. Fine for the scope of this project, but would need pagination at scale.
