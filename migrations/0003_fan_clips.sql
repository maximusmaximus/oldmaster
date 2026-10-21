alter table fan_works add column if not exists kind text not null default 'still';
alter table fan_works add column if not exists video_b64 text;
alter table fan_works add column if not exists video_mime text;
