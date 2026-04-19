CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('principal', 'lateral', 'mobile')),
  ordem INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO banners (id, label, url, tipo, ordem) VALUES
  ('banner-1', 'Banner Principal 1', '/images/BANNER-1.webp', 'principal', 1),
  ('banner-2', 'Banner Principal 2', '/images/BANNER-2.webp', 'principal', 2),
  ('banner-lateral-1', 'Banner Lateral 1', '/images/BANNER-P1.webp', 'lateral', 1),
  ('banner-lateral-2', 'Banner Lateral 2', '/images/BANNER-P2.webp', 'lateral', 2),
  ('banner-mobile-1', 'Banner Mobile 1', '/images/banners/mobile-1.webp', 'mobile', 1),
  ('banner-mobile-2', 'Banner Mobile 2', '/images/banners/mobile-2.webp', 'mobile', 2),
  ('banner-mobile-3', 'Banner Mobile 3', '/images/banners/mobile-3.webp', 'mobile', 3),
  ('banner-mobile-4', 'Banner Mobile 4', '/images/banners/mobile-4.webp', 'mobile', 4)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública" ON banners FOR SELECT USING (true);
CREATE POLICY "Escrita autenticada" ON banners FOR ALL USING (true);

-- Realtime (Supabase Dashboard → Database → Replication, ou executar após criar a tabela)
ALTER TABLE banners REPLICA IDENTITY FULL;

-- Bucket público para uploads
INSERT INTO storage.buckets (id, name, public)
SELECT 'banners', 'banners', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'banners');
