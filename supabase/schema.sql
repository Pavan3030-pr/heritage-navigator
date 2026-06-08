-- Heritage Navigator Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.

-- ─── LANDMARKS ───────────────────────────────────────────────────────────────
create table if not exists public.landmarks (
  id          text primary key,          -- slug, e.g. "victoria-memorial"
  name        text not null,
  category    text not null,
  location    text not null,
  description text not null,             -- shortDescription shown on cards
  significance text not null,
  image_url   text not null,
  -- extended fields stored as JSON so the schema stays lean
  overview    text,
  facts       jsonb default '[]'::jsonb,
  timeline    jsonb default '[]'::jsonb,
  related     jsonb default '[]'::jsonb,
  created_at  timestamptz default now()
);

alter table public.landmarks enable row level security;
create policy "public read landmarks" on public.landmarks for select using (true);

-- ─── ROUTES ──────────────────────────────────────────────────────────────────
create table if not exists public.routes (
  id             uuid primary key default gen_random_uuid(),
  interests      text[]    not null,
  generated_route jsonb    not null,   -- full RouteCard payload
  duration       text,
  created_at     timestamptz default now()
);

alter table public.routes enable row level security;
create policy "public read routes"   on public.routes for select using (true);
create policy "public insert routes" on public.routes for insert with check (true);

-- ─── AI CHATS ────────────────────────────────────────────────────────────────
create table if not exists public.ai_chats (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  created_at timestamptz default now()
);

alter table public.ai_chats enable row level security;
create policy "public read chats"   on public.ai_chats for select using (true);
create policy "public insert chats" on public.ai_chats for insert with check (true);

-- ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────
create table if not exists public.achievements (
  id          text primary key,
  title       text not null,
  description text not null,
  unlocked    boolean not null default false,
  icon        text,
  tier        text check (tier in ('bronze','silver','gold')),
  progress    integer default 0,
  total       integer default 1,
  created_at  timestamptz default now()
);

alter table public.achievements enable row level security;
create policy "public read achievements"   on public.achievements for select using (true);
create policy "public insert achievements" on public.achievements for insert with check (true);
create policy "public update achievements" on public.achievements for update using (true);

-- ─── SEED LANDMARKS ──────────────────────────────────────────────────────────
insert into public.landmarks (id, name, category, location, description, significance, image_url, overview, facts, timeline, related) values
('victoria-memorial','Victoria Memorial','Monument','Maidan, Kolkata',
 'A majestic marble museum built in memory of Queen Victoria, blending British and Mughal architecture.',
 'It stands as one of India''s most beautiful Indo-Saracenic structures, symbolising the colonial era and housing a remarkable collection of Raj-era memorabilia.',
 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
 'The Victoria Memorial is a large marble building in Central Kolkata, built between 1906 and 1921. Dedicated to the memory of Queen Victoria, it now serves as a museum and a tourism destination.',
 '["Built with white Makrana marble, the same used for the Taj Mahal.","Houses over 28,000 artefacts including rare paintings and manuscripts.","The bronze Angel of Victory atop the dome rotates with the wind."]',
 '[{"year":"1901","event":"Lord Curzon proposes the memorial."},{"year":"1906","event":"Foundation stone laid by Prince of Wales."},{"year":"1921","event":"Officially inaugurated."},{"year":"2001","event":"Centenary celebrations begin."}]',
 '["st-pauls-cathedral","town-hall","fort-william"]'),

('howrah-bridge','Howrah Bridge','Bridge','Hooghly River, Kolkata',
 'An iconic cantilever bridge over the Hooghly, the lifeline connecting Howrah and Kolkata.',
 'One of the busiest cantilever bridges in the world, it carries over 100,000 vehicles and 150,000 pedestrians daily, embodying Kolkata''s industrial spirit.',
 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80',
 'Commissioned in 1943, Howrah Bridge is a balanced cantilever bridge built without nuts and bolts, instead riveted as a single steel structure.',
 '["Built without a single nut or bolt — fully riveted.","Renamed Rabindra Setu in 1965 after Rabindranath Tagore.","Used 26,500 tons of steel, mostly from Tata Steel."]',
 '[{"year":"1862","event":"First pontoon bridge proposed."},{"year":"1936","event":"Construction begins."},{"year":"1943","event":"Bridge opens to traffic."},{"year":"1965","event":"Renamed Rabindra Setu."}]',
 '["prinsep-ghat","fort-william"]'),

('indian-museum','Indian Museum','Museum','Park Street, Kolkata',
 'The oldest and largest museum in India, holding rare antiques, armour, fossils and Mughal paintings.',
 'A cradle of Indian museology, it preserves over a million objects including the ashes of the Buddha and rare Egyptian mummies.',
 'https://images.unsplash.com/photo-1565060169187-5284a3a47bff?w=1200&q=80',
 'Founded in 1814, the Indian Museum is the ninth oldest museum in the world and houses an extensive collection of artefacts spanning natural history, art, and archaeology.',
 '["Founded by the Asiatic Society in 1814.","Spread across 6 sections and 35 galleries.","Holds a 4,000-year-old Egyptian mummy."]',
 '[{"year":"1784","event":"Asiatic Society founded."},{"year":"1814","event":"Museum established."},{"year":"1878","event":"Current building opens."},{"year":"2014","event":"Bicentenary year celebrations."}]',
 '["victoria-memorial","town-hall"]'),

('marble-palace','Marble Palace','Heritage Home','Muktaram Babu Street',
 'A 19th-century mansion known for its marble walls, classical art and exotic curios.',
 'A living museum where descendants of the original family still reside, offering a rare glimpse into the opulent life of Bengal''s 19th-century zamindars.',
 'https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=1200&q=80',
 'Built in 1835 by Raja Rajendra Mullick, Marble Palace is a stunning neoclassical mansion famed for its sprawling marble interiors and rare collection of European sculpture and paintings.',
 '["Built from 126 varieties of marble.","Houses original works of Rubens and Reynolds.","Hosts India''s first private zoo on its grounds."]',
 '[{"year":"1835","event":"Construction completed."},{"year":"1854","event":"First private zoo opens."},{"year":"1984","event":"Declared a heritage building."}]',
 '["indian-museum","town-hall"]'),

('dakshineswar-temple','Dakshineswar Temple','Temple','Dakshineswar, Kolkata',
 'A revered Kali temple on the banks of the Hooghly, associated with Sri Ramakrishna Paramahamsa.',
 'Sri Ramakrishna Paramahamsa served here as priest, transforming it into a beacon of spiritual revival in 19th-century India.',
 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80',
 'Built in 1855 by Rani Rashmoni, this nine-spired temple is dedicated to Goddess Kali and is one of Bengal''s most important pilgrimage sites.',
 '["Built in the traditional Bengali Navaratna style.","Site of Ramakrishna''s divine visions.","Connected to Belur Math by river ferry."]',
 '[{"year":"1847","event":"Rani Rashmoni begins construction."},{"year":"1855","event":"Temple consecrated."},{"year":"1886","event":"Ramakrishna attains samadhi."}]',
 '["belur-math"]'),

('belur-math','Belur Math','Temple','Belur, Howrah',
 'Headquarters of the Ramakrishna Mission, where Hindu, Christian and Islamic architecture unite.',
 'Its main temple symbolises unity of religions, drawing from Hindu, Buddhist, Christian, and Islamic architectural elements.',
 'https://images.unsplash.com/photo-1582662175585-3e15a3a64c50?w=1200&q=80',
 'Founded by Swami Vivekananda in 1898, Belur Math is the world headquarters of the Ramakrishna Mission and embodies universal harmony.',
 '["Spans 40 acres along the Hooghly.","Architecture blends temple, mosque and church motifs.","Hosts thousands of monks and devotees daily."]',
 '[{"year":"1898","event":"Land acquired by Vivekananda."},{"year":"1938","event":"Main temple inaugurated."}]',
 '["dakshineswar-temple"]'),

('fort-william','Fort William','Fort','Maidan, Kolkata',
 'An 18th-century star-shaped fort that anchored British power in Bengal.',
 'A formidable example of military architecture and the birthplace of modern Kolkata, surrounded by the verdant Maidan.',
 'https://images.unsplash.com/photo-1599723546389-9c98c5b1bce8?w=1200&q=80',
 'Named after King William III, the present fort was completed in 1781 after the original was lost in the Siege of Calcutta. Today it serves as the Eastern Command HQ of the Indian Army.',
 '["Designed in an irregular octagonal star shape.","Could shelter 10,000 troops during sieges.","Inspired the founding of New Calcutta."]',
 '[{"year":"1696","event":"Original fort begun."},{"year":"1756","event":"Siege of Calcutta."},{"year":"1781","event":"New fort completed."}]',
 '["victoria-memorial","prinsep-ghat"]'),

('st-pauls-cathedral','St. Paul''s Cathedral','Cathedral','Cathedral Road',
 'The first Anglican cathedral in the East, a Gothic Revival landmark of Kolkata.',
 'It served as the seat of the Bishop of Calcutta and remains a centre of Christian heritage in Eastern India.',
 'https://images.unsplash.com/photo-1606146485050-7e9c39e26e6f?w=1200&q=80',
 'Consecrated in 1847, St. Paul''s Cathedral is one of the largest cathedrals in Kolkata and a fine example of Indo-Gothic architecture.',
 '["Spire rebuilt after the 1934 earthquake.","Stained glass by Sir Edward Burne-Jones.","Houses memorials to British soldiers and missionaries."]',
 '[{"year":"1839","event":"Foundation stone laid."},{"year":"1847","event":"Cathedral consecrated."},{"year":"1934","event":"Damaged by Bihar earthquake."}]',
 '["victoria-memorial"]'),

('town-hall','Town Hall','Civic Heritage','Esplanade, Kolkata',
 'A neo-classical Roman Doric building that has hosted Kolkata''s civic life since 1813.',
 'A symbol of civic pride and the cultural conscience of the city, it has witnessed key historical events of the Bengal Renaissance.',
 'https://images.unsplash.com/photo-1581352169322-39f59f9bcaab?w=1200&q=80',
 'Built in 1813 by Colonel John Garstin, the Town Hall is a stately Roman Doric structure that today hosts the Kolkata Panorama museum.',
 '["Funded through a public lottery.","Restored in 1998 with original Doric columns intact.","Houses the Kolkata Panorama interactive museum."]',
 '[{"year":"1813","event":"Inaugurated by Lord Minto."},{"year":"1867","event":"Renovated after structural damage."},{"year":"1998","event":"Restored as a heritage museum."}]',
 '["indian-museum","marble-palace"]'),

('prinsep-ghat','Prinsep Ghat','Riverside','Hooghly Riverfront',
 'A picturesque Palladian porch on the riverside, glowing under the Vidyasagar Setu.',
 'A serene heritage promenade celebrating Prinsep''s contribution to decoding ancient Brahmi and Kharosthi scripts.',
 'https://images.unsplash.com/photo-1581791534046-6d5cad07a48d?w=1200&q=80',
 'Built in 1843 in memory of James Prinsep, the ghat features a Greek and Gothic style Palladian porch, and is a beloved evening retreat for Kolkatans.',
 '["Designed by W. Fitzgerald.","Restored in 2001 by the Indian Navy.","Most photographed sunset spot in Kolkata."]',
 '[{"year":"1841","event":"James Prinsep passes away."},{"year":"1843","event":"Memorial porch built."},{"year":"2001","event":"Heritage restoration completed."}]',
 '["howrah-bridge","fort-william"]')
on conflict (id) do nothing;

-- ─── SEED ACHIEVEMENTS ───────────────────────────────────────────────────────
insert into public.achievements (id, title, description, unlocked, icon, tier, progress, total) values
('first-visit',         'First Landmark Visited', 'You stepped into history for the first time.', true,  '🗿', 'bronze', 1,  1),
('heritage-explorer',   'Heritage Explorer',       'Visit 5 unique landmarks.',                   false, '🧭', 'silver', 4,  5),
('culture-enthusiast',  'Culture Enthusiast',      'Explore 3 cultural categories.',              true,  '🎭', 'silver', 3,  3),
('history-master',      'History Master',          'Complete all timelines.',                      false, '📜', 'gold',   6,  10),
('kolkata-discoverer',  'Kolkata Discoverer',      'Visit all 10 Kolkata landmarks.',             false, '🌆', 'gold',   7,  10),
('ai-conversationalist','AI Conversationalist',    'Ask the AI guide 25 questions.',              true,  '🤖', 'bronze', 25, 25)
on conflict (id) do nothing;
