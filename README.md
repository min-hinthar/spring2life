# Spring2Life

Spring2Life is a colorful, mobile-responsive mental health appointment platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabra (Supabase). Patients can create rich profiles, request multiple therapy or psychiatry sessions, and administrators can confirm, cancel, or reschedule every request from an interactive dashboard.

## 🌟 Features

- **Patient registration** – Intake form captures support needs, preferred communication channels, and emergency contacts in Supabase `patients` table.
- **Appointment booking** – Patients can request multiple sessions, specify focus areas, and leave notes that flow directly into Supabase `appointments` table.
- **Admin dashboard** – Live overview with stats plus inline controls to confirm, cancel, or reschedule requests. Updates revalidate the data instantly.
- **Modern UI/UX** – Gradient-heavy layout, responsive cards, and animated controls designed for mobile-first experiences.
- **Supabase powered** – Single source of truth for profile + appointment data, ready for automation, triggers, or edge functions.

## 🧱 Tech Stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase REST API](https://supabase.com/) for data persistence
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form handling

## ⚙️ Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Create a `.env.local` file using `.env.example` as a reference:

```bash
cp .env.example .env.local
```

Fill in your Supabase project details:

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL (`https://YOUR-PROJECT.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon/public key for client rendering
- `SUPABASE_SERVICE_ROLE_KEY` – service role key (used only on the server for admin actions)

3. **Provision the database**

Run the SQL inside `supabase/schema.sql` in your Supabase SQL editor to create the `patients` and `appointments` tables with the required columns.

4. **Start the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the patient flows and `http://localhost:3000/admin` for the dashboard.

## 🗂️ Project Structure

```
app/               → Next.js routes (home + admin)
components/        → Reusable UI pieces and forms
lib/actions        → Server actions for Supabase CRUD operations
lib/supabase.ts    → Minimal REST helper for Supabase
supabase/schema.sql→ SQL blueprint for the database tables
```

## 🧪 Supabase Schemas

- **patients** – stores profile data, emergency contacts, preferences, and care notes.
- **appointments** – stores booking requests, session metadata, current status, and optional cancellation reason.

Both tables ship with row-level security enabled. Configure policies that allow coordinators (service role key) to read/write while limiting public access to the anon key if needed.

## 🤝 Contributions

Issues and pull requests are welcome! Please include screenshots or Loom recordings when proposing UI changes.

