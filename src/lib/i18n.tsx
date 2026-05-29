"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "bg" | "en";

const translations = {
  bg: {
    // Navigation
    "nav.home": "Начало",
    "nav.services": "Услуги",
    "nav.features": "Предимства",
    "nav.demos": "Демонстрации",
    "nav.pricing": "Цени",
    "nav.blog": "Блог",
    "nav.contact": "Контакти",
    "nav.getStarted": "Започни сега",

    "hero.badge": "Вдигаме бранда ви — не пакет от кутията",
    "hero.headlineLine1": "Клиентите ви трябва да ви виждат сериозно.",
    "hero.headlineLine2": "Ние го правим — и ви носим повече продажби.",
    "hero.sub": "Първо разбираме вашия бизнес и как искате да изглеждате. После избираме правилното: сайт, Google, отговори във Viber — съобразено с вас, не копие от шаблон.",
    "hero.cta": "Заяви безплатна консултация",
    "hero.ctaSecondary": "Виж интерактивното демо",
    "hero.stat1Value": "15+",
    "hero.stat1Label": "часа месечно, върнати ви от чатове",
    "hero.stat2Value": "3×",
    "hero.stat2Label": "повече запитвания извън работно време",
    "hero.stat3Value": "0",
    "hero.stat3Label": "клиенти, изгубени от бавен отговор",

    "home.pact.badge": "Как работим с вас",
    "home.pact.title": "Не продаваме услуги на куп. Издигаме вашия бранд.",
    "home.pact.body": "За една фирма е нужен по-силен сайт. За друга — Google и бърз отговор във Viber. За трета — и двете. Преценяваме заедно и правим точно това, което носи повече доверие и оборот. Вие не избирате от меню — получавате решение за вашия случай.",
    "home.pillars.title": "Два начина да изглеждате по-сериозно — и да продавате повече",
    "home.pillars.sub": "Не всяка фирма има нужда от едно и също. Избираме подходящия инструмент за вашия бизнес.",
    "home.pillars.a.title": "Лицето ви онлайн",
    "home.pillars.a.body": "Сайт и Google, с които изглеждате като фирма, на която може да се разчита. Хората ви намират, виждат услугите и цените ясно — без объркан сайт от шаблон.",
    "home.pillars.b.title": "Гласът ви, когато не сте на телефона",
    "home.pillars.b.body": "Отговори във Viber и на сайта, които звучат като вас — знаят цените, записват час, оставят телефон. За бизнеси, където всеки пропуснат разговор е загубена продажба.",
    "home.services.badge": "За вашия бизнес",
    "home.services.title": "Правилното решение за правилната задача",
    "home.services.sub": "Няма универсален пакет. Всяко нещо по-долу е инструмент — ние казваме кое ви трябва и защо.",

    "home.demo.badge": "Интерактивно демо",
    "home.demo.title": "Виж как",
    "home.demo.titleHighlight": "запитванията стават запис",
    "home.demo.body": "Това е кратка симулация на реалната ни система: клиент пише във Viber, Messenger, WhatsApp, Instagram, Telegram или имейл — AI извлича какво иска и го записва в Сейфа за клиенти. Натисни „Стартирай демото“ вдясно.",
    "home.demo.bullet1": "Избираш каналите, които ползват клиентите ти",
    "home.demo.bullet2": "Симулацията отнема около минута",
    "home.demo.bullet3": "Виждаш как съобщението става структуриран запис",
    "home.demo.cta": "Виж всички демонстрации",
    "home.demo.note": "Илюстративно демо на сайта — при реален проект свързваме вашите канали и CRM.",

    "demo.multichannel.title": "Мултиканални запитвания",
    "demo.multichannel.sub": "Избери канали, стартирай симулацията и виж как AI извлича продукт и текст от съобщението.",
    "demo.multichannel.run": "Стартирай демото",
    "demo.multichannel.running": "Симулацията тече...",
    "demo.multichannel.newInquiry": "Ново запитване",
    "demo.multichannel.extracting": "Извличане...",
    "demo.multichannel.aiCore": "AI ядро",
    "demo.multichannel.vaultTitle": "Сейф за клиенти",
    "demo.multichannel.vaultEmpty": "Готов за симулация",
    "demo.multichannel.stored": "Записано",
    "demo.multichannel.source": "Канал:",
    "demo.multichannel.item": "Артикул:",
    "demo.multichannel.from": "от:",

    "home.beforeAfter.label": "Преди SilexBrand vs. След SilexBrand",
    "home.beforeAfter.before": "Преди",
    "home.beforeAfter.after": "След SilexBrand",
    "home.beforeAfter.before1": "Ръчно отговаряш на едни и същи въпроси всеки ден",
    "home.beforeAfter.before2": "Клиент пише в 22:00 — ти го виждаш сутринта, той вече е при конкурента",
    "home.beforeAfter.before3": "Половин работен ден губиш за неща, които могат да стават сами",
    "home.beforeAfter.before4": "Не знаеш колко запитвания изпускаш всяка седмица",
    "home.beforeAfter.after1": "Клиентът получава отговор за секунди — дори в 23:00",
    "home.beforeAfter.after2": "Запитванията се записват автоматично — дори когато не сте на телефона",
    "home.beforeAfter.after3": "Знаеш точно колко запитвания идват и колко се превръщат в поръчки",
    "home.beforeAfter.after4": "Работиш по-малко часа, вземаш повече",

    "home.how.badge": "Как работи",
    "home.how.title": "От съобщение до запис",
    "home.how.titleHighlight": "за секунди",
    "home.how.body": "Клиентът пише във Viber, Messenger, WhatsApp или на сайта. AI отговаря, извлича какво иска и го записва в Сейфа за клиенти — вие получавате известие и потвърждавате следващата стъпка.",

    // Problem
    "problem.title": "Защо губите пари всеки ден без да знаете?",
    "problem.sub": "Разпознайте болката на малкия бизнес",
    "problem.card1.title": "Клиентите пишат... и си тръгват",
    "problem.card1.desc": "Ако се забавите с отговор, клиентът отива при конкурента и вие губите оборот. Ние отговаряме за 30 секунди.",
    "problem.card2.title": "Пропуснати обаждания = пропуснат оборот",
    "problem.card2.desc": "Когато сте заети с работа, не можете да вдигнете телефона. Всяко пропуснато обаждане е клиент, който е платил на друг.",
    "problem.card3.title": "Посетители на сайта, които не купуват",
    "problem.card3.desc": "Хората влизат в сайта ви, гледат и си тръгват, без да оставят контакти. Нямате начин да се свържете с тях.",

    // Solution
    "solution.title": "Автоматичен умен секретар за вашия бизнес",
    "solution.sub": "Сайтът ви работи сам и носи пари, докато вие се фокусирате върху най-важното",
    "solution.point1": "Бърз отговор до 30 секунди",
    "solution.point1.desc": "Всяко съобщение във Viber, Facebook или сайта ви получава учтив и правилен отговор веднага.",
    "solution.point2": "Клиентски Сейф за контакти",
    "solution.point2.desc": "Имената, телефоните и интересите на клиентите се записват автоматично в електронен тефтер.",
    "solution.point3": "Автоматично записване на часове",
    "solution.point3.desc": "Асистентът проверява свободните ви часове и записва клиентите директно в календара ви.",

    // Demos
    "demos.title": "Изберете своя дигитален път",
    "demos.sub": "Два еднакво важни стълба за растеж на вашия бизнес",
    "demos.tab1": "Уебсайт & Търсене (Основа)",
    "demos.tab2": "AI Секретар (Двигател)",
    "demos.tab3": "Пълна дигитална машина",
    "demos.card1.title": "Цялостно Уеб присъствие & Локално търсене",
    "demos.card1.sub": "Лицето на вашия бизнес пред света",
    "demos.card1.desc": "Модерен уебсайт, блог, магазин или дигитална визитка, изградени с чист код или водеща CMS платформа (WordPress/Shopify) спрямо вашите нужди. С включено SEO и Google Карти.",
    "demos.card1.feat1": "Чист код или CMS според нуждите ви",
    "demos.card1.feat2": "Ултра-бърз адаптивен дизайн",
    "demos.card1.feat3": "Отбелязване в Google Карти",
    "demos.card1.feat4": "Месечна SEO поддръжка",
    "demos.card1.cta": "Виж демо сайт",
    "demos.card2.title": "AI асистент & Автоматичен секретар",
    "demos.card2.sub": "Денонощният двигател за записване на клиенти",
    "demos.card2.desc": "Умен изкуствен интелект, който говори с клиентите на български и английски и продава вместо вас.",
    "demos.card2.feat1": "24/7 автоматичен отговор",
    "demos.card2.feat2": "Интеграция във Viber & Facebook",
    "demos.card2.feat3": "Памет на асистента (цени/каталог)",
    "demos.card2.feat4": "Автоматично записване на часове",
    "demos.card2.cta": "Тествай AI сега",
    "demos.card3.title": "Цялостен Дигитален Автопилот (Сайт + AI)",
    "demos.card3.sub": "Максимална автоматизация за сериозни бизнеси",
    "demos.card3.desc": "Комбинираме премиум уебсайт, постоянна Google доминация и мултиканален AI асистент в една синхронизирана система.",
    "demos.card3.feat1": "Сайт + Мултиканален AI",
    "demos.card3.feat2": "Синхронизация на наличности",
    "demos.card3.feat3": "Пълен Сейф за Клиенти (CRM)",
    "demos.card3.feat4": "Приоритетна техническа поддръжка",
    "demos.card3.cta": "Свържи се за оферта",

    // How it works
    "how.title": "Как работи дигиталният секретар",
    "how.sub": "Три лесни стъпки от първо съобщение до реална печалба",
    "how.step1": "Клиентът пише или се обажда",
    "how.step1.desc": "Във Viber, Messenger, WhatsApp или формата във вашия уебсайт.",
    "how.step2": "AI реагира и улавя интереса",
    "how.step2.desc": "Отговаря за секунди, предлага свободни часове или консултира по ценоразписа.",
    "how.step3": "Вие печелите приход",
    "how.step3.desc": "Запитването се записва в Сейфа за Клиенти, а свободният час е зает в календара ви.",

    // Pricing
    "pricing.title": "Ясни цени с включен финансов одит",
    "pricing.sub": "Всяка стотинка отива за реални резултати. Без скрити условия.",
    "pricing.monthly": "/месец",
    "pricing.cta": "Започни сега",
    "pricing.popular": "Най-желан",
    "pricing.automation": "Цялостно Уеб присъствие & Търсене",
    "pricing.automation.desc": "Професионален сайт (Код или CMS) за перфектно присъствие в Google",
    "pricing.cms": "AI секретар & Автоматичен отговор",
    "pricing.cms.desc": "Умен дигитален асистент във Viber & Вашия сайт",
    "pricing.code": "Цялостен Дигитален Автопилот (Сайт + AI)",
    "pricing.code.desc": "Цялостна система за автоматизиране на бизнеса ви",
    "pricing.feat.conversations": "разговора/месец с клиенти",
    "pricing.feat.channels": "Всички чат канали (Viber, WhatsApp, Messenger)",
    "pricing.feat.ai": "Интелектуално Ядро на български и английски",
    "pricing.feat.crm": "Сейф за Клиенти (Автоматичен CRM)",
    "pricing.feat.dashboard": "Интерактивно Табло с реална статистика",
    "pricing.feat.booking": "Автоматични резервации и календар",
    "pricing.feat.templates": "Код или водеща CMS (по избор на клиента)",
    "pricing.feat.hosting": "Премиум Edge Хостинг + Безплатен SSL включени",
    "pricing.feat.builder": "Техническо SEO и Geo-карти за вашия град",
    "pricing.feat.api": "Синхронизация на каталози и наличности",
    "pricing.feat.custom": "Специфични автоматични вериги",
    "pricing.feat.support": "Денонощна лична поддръжка по телефона",
    "pricing.custom": "По договор",
    "pricing.contact": "Говори с нас",

    // Testimonials
    "testimonials.title": "Реални резултати от реални бизнеси",
    "testimonials.sub": "Как български и международни компании спестиха време и увеличиха оборота си",

    // CTA
    "cta.title": "Готови ли сте да автоматизирате бизнеса си?",
    "cta.sub": "Изпратете запитване — ще се свържем по имейл или телефон. Без ангажимент. Ще ви покажем откъде да започнете.",
    "cta.button": "Заяви безплатна консултация",
    "cta.secondary": "Говори с нас",

    // Footer
    "footer.description": "Вдигаме бранда ви онлайн — с решението, което наистина пасва на вашия бизнес.",
    "footer.quickLinks": "Бързи връзки",
    "footer.solutions": "Решения",
    "footer.contact": "Контакти",
    "footer.automation": "Уеб Основа & Локално търсене",
    "footer.cmsLayer": "AI Автоматичен секретар",
    "footer.codeLayer": "Пълна Дигитална Машина",
    "footer.integrations": "Синхронизации",
    "footer.rights": "Всички права запазени.",
    "footer.privacy": "Поверителност",
    "footer.terms": "Условия",

    // Common
    "common.learnMore": "Научи повече",
    "common.tryFree": "Започни безплатно",
    "common.watchDemo": "Виж демо",
    "common.contactUs": "Свържи се с нас",
    "common.bgn": "лв",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.features": "Benefits",
    "nav.demos": "Demos",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    "hero.badge": "We elevate your brand — not an off-the-shelf package",
    "hero.headlineLine1": "Clients need to see you as a serious business.",
    "hero.headlineLine2": "We make that happen — and bring you more sales.",
    "hero.sub": "First we understand your business and how you want to look. Then we choose what's right: website, Google, Viber replies — built for you, not copied from a template.",
    "hero.cta": "Request a free consultation",
    "hero.ctaSecondary": "Try the interactive demo",
    "hero.stat1Value": "15+",
    "hero.stat1Label": "hours a month back from chats",
    "hero.stat2Value": "3×",
    "hero.stat2Label": "more inquiries after business hours",
    "hero.stat3Value": "0",
    "hero.stat3Label": "customers lost to slow replies",

    "home.pact.badge": "How we work with you",
    "home.pact.title": "We don't sell services off the shelf. We elevate your brand.",
    "home.pact.body": "One business needs a stronger website. Another needs Google and fast Viber replies. A third needs both. We figure it out together and build exactly what brings more trust and revenue. You don't pick from a menu — you get the right solution for your situation.",
    "home.pillars.title": "Two ways to look more established — and sell more",
    "home.pillars.sub": "Not every business needs the same thing. We choose the tool that fits yours.",
    "home.pillars.a.title": "Your face online",
    "home.pillars.a.body": "A website and Google presence that make you look like a business people can trust. Customers find you, see your services and prices clearly — not a confusing template site.",
    "home.pillars.b.title": "Your voice when you're not on the phone",
    "home.pillars.b.body": "Replies on Viber and your site that sound like you — they know your prices, book appointments, and capture phone numbers. For businesses where every missed conversation is lost money.",
    "home.services.badge": "Built for your business",
    "home.services.title": "The right solution for the right job",
    "home.services.sub": "There is no universal package. Each option below is a tool — we tell you which one you need and why.",

    "home.demo.badge": "Interactive demo",
    "home.demo.title": "See how",
    "home.demo.titleHighlight": "inquiries become records",
    "home.demo.body": "This is a short simulation of our real setup: a client writes on Viber, Messenger, WhatsApp, Instagram, Telegram, or email — AI extracts what they want and saves it to your Client Vault. Press “Run demo” on the right.",
    "home.demo.bullet1": "Pick the channels your customers actually use",
    "home.demo.bullet2": "The simulation takes about a minute",
    "home.demo.bullet3": "Watch each message turn into a structured record",
    "home.demo.cta": "View all demos",
    "home.demo.note": "Illustrative on-site demo — in a real project we connect your channels and CRM.",

    "demo.multichannel.title": "Multi-channel inquiries",
    "demo.multichannel.sub": "Select channels, run the simulation, and see AI pull the product and message text from each inquiry.",
    "demo.multichannel.run": "Run demo",
    "demo.multichannel.running": "Simulation running...",
    "demo.multichannel.newInquiry": "New inquiry",
    "demo.multichannel.extracting": "Extracting...",
    "demo.multichannel.aiCore": "AI core",
    "demo.multichannel.vaultTitle": "Client Vault",
    "demo.multichannel.vaultEmpty": "Ready for simulation",
    "demo.multichannel.stored": "Saved",
    "demo.multichannel.source": "Channel:",
    "demo.multichannel.item": "Item:",
    "demo.multichannel.from": "from:",

    "home.beforeAfter.label": "Before SilexBrand vs. After SilexBrand",
    "home.beforeAfter.before": "Before",
    "home.beforeAfter.after": "After SilexBrand",
    "home.beforeAfter.before1": "Manually answering the same questions every day",
    "home.beforeAfter.before2": "Client messages at 10pm — you see it next morning, they've already gone to a competitor",
    "home.beforeAfter.before3": "Half your workday lost to things that could run themselves",
    "home.beforeAfter.before4": "You don't know how many enquiries you're losing each week",
    "home.beforeAfter.after1": "Client gets a reply in seconds — even at 11pm",
    "home.beforeAfter.after2": "Inquiries are saved automatically — even when you're not on the phone",
    "home.beforeAfter.after3": "You know exactly how many inquiries come in and how many convert",
    "home.beforeAfter.after4": "Work fewer hours, earn more",

    "home.how.badge": "How it works",
    "home.how.title": "From message to record",
    "home.how.titleHighlight": "in seconds",
    "home.how.body": "The client writes on Viber, Messenger, WhatsApp, or your site. AI replies, extracts what they need, and saves it to your Client Vault — you get a notification and confirm the next step.",

    // Problem
    "problem.title": "Why are you losing money every day without knowing?",
    "problem.sub": "Recognize the pain of small businesses",
    "problem.card1.title": "Clients write... and walk away",
    "problem.card1.desc": "If you reply slowly, the client goes to a competitor and you lose revenue. We respond in 30 seconds.",
    "problem.card2.title": "Missed calls = missed revenue",
    "problem.card2.desc": "When you are busy working, you can't answer. Every missed call is a client who paid someone else.",
    "problem.card3.title": "Website visitors who don't buy",
    "problem.card3.desc": "People visit your site, browse and leave without leaving contact info. You have no way to reach them.",

    // Solution
    "solution.title": "Automatic smart receptionist for your business",
    "solution.sub": "Your website works on its own and brings profit while you focus on what matters",
    "solution.point1": "Instant reply under 30 seconds",
    "solution.point1.desc": "Every message in Viber, Facebook, or your website gets a polite and accurate response instantly.",
    "solution.point2": "Secure Client Vault",
    "solution.point2.desc": "Names, phones, and client interests are automatically recorded in an electronic ledger.",
    "solution.point3": "Automated calendar bookings",
    "solution.point3.desc": "The assistant checks your free hours and books clients directly in your calendar.",

    // Demos
    "demos.title": "Choose your digital path",
    "demos.sub": "Two equally important pillars to scale your business",
    "demos.tab1": "Website & Search (Foundation)",
    "demos.tab2": "AI Receptionist (Engine)",
    "demos.tab3": "Complete Digital Machine",
    "demos.card1.title": "Complete Web Presence & Search",
    "demos.card1.sub": "The face of your business to the world",
    "demos.card1.desc": "A modern website, blog, store, or digital business card built with custom code or a leading CMS (WordPress/Shopify) based on your situation. Includes SEO and local Google Maps presence.",
    "demos.card1.feat1": "Custom code or CMS based on your needs",
    "demos.card1.feat2": "Ultra-fast responsive design",
    "demos.card1.feat3": "Google Maps positioning",
    "demos.card1.feat4": "Monthly SEO maintenance",
    "demos.card1.cta": "View demo site",
    "demos.card2.title": "AI Assistant & Automatic Receptionist",
    "demos.card2.sub": "The 24/7 engine for client bookings",
    "demos.card2.desc": "Smart artificial intelligence that talks to clients in Bulgarian and English and sells for you.",
    "demos.card2.feat1": "24/7 automated replies",
    "demos.card2.feat2": "Viber & Facebook integration",
    "demos.card2.feat3": "Assistant memory (catalog/prices)",
    "demos.card2.feat4": "Automated calendar booking",
    "demos.card2.cta": "Test AI now",
    "demos.card3.title": "Complete Digital Autopilot (Website + AI)",
    "demos.card3.sub": "Maximum automation for serious businesses",
    "demos.card3.desc": "We combine a premium website, continuous Google dominance, and a multi-channel AI assistant into one synced system.",
    "demos.card3.feat1": "Website + Multichannel AI",
    "demos.card3.feat2": "Catalog & stock syncing",
    "demos.card3.feat3": "Full Secure Client Vault (CRM)",
    "demos.card3.feat4": "Priority tech support",
    "demos.card3.cta": "Contact for quote",

    // How it works
    "how.title": "How the digital receptionist works",
    "how.sub": "Three simple steps from first message to real profit",
    "how.step1": "Client messages or calls",
    "how.step1.desc": "In Viber, Messenger, WhatsApp, or your website's contact form.",
    "how.step2": "AI responds and captures interest",
    "how.step2.desc": "Replies in seconds, proposes free hours, or consults on pricing.",
    "how.step3": "You generate revenue",
    "how.step3.desc": "The inquiry is saved in the Client Vault, and the free slot is booked in your calendar.",

    // Pricing
    "pricing.title": "Clear prices with included financial audit",
    "pricing.sub": "Every cent goes to real results. No hidden conditions.",
    "pricing.monthly": "/month",
    "pricing.cta": "Get started now",
    "pricing.popular": "Most Popular",
    "pricing.automation": "Complete Web Presence & Search",
    "pricing.automation.desc": "Professional website (Code or CMS) for perfect search engine visibility",
    "pricing.cms": "AI Smart Agent & Automated Replies",
    "pricing.cms.desc": "Intelligent digital assistant in Viber & Your Website",
    "pricing.code": "Complete Digital Autopilot (Website + AI)",
    "pricing.code.desc": "Complete system to automate and scale your business",
    "pricing.feat.conversations": "conversations/month with clients",
    "pricing.feat.channels": "All chat channels (Viber, WhatsApp, Messenger)",
    "pricing.feat.ai": "Intellectual Core in Bulgarian and English",
    "pricing.feat.crm": "Secure Client Vault (Automated CRM)",
    "pricing.feat.dashboard": "Interactive Dashboard with real stats",
    "pricing.feat.booking": "Automated bookings and calendar integration",
    "pricing.feat.templates": "Custom Code or Leading CMS base (based on client needs)",
    "pricing.feat.hosting": "Premium Edge Hosting + Free SSL included",
    "pricing.feat.builder": "Technical SEO and Geo-maps listing",
    "pricing.feat.api": "Catalog and availability sync",
    "pricing.feat.custom": "Custom automated chains",
    "pricing.feat.support": "24/7 personal phone support",
    "pricing.custom": "Enterprise",
    "pricing.contact": "Talk to us",

    // Testimonials
    "testimonials.title": "Real results from real businesses",
    "testimonials.sub": "How Bulgarian and global companies save time and grow turnover",

    // CTA
    "cta.title": "Ready to automate your business?",
    "cta.sub": "Send us a message — we will reply by email or phone. No commitment. We will show you exactly where to start.",
    "cta.button": "Request free consultation",
    "cta.secondary": "Talk to us",

    // Footer
    "footer.description": "We elevate your brand online — with the solution that actually fits your business.",
    "footer.quickLinks": "Quick Links",
    "footer.solutions": "Solutions",
    "footer.contact": "Contact",
    "footer.automation": "Web Foundation & Local Search",
    "footer.cmsLayer": "AI Smart Agent",
    "footer.codeLayer": "Complete Digital Machine",
    "footer.integrations": "Syncs",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    // Common
    "common.learnMore": "Learn more",
    "common.tryFree": "Get started for free",
    "common.watchDemo": "Watch demo",
    "common.contactUs": "Contact us",
    "common.bgn": "BGN",
  },
} as const;

type TranslationKey = keyof typeof translations.bg;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bg");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("silex-locale");
    const initialLocale: Locale = stored === "bg" || stored === "en" ? stored : "bg";

    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale;
      localStorage.setItem("silex-locale", newLocale);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
