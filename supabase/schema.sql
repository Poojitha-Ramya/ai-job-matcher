-- Supabase Database Schema for AI Job Matcher
-- Execute this script in your Supabase SQL Editor.

-- Enable UUID generation extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. USER PROFILES
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  skills text,
  ats_score integer default 0,
  resume_url text,
  resume_name text,
  experience_level text default 'Freshman/Student',
  preferred_role text,
  preferred_location text,
  job_type text default 'All',
  trials_used integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for user_profiles
alter table public.user_profiles enable row level security;

-- Policies for user_profiles
create policy "Users can view their own profile" 
  on public.user_profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.user_profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.user_profiles for insert 
  with check (auth.uid() = id);

-- 2. SAVED JOBS
create table if not exists public.saved_jobs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  company text not null,
  location text,
  skills text,
  url text not null,
  score text,
  saved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Add a unique constraint to avoid duplicate bookmarks for the same user and URL
  constraint unique_user_job_url unique (user_id, url)
);

-- Enable RLS for saved_jobs
alter table public.saved_jobs enable row level security;

-- Policies for saved_jobs
create policy "Users can manage their saved jobs" 
  on public.saved_jobs for all 
  using (auth.uid() = user_id);

-- 3. SEARCH HISTORY
create table if not exists public.search_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  query text,
  role text,
  location text,
  job_type text,
  experience_level text,
  searched_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for search_history
alter table public.search_history enable row level security;

-- Policies for search_history
create policy "Users can manage their search history" 
  on public.search_history for all 
  using (auth.uid() = user_id);

-- 4. CACHED JOB RESULTS
create table if not exists public.cached_job_results (
  id uuid primary key default uuid_generate_v4(),
  query_hash text not null unique,
  jobs jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null
);

-- Enable RLS for cached_job_results
alter table public.cached_job_results enable row level security;

-- Policies for cached_job_results
create policy "Anyone can read cached job results" 
  on public.cached_job_results for select 
  using (true);

create policy "Authenticated users can insert cached job results" 
  on public.cached_job_results for insert 
  with check (auth.role() = 'authenticated');

-- 5. TRIGGER FOR NEW USER SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), 
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, user_profiles.full_name),
      avatar_url = coalesce(excluded.avatar_url, user_profiles.avatar_url);
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger to sync users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
