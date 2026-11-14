create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  vocab_collection jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

grant select, insert, update on public.user_progress to authenticated;

create policy "Users can read their own progress"
  on public.user_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own progress"
  on public.user_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
