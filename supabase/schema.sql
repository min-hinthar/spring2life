-- Enable pgcrypto for gen_random_uuid (available by default on Supabase, but keep for portability)
create extension if not exists "pgcrypto";

-- Domain enums
create type if not exists public.appointment_status as enum ('pending', 'scheduled', 'cancelled');

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  birth_date date not null,
  gender text not null,
  address text not null,
  occupation text not null,
  emergency_contact_name text not null,
  emergency_contact_number text not null,
  primary_physician text not null,
  insurance_provider text not null,
  insurance_policy_number text not null,
  allergies text,
  current_medication text,
  family_medical_history text,
  past_medical_history text,
  identification_type text,
  identification_number text,
  identification_document_path text,
  identification_document_url text,
  treatment_consent boolean not null default false,
  disclosure_consent boolean not null default false,
  privacy_consent boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  primary_physician text not null,
  reason text not null,
  schedule timestamptz not null,
  status public.appointment_status not null default 'pending',
  note text,
  cancellation_reason text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_patients_user_id on public.patients(user_id);
create index if not exists idx_appointments_user_id on public.appointments(user_id);
create index if not exists idx_appointments_patient_id on public.appointments(patient_id);
create index if not exists idx_appointments_created_at on public.appointments(created_at desc);

-- Storage bucket for identification documents
insert into storage.buckets (id, name, public)
values ('patient-documents', 'patient-documents', true)
on conflict (id) do update set public = true;
