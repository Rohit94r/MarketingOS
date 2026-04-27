create table if not exists public.users (
  id bigserial primary key,
  email text not null unique,
  password text not null
);

create table if not exists public.posts (
  id bigserial primary key,
  title text not null,
  content text not null,
  is_scheduled boolean not null default false,
  scheduled_day integer,
  scheduled_time text,
  platform text
);

create table if not exists public.action_tasks (
  id bigserial primary key,
  title text not null,
  status text not null check (status in ('completed', 'pending')),
  lift text not null,
  action_button_label text not null
);

create table if not exists public.platform_scores (
  id bigserial primary key,
  platform text not null,
  score integer not null check (score >= 0 and score <= 100)
);

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.action_tasks enable row level security;
alter table public.platform_scores enable row level security;

drop policy if exists "Allow public read posts" on public.posts;
create policy "Allow public read posts"
on public.posts for select
using (true);

drop policy if exists "Allow public read action tasks" on public.action_tasks;
create policy "Allow public read action tasks"
on public.action_tasks for select
using (true);

drop policy if exists "Allow public read platform scores" on public.platform_scores;
create policy "Allow public read platform scores"
on public.platform_scores for select
using (true);

insert into public.posts (title, content, is_scheduled, scheduled_day, scheduled_time, platform)
select * from (
  values
    ('Launch teaser for AI visibility score', 'Introduce the AI visibility score with a simple before-and-after workflow.', true, 3, 'Mon 09:00', 'LinkedIn'),
    ('Competitor tracking carousel', 'Show how MarketingOS turns competitor activity into clear next actions.', true, 7, 'Tue 13:30', 'Instagram'),
    ('Founder POV newsletter', 'Explain why marketing teams need one system for content, analytics, and actions.', true, 11, 'Thu 10:15', 'Email'),
    ('Demo cutdown for paid social', 'Promote a short product demo focused on campaign velocity.', true, 18, 'Fri 16:00', 'YouTube'),
    ('SEO title refresh brief', 'Update page titles around AI marketing operations and campaign planning.', false, null, null, 'Search')
) as seed(title, content, is_scheduled, scheduled_day, scheduled_time, platform)
where not exists (select 1 from public.posts);

insert into public.action_tasks (title, status, lift, action_button_label)
select * from (
  values
    ('Rewrite low-performing product page intro', 'completed', 'Expected lift +8%', 'View'),
    ('Generate 6 paid social launch variants', 'pending', 'Expected lift +14%', 'Generate'),
    ('Schedule competitor response thread', 'pending', 'Expected lift +11%', 'Schedule'),
    ('Refresh SEO title cluster', 'completed', 'Expected lift +17%', 'Review')
) as seed(title, status, lift, action_button_label)
where not exists (select 1 from public.action_tasks);

insert into public.platform_scores (platform, score)
select * from (
  values
    ('ChatGPT', 45),
    ('Google', 60),
    ('Instagram', 30),
    ('YouTube', 50)
) as seed(platform, score)
where not exists (select 1 from public.platform_scores);
