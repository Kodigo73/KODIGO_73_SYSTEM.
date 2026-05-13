create table items (

id bigint generated always as identity primary key,

title text,
url text,
category text,
created_at timestamp with time zone default now()

);
alter table items enable row level security;
create policy "public select"
on items
for select
to anon
using (true);
create policy "public insert"
on items
for insert
to anon
with check (true);
