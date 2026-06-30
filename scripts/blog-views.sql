-- Jalankan ini di Supabase Dashboard > SQL Editor > New Query > Run
-- Project: https://jltdidqhdqdsyiakdaqy.supabase.co

create table if not exists blog_views (
  slug text primary key,
  view_count integer not null default 0,
  last_viewed_at timestamptz
);

alter table blog_views enable row level security;

-- Publik boleh baca semua baris (untuk tampilkan jumlah view di listing blog)
drop policy if exists "Public can read blog views" on blog_views;
create policy "Public can read blog views" on blog_views
  for select using (true);

-- Increment dilakukan lewat function (security definer) — tidak ada akses
-- insert/update langsung dari publishable key, jadi lebih aman dari abuse.
create or replace function increment_blog_view(p_slug text)
returns table(view_count integer, last_viewed_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into blog_views (slug, view_count, last_viewed_at)
  values (p_slug, 1, now())
  on conflict (slug) do update
    set view_count = blog_views.view_count + 1,
        last_viewed_at = now();

  return query select bv.view_count, bv.last_viewed_at from blog_views bv where bv.slug = p_slug;
end;
$$;

grant execute on function increment_blog_view(text) to anon, authenticated;
