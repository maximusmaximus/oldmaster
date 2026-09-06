create table if not exists fan_works (
  id text primary key,
  title text not null default 'Emoji New Master',
  cols integer not null,
  rows integer not null,
  emoji_text text not null,
  image_jpeg text not null,
  created_at timestamptz not null default now()
);

create index if not exists fan_works_created_at_idx on fan_works (created_at desc);