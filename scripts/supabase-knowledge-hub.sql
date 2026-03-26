-- ============================================================
-- SUPPLIED KNOWLEDGE HUB — SUPABASE SETUP
-- Run this in your Supabase SQL editor (supabase.com → SQL Editor)
-- ============================================================

-- 1. Enable pgvector extension
create extension if not exists vector;

-- 2. Create the knowledge base table
create table if not exists knowledge_hub (
  id bigserial primary key,
  question text not null,
  answer text not null,
  category text,
  embedding vector(1536),
  created_at timestamp with time zone default now()
);

-- 3. Create an index for fast similarity search
create index if not exists knowledge_hub_embedding_idx
  on knowledge_hub
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 4. Create the similarity search function
create or replace function match_knowledge(
  query_embedding vector(1536),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id bigint,
  question text,
  answer text,
  category text,
  similarity float
)
language sql stable
as $$
  select
    knowledge_hub.id,
    knowledge_hub.question,
    knowledge_hub.answer,
    knowledge_hub.category,
    1 - (knowledge_hub.embedding <=> query_embedding) as similarity
  from knowledge_hub
  where 1 - (knowledge_hub.embedding <=> query_embedding) > match_threshold
  order by knowledge_hub.embedding <=> query_embedding
  limit match_count;
$$;

-- 5. Enable Row Level Security
alter table knowledge_hub enable row level security;

-- 6. Allow public read (for the RPC function)
create policy "Public read access"
  on knowledge_hub for select
  using (true);

-- 7. Allow authenticated insert (for the ingestion script)
create policy "Authenticated insert"
  on knowledge_hub for insert
  with check (true);

-- ============================================================
-- DONE. Next: run the ingestion script to populate the table.
-- npx tsx scripts/ingest-knowledge-hub.ts
-- ============================================================
