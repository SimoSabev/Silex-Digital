-- Demo Data Schema for SilexBrand Platform
-- This schema provides real, realistic data for all demo scenarios

-- Demo Data Table
CREATE TABLE IF NOT EXISTS demo_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_type TEXT NOT NULL CHECK (demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking', 'chatbot')),
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Data Table
CREATE TABLE IF NOT EXISTS analytics_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_type TEXT NOT NULL CHECK (demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking', 'chatbot')),
  metrics JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Sessions Table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  demo_type TEXT NOT NULL CHECK (demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking', 'chatbot')),
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in seconds
  actions JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead Tracking Table
CREATE TABLE IF NOT EXISTS lead_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_type TEXT NOT NULL CHECK (demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking', 'chatbot')),
  lead_data JSONB NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo Events Table
CREATE TABLE IF NOT EXISTS demo_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL,
  demo_id TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('bg', 'en')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo Data Seeding
INSERT INTO demo_data (demo_type, data) VALUES
(
  'saas',
  '{
    "title": "SaaS Dashboard Pro",
    "subtitle": "Анализ и управление в реално време",
    "stats": [
      {"title": "Общ приход", "value": "45,231 лв", "change": {"value": "+12%", "isPositive": true}, "icon": "trending-up", "color": "green"},
      {"title": "Активни потребители", "value": "2,345", "change": {"value": "+8%", "isPositive": true}, "icon": "users", "color": "blue"},
      {"title": "Поръчки", "value": "1,234", "change": {"value": "+3%", "isPositive": false}, "icon": "shopping-cart", "color": "purple"},
      {"title": "Конверсия", "value": "3.2%", "change": {"value": "+5%", "isPositive": true}, "icon": "trending-up", "color": "orange"}
    ],
    "recentActivity": [
      {"id": 1, "user": "Иван Петров", "action": "направи нова поръчка", "time": "преди 5 минути", "avatar": "👨"},
      {"id": 2, "user": "Мария Иванова", "action": "регистрира се", "time": "преди 15 минути", "avatar": "👩"},
      {"id": 3, "user": "Георги Димитров", "action": "обнови абонамента", "time": "преди 30 минути", "avatar": "👨"},
      {"id": 4, "user": "Анна Николова", "action": "направи запитване", "time": "преди 1 час", "avatar": "👩"},
      {"id": 5, "user": "Петър Стоянов", "action": "направи поръчка", "time": "преди 2 часа", "avatar": "👨"}
    ],
    "users": [
      {"id": 1, "name": "Иван Петров", "email": "ivan@example.com", "status": "active", "joined": "15.01.2024"},
      {"id": 2, "name": "Мария Иванова", "email": "maria@example.com", "status": "active", "joined": "12.01.2024"},
      {"id": 3, "name": "Георги Димитров", "email": "georgi@example.com", "status": "inactive", "joined": "10.01.2024"},
      {"id": 4, "name": "Анна Николова", "email": "anna@example.com", "status": "active", "joined": "08.01.2024"},
      {"id": 5, "name": "Петър Стоянов", "email": "peter@example.com", "status": "pending", "joined": "05.01.2024"}
    ],
    "recentOrders": [
      {"id": 101, "customer": "Иван Петров", "amount": "249 лв", "status": "completed", "date": "преди 5 минути"},
      {"id": 102, "customer": "Мария Иванова", "amount": "499 лв", "status": "processing", "date": "преди 15 минути"},
      {"id": 103, "customer": "Георги Димитров", "amount": "99 лв", "status": "completed", "date": "преди 30 минути"},
      {"id": 104, "customer": "Анна Николова", "amount": "249 лв", "status": "pending", "date": "преди 1 час"},
      {"id": 105, "customer": "Петър Стоянов", "amount": "799 лв", "status": "completed", "date": "преди 2 часа"}
    ]
  }'
),
(
  'ecommerce',
  '{
    "title": "Български Електронен Магазин",
    "subtitle": "Пълен асортимент с автоматизация",
    "products": [
      {"id": 1, "name": "Моден Маншен Чадър - Черен", "price": "149 лв", "category": "Облекло", "stock": 45, "rating": 4.8, "sales": 324},
      {"id": 2, "name": "Смесена Колекция Палто", "price": "399 лв", "category": "Облекло", "stock": 28, "rating": 4.9, "sales": 189},
      {"id": 3, "name": "Дамски Палто от Кожа", "price": "599 лв", "category": "Облекло", "stock": 15, "rating": 4.7, "sales": 156},
      {"id": 4, "name": "Костюм Офис Стил", "price": "449 лв", "category": "Облекло", "stock": 33, "rating": 4.8, "sales": 223},
      {"id": 5, "name": "Дамски Жакет - Януари Колекция", "price": "349 лв", "category": "Облекло", "stock": 56, "rating": 4.6, "sales": 287}
    ],
    "categories": ["Облекло", "Обувки", "Аксесоари", "Часовници"],
    "cart": [
      {"productId": 1, "name": "Моден Маншен Чадър - Черен", "quantity": 2, "price": "149 лв"},
      {"productId": 4, "name": "Костюм Офис Стил", "quantity": 1, "price": "449 лв"}
    ],
    "recentOrders": [
      {"id": 501, "customer": "Елена Иванова", "items": 3, "total": "747 лв", "status": "completed", "time": "преди 2 минути"},
      {"id": 502, "customer": "Михаил Петров", "items": 1, "total": "599 лв", "status": "processing", "time": "преди 5 минути"},
      {"id": 503, "customer": "Снежана Димитрова", "items": 2, "total": "498 лв", "status": "shipped", "time": "преди 8 минути"},
      {"id": 504, "customer": "Александър Стоянов", "items": 4, "total": "1,236 лв", "status": "pending", "time": "преди 12 минути"},
      {"id": 505, "customer": "Катерина Георгиева", "items": 1, "total": "349 лв", "status": "completed", "time": "преди 15 минути"}
    ]
  }'
),
(
  'restaurant',
  '{
    "title": "Ресторант "България"",
    "subtitle": "Традиционна българска кухня",
    "menu": [
      {"id": 1, "name": "Баница с лебядре", "price": "9 лв", "category": "Закуска", "available": true, "rating": 4.8},
      {"id": 2, "name": "Супа "Гръцка"", "price": "12 лв", "category": "Супа", "available": true, "rating": 4.6},
      {"id": 3, "name": "Шопска салата", "price": "14 лв", "category": "Салати", "available": true, "rating": 4.7},
      {"id": 4, "name": "Печени пушени телешки палки", "price": "22 лв", "category": "Основно", "available": true, "rating": 4.9},
      {"id": 5, "name": "Пълнени чушки с говеждо", "price": "28 лв", "category": "Основно", "available": true, "rating": 4.8},
      {"id": 6, "name": "Кюфтета по габърски", "price": "32 лв", "category": "Основно", "available": true, "rating": 4.9},
      {"id": 7, "name": "Крем супа от гъби", "price": "16 лв", "category": "Супа", "available": true, "rating": 4.7},
      {"id": 8, "name": "Кюфтета с чесън", "price": "24 лв", "category": "Основно", "available": false, "rating": 4.5}
    ],
    "workingHours": {
      "monday": "10:00 - 22:00",
      "tuesday": "10:00 - 22:00",
      "wednesday": "10:00 - 22:00",
      "thursday": "10:00 - 23:00",
      "friday": "11:00 - 23:00",
      "saturday": "11:00 - 00:00",
      "sunday": "10:00 - 21:00"
    },
    "tables": [
      {"id": 1, "number": "1", "seats": 2, "status": "free"},
      {"id": 2, "number": "2", "seats": 4, "status": "occupied"},
      {"id": 3, "number": "3", "seats": 6, "status": "occupied"},
      {"id": 4, "number": "4", "seats": 8, "status": "occupied"},
      {"id": 5, "number": "5", "seats": 10, "status": "free"}
    ],
    "pendingOrders": [
      {"id": 101, "table": "2", "items": "2 Баница, 1 Шопска салата", "time": "преди 3 минути", "status": "pending"},
      {"id": 102, "table": "3", "items": "1 Пълнени чушки, 1 Крем супа", "time": "преди 7 минути", "status": "preparing"},
      {"id": 103, "table": "4", "items": "2 Кюфтета по габърски, 2 Печени палки", "time": "преди 12 минути", "status": "ready"},
      {"id": 104, "table": "1", "items": "1 Крем супа", "time": "преди 20 минути", "status": "completed"}
    ],
    "reviews": [
      {"id": 1, "user": "Елена Иванова", "rating": 5, "comment": "Най-добрите български ястия! Обичам!", "date": "2024-01-15"},
      {"id": 2, "user": "Михаил Петров", "rating": 4, "comment": "Хубава атмосфера и вкусна храна", "date": "2024-01-14"},
      {"id": 3, "user": "Снежана Димитрова", "rating": 5, "comment": "Безкомпромисно качество! Ще се върна", "date": "2024-01-13"},
      {"id": 4, "user": "Александър Стоянов", "rating": 5, "comment": "Най-добрият кюфтета в София!", "date": "2024-01-12"},
      {"id": 5, "user": "Катерина Георгиева", "rating": 4, "comment": "Прекрасно място за срещи", "date": "2024-01-11"}
    ]
  }'
),
(
  'booking',
  '{
    "title": "Сервис за Резервации",
    "subtitle": "Бързи и лесни резерации в реално време",
    "services": [
      {"id": 1, "name": "Автомобилна Миечна", "price": "25 лв", "duration": "20 мин", "description": "Пълна миечна с въздушен смях"},
      {"id": 2, "name": "Личен Помощник", "price": "50 лв/час", "duration": "1 час", "description": "Пълно обслужване на Вашия автомобил"},
      {"id": 3, "name": "Обиколка на града", "price": "120 лв", "duration": "4 часа", "description": "Вижене на София с личен шофьор"},
      {"id": 4, "name": "Страховка Премиум", "price": "450 лв/година", "duration": "1 година", "description": "Пълна покритие за Вашия автомобил"},
      {"id": 5, "name": "Галериен Трансфер", "price": "30 лв", "duration": "1 час", "description": "Трансфер до Софийска галерия"}
    ],
    "availability": {
      "2024-03-27": [
        {"time": "10:00-11:00", "slots": 5, "service": "Автомобилна Миечна"},
        {"time": "11:00-12:00", "slots": 3, "service": "Автомобилна Миечна"},
        {"time": "12:00-13:00", "slots": 0, "service": "Автомобилна Миечна"},
        {"time": "14:00-15:00", "slots": 4, "service": "Автомобилна Миечна"},
        {"time": "15:00-16:00", "slots": 2, "service": "Автомобилна Миечна"}
      ],
      "2024-03-28": [
        {"time": "10:00-11:00", "slots": 3, "service": "Автомобилна Миечна"},
        {"time": "11:00-12:00", "slots": 5, "service": "Автомобилна Миечна"},
        {"time": "14:00-15:00", "slots": 4, "service": "Автомобилна Миечна"},
        {"time": "15:00-16:00", "slots": 0, "service": "Автомобилна Миечна"}
      ]
    },
    "upcomingReservations": [
      {"id": 201, "customer": "Иван Петров", "service": "Автомобилна Миечна", "date": "2024-03-27", "time": "10:00", "status": "confirmed", "email": "ivan@example.com"},
      {"id": 202, "customer": "Мария Иванова", "service": "Личен Помощник", "date": "2024-03-27", "time": "14:00", "status": "confirmed", "email": "maria@example.com"},
      {"id": 203, "customer": "Георги Димитров", "service": "Обиколка на града", "date": "2024-03-28", "time": "10:00", "status": "pending", "email": "georgi@example.com"},
      {"id": 204, "customer": "Анна Николова", "service": "Автомобилна Миечна", "date": "2024-03-27", "time": "15:00", "status": "confirmed", "email": "anna@example.com"},
      {"id": 205, "customer": "Петър Стоянов", "service": "Галериен Трансфер", "date": "2024-03-28", "time": "14:00", "status": "pending", "email": "peter@example.com"}
    ],
    "totalRevenue": "2,450 лв"
  }'
);

-- Analytics Data Seeding
INSERT INTO analytics_data (demo_type, metrics) VALUES
(
  'saas',
  '{
    "totalVisits": 12345,
    "uniqueVisitors": 8765,
    "conversionRate": 3.2,
    "avgTimeOnSite": 4.5,
    "bounceRate": 35.2,
    "demoCompletion": 68.5,
    "leadsCaptured": 395,
    "revenue": 45231,
    "activeUsers": 234,
    "newUsers": 189,
    "returningUsers": 976
  }'
),
(
  'ecommerce',
  '{
    "totalVisits": 24567,
    "uniqueVisitors": 15678,
    "conversionRate": 2.8,
    "avgTimeOnSite": 3.2,
    "bounceRate": 42.5,
    "demoCompletion": 61.2,
    "leadsCaptured": 689,
    "revenue": 78456,
    "activeUsers": 345,
    "newUsers": 234,
    "returningUsers": 1334
  }'
),
(
  'restaurant',
  '{
    "totalVisits": 18923,
    "uniqueVisitors": 12456,
    "conversionRate": 4.5,
    "avgTimeOnSite": 2.1,
    "bounceRate": 28.3,
    "demoCompletion": 75.8,
    "leadsCaptured": 851,
    "revenue": 42345,
    "activeUsers": 278,
    "newUsers": 198,
    "returningUsers": 1058
  }'
),
(
  'booking',
  '{
    "totalVisits": 16789,
    "uniqueVisitors": 11234,
    "conversionRate": 3.8,
    "avgTimeOnSite": 3.8,
    "bounceRate": 32.1,
    "demoCompletion": 70.2,
    "leadsCaptured": 638,
    "revenue": 34567,
    "activeUsers": 298,
    "newUsers": 167,
    "returningUsers": 956
  }'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_demo_data_type ON demo_data(demo_type);
CREATE INDEX IF NOT EXISTS idx_analytics_data_type ON analytics_data(demo_type);
CREATE INDEX IF NOT EXISTS idx_user_sessions_type ON user_sessions(demo_type);
CREATE INDEX IF NOT EXISTS idx_lead_tracking_type ON lead_tracking(demo_type);
CREATE INDEX IF NOT EXISTS idx_demo_events_event ON demo_events(event);
CREATE INDEX IF NOT EXISTS idx_demo_events_demo_id ON demo_events(demo_id);
CREATE INDEX IF NOT EXISTS idx_demo_events_created_at ON demo_events(created_at DESC);

-- Enable RLS for security
ALTER TABLE demo_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_events ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can read demo data
CREATE POLICY "Allow public read access to demo data" ON demo_data
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to analytics" ON analytics_data
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to user sessions" ON user_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to lead tracking" ON lead_tracking
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert demo events" ON demo_events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read demo events" ON demo_events
  FOR SELECT TO authenticated USING (true);

-- Sample lead tracking entries
INSERT INTO lead_tracking (demo_type, lead_data, status, source) VALUES
('saas', '{"name": "Иван Петров", "email": "ivan@example.com", "company": "Технологии ЕООД", "interest": "SaaS Dashboard", "source": "demo"}', 'new', 'saas-demo'),
('ecommerce', '{"name": "Мария Иванова", "email": "maria@example.com", "company": "Магазини ЕООД", "interest": "Продукти", "source": "demo"}', 'contacted', 'ecommerce-demo'),
('restaurant', '{"name": "Георги Димитров", "email": "georgi@example.com", "company": "Ресторан БГ", "interest": "Онлайн резервации", "source": "demo"}', 'qualified', 'restaurant-demo'),
('booking', '{"name": "Анна Николова", "email": "anna@example.com", "company": "Сервиз ЕООД", "interest": "Резервации", "source": "demo"}', 'converted', 'booking-demo');

-- Update timestamps
UPDATE demo_data SET updated_at = NOW() WHERE demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking');
UPDATE analytics_data SET updated_at = NOW() WHERE demo_type IN ('saas', 'ecommerce', 'restaurant', 'booking');
UPDATE lead_tracking SET updated_at = NOW();
UPDATE user_sessions SET updated_at = NOW();

-- Cleanup: Remove deprecated tables if exist
DROP TABLE IF EXISTS demo_sessions;
DROP TABLE IF EXISTS demo_leads;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Demo data schema created successfully!';
  RAISE NOTICE '📊 Created tables: demo_data, analytics_data, user_sessions, lead_tracking';
  RAISE NOTICE '💾 Seeded 4 demo types with real data';
  RAISE NOTICE '📈 Added analytics data for all demo types';
  RAISE NOTICE '👥 Created sample lead tracking entries';
  RAISE NOTICE '🔒 Enabled RLS policies for security';
END $$;