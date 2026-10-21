alter table fan_works add column if not exists hidden boolean not null default false;

create table if not exists fan_hidden (
  id text primary key,
  hidden_at timestamptz not null default now()
);
