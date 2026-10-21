-- Emoji Old Masters storefront (additive only). Sales ship OFF.
create table if not exists store_settings (
  key text primary key,
  value text not null
);
insert into store_settings (key, value) values
  ('ORDERS_ENABLED', 'false'),
  ('KILL_REASON', ''),
  ('MAX_RPI_ORDERS_PER_DAY', '5'),
  ('MAX_RPI_EXPOSURE_USD_PER_DAY', '550'),
  ('NEXT_ORDER_SEQ', '4')
on conflict (key) do nothing;

create table if not exists store_quotes (
  id text primary key,
  address_json text not null,
  options_json text not null,
  created_at timestamptz not null default now()
);

create table if not exists store_orders (
  id text primary key,
  state text not null,
  quote_id text references store_quotes(id),
  ship_tier text,
  quoted_shipping_cents integer,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  customer_order_id text unique,
  rpi_attempt integer not null default 0,
  rpi_status text,
  rpi_next_retry_at timestamptz,
  address_json text,
  amount_subtotal_cents integer,
  amount_total_cents integer,
  amount_tax_cents integer,
  amount_shipping_cents integer,
  cancel_deadline_utc timestamptz,
  deferred_until_utc timestamptz,
  paid_at timestamptz,
  locked_at timestamptz,
  shipped_at timestamptz,
  tracking_json text,
  risk_level text,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists store_orders_state_idx on store_orders (state);

create table if not exists store_stripe_events (
  event_id text primary key,
  type text,
  received_at timestamptz not null default now()
);

create table if not exists store_rpi_events (
  body_sha256 text primary key,
  customer_order_id text,
  received_at timestamptz not null default now()
);

create table if not exists store_reprint_requests (
  id text primary key,
  order_id text not null references store_orders(id),
  description text not null,
  decision text,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create table if not exists store_audit (
  id bigserial primary key,
  order_id text,
  from_state text,
  to_state text,
  actor text,
  note text,
  at timestamptz not null default now()
);

create table if not exists store_alerts (
  id bigserial primary key,
  level text not null,
  message text not null,
  order_id text,
  resolved boolean not null default false,
  at timestamptz not null default now()
);

create table if not exists store_counters (
  name text primary key,
  window_start timestamptz not null,
  count integer not null
);
