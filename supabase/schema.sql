create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email citext not null unique,
  phone text not null,
  birth_date date,
  gender text,
  support_needs text,
  personal_story text,
  preferred_language text default 'English',
  emergency_contact_name text,
  emergency_contact_phone text,
  preferred_communication text,
  care_team_notes text
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  specialty text not null,
  modalities text[] default '{}',
  bio text,
  accepts_new_clients boolean default true,
  seniority int default 1,
  virtual_only boolean default false,
  credentials text
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email citext not null unique,
  full_name text,
  role text not null default 'patient',
  provider_id uuid references public.providers(id),
  patient_id uuid references public.patients(id)
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
alter table public.providers enable row level security;
alter table public.profiles enable row level security;

-- Starter data for local testing
insert into public.providers (id, full_name, specialty, modalities, bio, accepts_new_clients, seniority, virtual_only, credentials)
values
  (gen_random_uuid(), 'Dr. Lar Khine', 'Trauma therapist', '{EMDR, Somatic grounding}', 'Grounded trauma therapist leading bilingual care.', true, 5, false, 'LICSW, CCTP'),
  (gen_random_uuid(), 'Dr. Maya Lwin', 'Psychiatrist', '{Medication management, Sleep coaching}', 'Psychiatrist focused on stabilizing medication plans with warmth.', true, 8, true, 'MD, MPH'),
  (gen_random_uuid(), 'Ko Htet', 'Mindfulness coach', '{Breathwork, Mindfulness}', 'Coach specializing in burn out recovery and mindful routines.', true, 3, true, 'Mindfulness Educator'),
  (gen_random_uuid(), 'Daw Sar Yu', 'Peer supporter', '{Peer mentoring, Crisis de-escalation}', 'Peer advocate with community-based healing experience.', true, 4, false, 'Peer Support Certified')
  on conflict do nothing;

insert into public.patients (id, full_name, email, phone, birth_date, gender, support_needs, personal_story, preferred_language, emergency_contact_name, emergency_contact_phone, preferred_communication, care_team_notes)
values
  (gen_random_uuid(), 'Thandar Aye', 'patient@test.com', '+959111111', '1993-01-10', 'Female', 'Anxiety spikes at night, seeking grounding strategies.', 'Navigating work transitions and nighttime anxiety while caring for family.', 'English', 'Daw Hnin', '+959999999', 'SMS text', 'Prefers audio summaries after sessions.'),
  (gen_random_uuid(), 'Ko Myint', 'provider@test.com', '+959222222', '1988-04-12', 'Male', 'Managing panic while supporting siblings.', 'Looking for coping skills that fit an unpredictable schedule.', 'Burmese', 'Mya', '+959777777', 'WhatsApp', 'Open to evening sessions.')
  on conflict do nothing;

-- Demo profiles with roles
insert into public.profiles (email, full_name, role)
values
  ('admin@test.com', 'Coordinated Care Admin', 'admin'),
  ('patient@test.com', 'Thandar Aye', 'patient'),
  ('provider@test.com', 'Ko Myint', 'provider')
  on conflict do nothing;

-- Demo appointments
insert into public.appointments (patient_id, provider, specialty, session_type, focus_area, scheduled_at, duration_minutes, status, note)
select p.id, 'Dr. Lar Khine', 'Trauma therapist', 'Individual Therapy', 'Anxiety & grounding', now() + interval '1 day', 60, 'pending', 'Prefers evening slots'
from public.patients p where p.email = 'patient@test.com'
on conflict do nothing;
