create table if not exists svg_reels (
  id text primary key,
  title text not null,
  cols integer not null,
  rows integer not null,
  fps integer not null default 8,
  frame_count integer not null default 0,
  emoji_text text not null default '',
  poster_jpeg text,
  svg_text text,
  frames_json text,
  pinata_svg_cid text,
  pinata_emoji_cid text,
  pinata_jpeg_cid text,
  pinata_frames_cid text,
  created_at timestamptz not null default now()
);

create index if not exists svg_reels_created_at_idx on svg_reels (created_at desc);
