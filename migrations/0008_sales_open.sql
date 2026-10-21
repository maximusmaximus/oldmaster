-- Open book sales. Caps, kill switches, and the admin toggle still apply.
-- Runs once. Turning sales off later (admin or kill switch) is not overwritten.
insert into store_settings (key, value) values
  ('ORDERS_ENABLED', 'true'),
  ('KILL_REASON', '')
on conflict (key) do update set value = excluded.value;
