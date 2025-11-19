create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email citext not null unique,
  phone text not null,
  birth_date date,
  gender text,
  support_needs text,
  emergency_contact_name text,
  emergency_contact_phone text,
  preferred_communication text,
  care_team_notes text
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider text not null,
  specialty text not null,
  session_type text not null,
  focus_area text,
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 60,
  status text not null default 'pending',
  note text,
  cancellation_reason text
);

alter table public.appointments enable row level security;
alter table public.patients enable row level security;
