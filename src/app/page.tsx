'use client'

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamic imports for better performance
const Navigation = dynamic(() => import('./components/Navigation'), {
  loading: () => <div style={{ height: '80px' }}></div>,
  ssr: false
})

const Footer = lazy(() => import('./components/Footer'))
const StickyContact = lazy(() => import('./components/StickyContact'))
const StructuredData = lazy(() => import('./components/StructuredData'))
const HiddenSEO = lazy(() => import('./components/HiddenSEO'))

import './components/StickyContact.css'

// ── TRANSLATION DATA ──────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  en: {
    home: 'Home', destinations: 'Destinations', services: 'Services',
    resources: 'Resources', aboutUs: 'About Us', contactUs: 'Contact Us',
    discoveries: 'Discoveries', events: 'Events', marketPlaces: 'Market Places',
    extendVisa: 'Extend Visa', rentApartment: 'Rent Apartment', rentHotels: 'Rent Hotels',
    rentDriveCars: 'Rent / Drive Cars', stayInChina: 'Stay in China', cantonFair: 'Canton Fair',
    toolkits: 'Toolkits', usefulApps: 'Useful Apps', planYourTrip: 'Plan Your Trip',
    bookNow: 'Book Now', heroTitle: 'Discover Guangzhou Like a Local',
    heroSub: 'The premium concierge for international arrivals, long-term expats and business travelers navigating China.',
    topDiscoveries: 'Top Discoveries', exploreSub: 'Curated markets, cultural gems and hidden spots across Guangzhou, handpicked for expatriates.',
    exploreMore: 'Explore More Destinations',
    clientStories: 'Client Stories', storiesSub: 'Real experiences from our global community',
    whyChooseUs: 'Why Choose Us',
    w1t: '24/7 Arrival Support', w1d: 'Day or night our bilingual team is on the ground ready to receive and assist international arrivals.',
    w2t: 'Bilingual Specialists', w2d: 'Our team speaks English, Mandarin, Arabic, French and more — fluently and professionally.',
    w3t: 'Verified Partners', w3d: 'Every driver, landlord and service provider is vetted and trusted through our network.',
    w4t: 'Expat Community', w4d: 'Join thousands of foreigners who call Guangzhou home, supported by our active network.',
    readyToExplore: 'Ready to Explore Guangzhou?',
    ctaSub: 'Let our team handle everything. From your first day in China to long-term expat life.',
    footerDesc: 'The official travel concierge for international arrivals and long-term expats in China.',
    quickLinks: 'Quick Links', servicesCol: 'Services', followUs: 'Follow Us',
    joinUs: 'Join Us', copyright: ' 2026 ForeignersGO',
    privacy: 'Privacy Policy', terms: 'Terms of Service',
    loginRegister: 'Login / Register',
    wechatTitle: 'Connect via WeChat', wechatSub: 'Follow these steps to reach us on WeChat',
    wStep1: 'Create your WeChat account at weixin.qq.com or download the app',
    wStep2: 'Open WeChat and log in to your account',
    wStep3: 'Tap the + icon in the top-right corner',
    wStep4: 'Select "Scan QR Code" and point at the code above',
    wStep5: 'Send "Hello, I need to book a service" to start',
    gotIt: 'Got It — Close',
    viewDetails: 'View Details', readMore: 'Read More',
  },
  zh: {
    home: '首页', destinations: '目的地', services: '服务', resources: '资源',
    aboutUs: '关于我们', contactUs: '联系我们', discoveries: '发现', events: '活动',
    marketPlaces: '市场', extendVisa: '延长签证', rentApartment: '租公寓', rentHotels: '租酒店',
    rentDriveCars: '租车/驾车', stayInChina: '在中国居住', cantonFair: '广交会',
    toolkits: '工具包', usefulApps: '实用应用', planYourTrip: '规划行程',
    bookNow: '立即预订', heroTitle: '像当地人一样发现广州',
    heroSub: '为国际抵港人士、长居外籍人士和商务旅客提供专业礼宾服务。',
    topDiscoveries: '热门发现', exploreSub: '精心挑选广州各地的市场、文化胜地和隐秘景点。',
    exploreMore: '探索更多目的地', clientStories: '客户故事', storiesSub: '来自我们全球社区的真实体验',
    whyChooseUs: '为什么选择我们',
    w1t: '全天候接机支持', w1d: '我们的双语团队随时准备接待和协助国际抵港人士。',
    w2t: '双语专家', w2d: '我们的团队流利讲英语、普通话、阿拉伯语、法语等多种语言。',
    w3t: '认证合作伙伴', w3d: '每位司机、房东和服务提供商均经过严格审核。',
    w4t: '外籍社区', w4d: '加入数千名以广州为家的外国人，享受我们活跃网络的支持。',
    readyToExplore: '准备好探索广州了吗？', ctaSub: '让我们的团队处理一切，从您抵达中国的第一天到长居生活。',
    footerDesc: '为国际抵港人士和长居外籍人士提供官方旅行礼宾服务。',
    quickLinks: '快速链接', servicesCol: '服务', followUs: '关注我们',
    joinUs: '加入我们', copyright: ' 2026 ForeignersGO',
    privacy: '隐私政策', terms: '服务条款', loginRegister: '登录/注册',
    wechatTitle: '通过微信联系', wechatSub: '按照以下步骤通过微信联系我们',
    wStep1: '在weixin.qq.com创建您的微信账户或下载应用',
    wStep2: '打开微信并登录', wStep3: '点击右上角的+图标',
    wStep4: '选择"扫描二维码"并对准上方的二维码',
    wStep5: '发送"您好，我需要预订服务"开始',
    gotIt: '好的 — 关闭', viewDetails: '查看详情', readMore: '阅读更多',
  },
  es: {
    home: 'Inicio', destinations: 'Destinos', services: 'Servicios', resources: 'Recursos',
    aboutUs: 'Sobre Nosotros', contactUs: 'Contáctenos', discoveries: 'Descubrimientos',
    events: 'Eventos', marketPlaces: 'Mercados', extendVisa: 'Extender Visa', rentApartment: 'Alquilar Apartamento', rentHotels: 'Alquilar Hoteles',
    rentDriveCars: 'Alquilar / Conducir Autos', stayInChina: 'Vivir en China', cantonFair: 'Feria de Cantón',
    toolkits: 'Herramientas', usefulApps: 'Aplicaciones Útiles', planYourTrip: 'Planifica tu Viaje',
    bookNow: 'Reservar Ahora', heroTitle: 'Descubre Guangzhou como un Local',
    heroSub: 'El servicio de conserjería premium para viajeros internacionales que navegan por China.',
    topDiscoveries: 'Principales Descubrimientos', exploreSub: 'Mercados seleccionados, joyas culturales y lugares escondidos en Guangzhou, elegidos para expatriados.',
    exploreMore: 'Explorar Más Destinos', clientStories: 'Historias de Clientes',
    storiesSub: 'Experiencias reales de nuestra comunidad global',
    whyChooseUs: 'Por Qué Elegirnos',
    w1t: 'Apoyo 24/7 en Llegadas', w1d: 'Nuestro equipo bilingüe está listo para recibir y asistir a viajeros internacionales día y noche.',
    w2t: 'Especialistas Bilingües', w2d: 'Nuestro equipo habla inglés, mandarín, árabe, francés y más — con fluidez y profesionalismo.',
    w3t: 'Socios Verificados', w3d: 'Cada conductor, propietario y proveedor de servicios es evaluado y confiable a través de nuestra red.',
    w4t: 'Comunidad de Expatriados', w4d: 'Únete a miles de extranjeros que llaman hogar a Guangzhou, apoyados por nuestra red activa.',
    readyToExplore: '¿Listo para Explorar Guangzhou?', ctaSub: 'Deja que nuestro equipo maneje todo. Desde tu primer día en China hasta la vida de expatriado a largo plazo.',
    footerDesc: 'El servicio de conserjería oficial para viajeros internacionales y expatriados de larga duración en China.',
    quickLinks: 'Enlaces Rápidos', servicesCol: 'Servicios', followUs: 'Síguenos',
    joinUs: 'Únete', copyright: ' 2026 ForeignersGO',
    privacy: 'Política de Privacidad', terms: 'Términos de Servicio', loginRegister: 'Iniciar Sesión / Registrarse',
    wechatTitle: 'Conéctate vía WeChat', wechatSub: 'Sigue estos pasos para contactarnos en WeChat',
    wStep1: 'Crea tu cuenta de WeChat en weixin.qq.com o descarga la aplicación',
    wStep2: 'Abre WeChat e inicia sesión', wStep3: 'Toca el ícono + en la esquina superior derecha',
    wStep4: 'Selecciona "Escanear código QR" y apunta al código de arriba',
    wStep5: 'Envía "Hola, necesito reservar un servicio" para comenzar',
    gotIt: 'Entendido — Cerrar', viewDetails: 'Ver Detalles', readMore: 'Leer Más',
  },
  fr: {
    home: 'Accueil', destinations: 'Destinations', services: 'Services', resources: 'Ressources',
    aboutUs: 'À Propos', contactUs: 'Contactez-nous', discoveries: 'Découvertes',
    events: 'Événements', marketPlaces: 'Marchés', extendVisa: 'Extension de Visa',
    rentApartment: 'Louer un Appartement', rentHotels: 'Louer des Hôtels',
    rentDriveCars: 'Louer / Conduire une Voiture', stayInChina: 'Vivre en Chine', cantonFair: 'Foire de Canton',
    toolkits: 'Outils', usefulApps: 'Applications Utiles', planYourTrip: 'Planifier Votre Voyage',
    bookNow: 'Réserver', heroTitle: 'Découvrez Guangzhou Comme un Local',
    heroSub: 'Le service de conciergerie premium pour les arrivées internationales, les expatriés de longue durée et les voyageurs d\'affaires naviguant en Chine.',
    topDiscoveries: 'Meilleures Découvertes', exploreSub: 'Marchés organisés, joyaux culturels et endroits cachés à Guangzhou, sélectionnés pour les expatriés.',
    exploreMore: 'Explorer Plus de Destinations', clientStories: 'Histoires de Clients',
    storiesSub: 'Expériences réelles de notre communauté mondiale',
    whyChooseUs: 'Pourquoi Nous Choisir',
    w1t: 'Assistance Arrivée 24/7', w1d: 'Notre équipe bilingue est prête à recevoir et aider les arrivées internationales, jour et nuit.',
    w2t: 'Spécialistes Bilingues', w2d: 'Notre équipe parle anglais, mandarin, arabe, français et plus — couramment et professionnellement.',
    w3t: 'Partenaires Vérifiés', w3d: 'Chaque chauffeur, propriétaire et prestataire de services est vérifié et approuvé via notre réseau.',
    w4t: 'Communauté d\'Expatriés', w4d: 'Rejoignez des milliers d\'étrangers qui considèrent Guangzhou comme leur maison, soutenus par notre réseau actif.',
    readyToExplore: 'Prêt à Explorer Guangzhou ?', ctaSub: 'Laissez notre équipe tout gérer. De votre premier jour en Chine à la vie d\'expatrié à long terme.',
    footerDesc: 'Le service de conciergerie officiel pour les arrivées internationales et les expatriés de longue durée en Chine.',
    quickLinks: 'Liens Rapides', servicesCol: 'Services', followUs: 'Suivez-nous',
    joinUs: 'Rejoignez-nous', copyright: ' 2026 ForeignersGO',
    privacy: 'Politique de Confidentialité', terms: 'Conditions d\'Utilisation', loginRegister: 'Connexion / Inscription',
    wechatTitle: 'Connectez-vous via WeChat', wechatSub: 'Suivez ces étapes pour nous joindre sur WeChat',
    wStep1: 'Créez votre compte WeChat sur weixin.qq.com ou téléchargez l\'application',
    wStep2: 'Ouvrez WeChat et connectez-vous', wStep3: 'Appuyez sur l\'icône + dans le coin supérieur droit',
    wStep4: 'Sélectionnez "Scanner le code QR" et pointez vers le code ci-dessus',
    wStep5: 'Envoyez "Bonjour, je souhaite réserver un service" pour commencer',
    gotIt: 'Compris — Fermer', viewDetails: 'Voir les Détails', readMore: 'Lire Plus',
  },
  ru: {
    home: 'Главная', destinations: 'Направления', services: 'Услуги', resources: 'Ресурсы',
    aboutUs: 'О Нас', contactUs: 'Контакты', discoveries: 'Открытия', events: 'События',
    marketPlaces: 'Рынки', extendVisa: 'Продление Визы', rentApartment: 'Аренда Квартиры',
    rentHotels: 'Аренда Отелей', rentDriveCars: 'Аренда/Вождение Авто', stayInChina: 'Жизнь в Китае', cantonFair: 'Кантонская Ярмарка',
    toolkits: 'Инструменты', usefulApps: 'Полезные Приложения', planYourTrip: 'Планирование Поездки',
    bookNow: 'Забронировать', heroTitle: 'Откройте Гуанчжоу как Местный Житель',
    heroSub: 'Премиальный консьерж-сервис для международных прибывающих, долгосрочных экспатов и бизнес-путешественников, ориентирующихся в Китае.',
    topDiscoveries: 'Лучшие Открытия', exploreSub: 'Кураторские рынки, культурные жемчужины и скрытые места по всему Гуанчжоу, отобранные для экспатов.',
    exploreMore: 'Исследовать Больше Направлений', clientStories: 'Истории Клиентов',
    storiesSub: 'Реальный опыт из нашего мирового сообщества',
    whyChooseUs: 'Почему Выбирают Нас',
    w1t: 'Поддержка Прибытия 24/7', w1d: 'Наша двуязычная команда готова принимать и помогать международным прибывающим днем и ночью.',
    w2t: 'Двуязычные Специалисты', w2d: 'Наша команда говорит на английском, мандаринском, арабском, французском и других языках — свободно и профессионально.',
    w3t: 'Проверенные Партнеры', w3d: 'Каждый водитель, арендодатель и поставщик услуг проверен и надежен через нашу сеть.',
    w4t: 'Сообщество Экспатов', w4d: 'Присоединяйтесь к тысячам иностранцев, которые называют Гуанчжоу домом, поддерживаемых нашей активной сетью.',
    readyToExplore: 'Готовы Исследовать Гуанчжоу?', ctaSub: 'Позвольте нашей команде позаботиться обо всем. От вашего первого дня в Китае до долгосрочной жизни экспата.',
    footerDesc: 'Официальный консьерж-сервис для международных прибывающих и долгосрочных экспатов в Китае.',
    quickLinks: 'Быстрые Ссылки', servicesCol: 'Услуги', followUs: 'Следите за Нами',
    joinUs: 'Присоединяйтесь', copyright: ' 2026 ForeignersGO',
    privacy: 'Политика Конфиденциальности', terms: 'Условия Использования', loginRegister: 'Войти / Зарегистрироваться',
    wechatTitle: 'Связаться через WeChat', wechatSub: 'Следуйте этим шагам, чтобы связаться с нами в WeChat',
    wStep1: 'Создайте учетную запись WeChat на weixin.qq.com или загрузите приложение',
    wStep2: 'Откройте WeChat и войдите в систему', wStep3: 'Нажмите значок + в правом верхнем углу',
    wStep4: 'Выберите "Сканировать QR-код" и наведите на код выше',
    wStep5: 'Отправьте "Здравствуйте, мне нужно забронировать услугу" для начала',
    gotIt: 'Понятно — Закрыть', viewDetails: 'Подробнее', readMore: 'Читать Далее',
  },
  de: {
    home: 'Startseite', destinations: 'Reiseziele', services: 'Dienstleistungen', resources: 'Ressourcen',
    aboutUs: 'Über Uns', contactUs: 'Kontakt', discoveries: 'Entdeckungen', events: 'Veranstaltungen',
    marketPlaces: 'Märkte', extendVisa: 'Visum Verlängern', rentApartment: 'Wohnung Mieten',
    rentHotels: 'Hotels Mieten', rentDriveCars: 'Auto Mieten/Fahren', stayInChina: 'In China Leben', cantonFair: 'Kanton Messe',
    toolkits: 'Werkzeugkästen', usefulApps: 'Nützliche Apps', planYourTrip: 'Reise Planen',
    bookNow: 'Jetzt Buchen', heroTitle: 'Entdecken Sie Guangzhou wie ein Einheimischer',
    heroSub: 'Der Premium-Concierge für internationale Ankünfte, langfristige Expatriates und Geschäftsreisende in China.',
    topDiscoveries: 'Top-Entdeckungen', exploreSub: 'Kuratierte Märkte, kulturelle Schätze und versteckte Orte in Guangzhou, handverlesen für Expatriates.',
    exploreMore: 'Mehr Reiseziele Entdecken', clientStories: 'Kundenerfahrungen',
    storiesSub: 'Echte Erfahrungen aus unserer globalen Gemeinschaft',
    whyChooseUs: 'Warum Uns Wählen',
    w1t: '24/7 Ankunftsunterstützung', w1d: 'Unser zweisprachiges Team ist rund um die Uhr bereit, internationale Ankünfte zu empfangen und zu unterstützen.',
    w2t: 'Zweisprachige Spezialisten', w2d: 'Unser Team spricht Englisch, Mandarin, Arabisch, Französisch und mehr — fließend und professionell.',
    w3t: 'Verifizierte Partner', w3d: 'Jeder Fahrer, Vermieter und Dienstleister wird durch unser Netzwerk geprüft und ist vertrauenswürdig.',
    w4t: 'Expat-Community', w4d: 'Schließen Sie sich Tausenden von Ausländern an, die Guangzhou ihr Zuhause nennen, unterstützt durch unser aktives Netzwerk.',
    readyToExplore: 'Bereit, Guangzhou zu Erkunden?', ctaSub: 'Lassen Sie unser Team alles regeln. Von Ihrem ersten Tag in China bis zum langfristigen Expat-Leben.',
    footerDesc: 'Der offizielle Reise-Concierge für internationale Ankünfte und langfristige Expatriates in China.',
    quickLinks: 'Schnelllinks', servicesCol: 'Dienstleistungen', followUs: 'Folgen Sie Uns',
    joinUs: 'Mitmachen', copyright: ' 2026 ForeignersGO',
    privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', loginRegister: 'Anmelden / Registrieren',
    wechatTitle: 'Über WeChat Verbinden', wechatSub: 'Folgen Sie diesen Schritten, um uns auf WeChat zu erreichen',
    wStep1: 'Erstellen Sie Ihr WeChat-Konto auf weixin.qq.com oder laden Sie die App herunter',
    wStep2: 'Öffnen Sie WeChat und melden Sie sich an', wStep3: 'Tippen Sie auf das + Symbol in der oberen rechten Ecke',
    wStep4: 'Wählen Sie "QR-Code scannen" und richten Sie ihn auf den obigen Code',
    wStep5: 'Senden Sie "Hallo, ich möchte einen Service buchen" um zu beginnen',
    gotIt: 'Verstanden — Schließen', viewDetails: 'Details Anzeigen', readMore: 'Mehr Lesen',
  },
  ar: {
    home: 'الرئيسية', destinations: 'الوجهات', services: 'الخدمات', resources: 'الموارد',
    aboutUs: 'من نحن', contactUs: 'اتصل بنا', discoveries: 'اكتشافات', events: 'فعاليات',
    marketPlaces: 'الأسواق', extendVisa: 'تمديد التأشيرة', rentApartment: 'استئجار شقة',
    rentHotels: 'استئجار فنادق', rentDriveCars: 'استئجار/قيادة سيارة', stayInChina: 'الإقامة في الصين', cantonFair: 'معرض كانتون',
    toolkits: 'أدوات مساعدة', usefulApps: 'تطبيقات مفيدة', planYourTrip: 'خطط لرحلتك',
    bookNow: 'احجز الآن', heroTitle: 'اكتشف قوانغتشو كالسكان المحليين',
    heroSub: 'خدمة الكونسيرج المتميزة للوافدين الدوليين والمغتربين على المدى الطويل والمسافرين من رجال الأعمال الذين يتنقلون في الصين.',
    topDiscoveries: 'أفضل الاكتشافات', exploreSub: 'أسواق منسقة وجواهر ثقافية وأماكن مخفية في جميع أنحاء قوانغتشو، تم اختيارها خصيصًا للمغتربين.',
    exploreMore: 'استكشف المزيد من الوجهات', clientStories: 'قصص العملاء',
    storiesSub: 'تجارب حقيقية من مجتمعنا العالمي',
    whyChooseUs: 'لماذا تختارنا',
    w1t: 'دعم الوصول 24/7', w1d: 'فريقنا ثنائي اللغة متواجد على مدار الساعة لاستقبال ومساعدة الوافدين الدوليين.',
    w2t: 'متخصصون ثنائيو اللغة', w2d: 'يتحدث فريقنا الإنجليزية والماندرين والعربية والفرنسية والمزيد — بطلاقة واحترافية.',
    w3t: 'شركاء موثوقون', w3d: 'كل سائق ومالك عقار ومزود خدمة يتم فحصه والوثوق به من خلال شبكتنا.',
    w4t: 'مجتمع المغتربين', w4d: 'انضم إلى آلاف الأجانب الذين يعتبرون قوانغتشو موطنًا لهم، بدعم من شبكتنا النشطة.',
    readyToExplore: 'مستعد لاستكشاف قوانغتشو؟', ctaSub: 'دع فريقنا يتولى كل شيء. من يومك الأول في الصين إلى حياة المغتربين على المدى الطويل.',
    footerDesc: 'خدمة الكونسيرج الرسمية للوافدين الدوليين والمغتربين على المدى الطويل في الصين.',
    quickLinks: 'روابط سريعة', servicesCol: 'الخدمات', followUs: 'تابعنا',
    joinUs: 'انضم إلينا', copyright: ' 2026 ForeignersGO',
    privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', loginRegister: 'تسجيل الدخول / التسجيل',
    wechatTitle: 'تواصل عبر WeChat', wechatSub: 'اتبع هذه الخطوات للوصول إلينا على WeChat',
    wStep1: 'أنشئ حساب WeChat الخاص بك على weixin.qq.com أو قم بتنزيل التطبيق',
    wStep2: 'افتح WeChat وقم بتسجيل الدخول إلى حسابك',
    wStep3: 'انقر على أيقونة + في الزاوية العلوية اليمنى',
    wStep4: 'حدد "مسح رمز QR" ووجهه إلى الرمز أعلاه',
    wStep5: 'أرسل "مرحباً، أريد حجز خدمة" لتبدأ',
    gotIt: 'فهمت — إغلاق', viewDetails: 'عرض التفاصيل', readMore: 'اقرأ المزيد',
  },
  am: {
    home: 'መነሻ', destinations: 'መዳረሻዎች', services: 'አገልግሎቶች', resources: 'ሀብቶች',
    aboutUs: 'ስለ እኛ', contactUs: 'ያግኙን', discoveries: 'ግኝቶች', events: 'ዝግጅቶች',
    marketPlaces: 'ገበያዎች', extendVisa: 'ቪዛ ዘርጋ', rentApartment: 'አፓርትማ ተከራይ',
    rentHotels: 'ሆቴሎች ተከራይ', rentDriveCars: 'መኪና ተከራይ/ንዳ', stayInChina: 'በቻይና ቆይ', cantonFair: 'ካንቶን ፌር',
    toolkits: 'መሳሪያዎች', usefulApps: 'ጠቃሚ መተግበሪያዎች', planYourTrip: 'ጉዞህን አቅድ',
    bookNow: 'አሁን ይመዝገቡ', heroTitle: 'ጓንግዙን እንደ አካባቢው ሰው ያግኙ',
    heroSub: 'ለአለም አቀፍ ጎብኚዎች፣ ለረጅም ጊዜ ስደተኞች እና ለንግድ ተጓዦች የሚሆን የላቀ የእንግዳ መቀበያ አገልግሎት።',
    topDiscoveries: 'ከፍተኛ ግኝቶች', exploreSub: 'በጓንግዙ ውስጥ የተመረጡ ገበያዎች፣ ባህላዊ ውድ ሀብቶች እና ድብቅ ቦታዎች፣ ለስደተኞች በልዩ ሁኔታ የተመረጡ።',
    exploreMore: 'ተጨማሪ መዳረሻዎችን ያስሱ', clientStories: 'የደንበኛ ታሪኮች',
    storiesSub: 'ከአለም አቀፍ ማህበረሰባችን እውነተኛ ተሞክሮዎች',
    whyChooseUs: 'ለምን እኛን ይምረጡ',
    w1t: '24/7 የደረሰ ድጋፍ', w1d: 'ሌሊትም ቀንም የሁለት ቋንቋ ቡድናችን አለም አቀፍ ጎብኚዎችን ለመቀበል እና ለመርዳት ዝግጁ ነው።',
    w2t: 'የሁለት ቋንቋ ባለሙያዎች', w2d: 'ቡድናችን እንግሊዘኛ፣ ማንዳሪን፣ አረብኛ፣ ፈረንሳይኛ እና ሌሎችንም በቀላሉ እና በሙያዊ መልኩ ይናገራል።',
    w3t: 'የተረጋገጡ አጋሮች', w3d: 'እያንዳንዱ አሽከርካሪ፣ አከራይ እና አገልግሎት ሰጪ በኔትዎርካችን አማካኝነት ተረጋግጦ የታመነ ነው።',
    w4t: 'የስደተኛ ማህበረሰብ', w4d: 'በንቃት ኔትዎርካችን የሚደገፉ፣ ጓንግዙን መኖሪያ አድርገው ከሚኖሩ በሺዎች ከሚቆጠሩ የውጭ ዜጎች ጋር ይቀላቀሉ።',
    readyToExplore: 'ጓንግዙን ለማሰስ ዝግጁ ነዎት?', ctaSub: 'ቡድናችን ሁሉንም ነገር እንዲይዝ ይፍቀዱ። ከመጀመሪያው ቀንዎ በቻይና እስከ ረጅም ጊዜ የስደተኛ ህይወት ድረስ።',
    footerDesc: 'ለአለም አቀፍ ጎብኚዎች እና ለረጅም ጊዜ ስደተኞች በቻይና ውስጥ ይፋዊ የጉዞ እንግዳ መቀበያ አገልግሎት።',
    quickLinks: 'ፈጣን አገናኞች', servicesCol: 'አገልግሎቶች', followUs: 'ይከተሉን',
    joinUs: 'ይቀላቀሉን', copyright: ' 2026 ForeignersGO',
    privacy: 'የግላዊነት ፖሊሲ', terms: 'የአገልግሎት ውሎች', loginRegister: 'ግባ / ተመዝገብ',
    wechatTitle: 'በWeChat ይገናኙ', wechatSub: 'እነዚህን ደረጃዎች በመከተል WeChat ላይ ያግኙን',
    wStep1: 'በ weixin.qq.com ላይ የWeChat መለያዎን ይፍጠሩ ወይም መተግበሪያውን ያውርዱ',
    wStep2: 'WeChat ን ይክፈቱ እና ወደ መለያዎ ይግቡ',
    wStep3: 'በላይኛው ቀኝ ጥግ ላይ ያለውን + አዶ ይንኩ',
    wStep4: '"QR ኮድ ቅኝት" ን ይምረጡ እና ከላይ ወዳለው ኮድ ያነጣጥሩ',
    wStep5: 'ለመጀመር "ሰላም፣ አገልግሎት መያዝ እፈልጋለሁ" በማለት ይላኩ',
    gotIt: 'ገባኝ — ዝጋ', viewDetails: 'ዝርዝሮችን ይመልከቱ', readMore: 'ተጨማሪ ያንብቡ',
  },
}

// ── DATA ─────────────────────────────────────────────────────────
const DISCOVERIES = [
  { id: 1, tag: 'Markets', img: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=900&auto=format&fit=crop', titleKey: 'Canton Fair District', descKey: 'The world\'s largest trade fair hub. Thousands of wholesale booths across textiles, electronics, and consumer goods.', link: '#canton-fair' },
  { id: 2, tag: 'Culture', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=900&auto=format&fit=crop', titleKey: 'Chen Clan Ancestral Hall', descKey: 'A masterpiece of Qing dynasty folk architecture with breathtaking carved stonework and ceramic art.', link: '#chen-clan' },
  { id: 3, tag: 'Dining', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=900&auto=format&fit=crop', titleKey: 'Dim Sum Old Town Trail', descKey: 'Authentic morning yum cha through Liwan\'s heritage teahouses. The best dim sum in southern China.', link: '#dim-sum' },
  { id: 4, tag: 'Urban', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=900&auto=format&fit=crop', titleKey: 'Tianhe CBD District', descKey: 'Guangzhou\'s gleaming skyline. Shopping, finance, and the famous Guangzhou Tower all in one district.', link: '#tianhe-cbd' },
  { id: 5, tag: 'Nature', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop', titleKey: 'Baiyun Mountain Park', descKey: 'Escape the city at Guangzhou\'s beloved green lung — cable cars, temples, and panoramic views.', link: '#baiyun-mountain' },
  { id: 6, tag: 'Nightlife', img: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=900&auto=format&fit=crop', titleKey: 'Zhujiang New Town Night', descKey: 'Neon-lit riverside promenades, rooftop bars, and the best night views over the Pearl River.', link: '#zhujiang-night' },
]

const STORIES = [
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', name: 'Mark T.', origin: 'Business Traveler, USA', quote: '"The best arrival experience I\'ve ever had in China. They handled my airport transfer, SIM card and hotel check-in within hours."' },
  { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', name: 'Amara D.', origin: 'Expat Resident, Ethiopia', quote: '"My visa renewal was done in 2 days completely stress-free. I cannot imagine navigating Guangzhou without ForeignersGO."' },
  { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', name: 'Carlos M.', origin: 'Trade Buyer, Spain', quote: '"Found my Canton Fair apartment in the right location at the right price. Zero language barrier, zero hassle."' },
  { img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', name: 'Fatima A.', origin: 'Entrepreneur, Saudi Arabia', quote: '"ForeignersGO introduced me to the best wholesale markets and provided a bilingual guide throughout my sourcing trip."' },
]

export default function ForeignersGoOfficial() {
  const [lang, setLang] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showWeChatModal, setShowWeChatModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showStickyWidget, setShowStickyWidget] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [servOpen, setServOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive sizing functions
  const getLogoSize = () => {
    if (windowSize.width < 768) return { height: '40vh', width: '40vh', max: 300 }
    if (windowSize.width < 1200) return { height: '50vh', width: '50vh', max: 400 }
    return { height: '60vh', width: '60vh', max: 600 }
  }

  const getLineWidth = () => {
    if (windowSize.width < 768) return '60px'
    if (windowSize.width < 1200) return '120px'
    return '180px'
  }

  const getFontSize = () => {
    if (windowSize.width < 768) return '10px'
    if (windowSize.width < 1200) return '12px'
    return '14px'
  }

  const getDotSize = () => {
    if (windowSize.width < 768) return '6px'
    if (windowSize.width < 1200) return '8px'
    return '10px'
  }

  const getGap = () => {
    if (windowSize.width < 768) return '6px'
    if (windowSize.width < 1200) return '8px'
    return '12px'
  }

  // SEO Structured Data
  const organizationData = {
    name: 'ForeignersGO',
    description: 'Premium travel concierge services in Guangzhou, China. Specializing in Canton Fair 2026, airport pickup, halal food tours, visa assistance, and business support.',
    url: 'https://foreignersgo.com',
    logo: 'https://foreignersgo.com/foreignersgologo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8618728744992',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Amharic']
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN'
    },
    sameAs: [
      'https://wa.me/8618728744992',
      'https://t.me/foreignersgo'
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Guangzhou, China'
    },
    knowsAbout: [
      'Canton Fair 2026',
      'Guangzhou airport pickup',
      'China travel services',
      'Halal food in China',
      'Business services in China',
      'Visa assistance China'
    ]
  }

  const serviceData = {
    name: 'Canton Fair 2026 Services',
    description: 'Complete Canton Fair 2026 assistance including airport pickup, accommodation, transport, translation, and business consultation.',
    provider: {
      name: 'ForeignersGO',
      url: 'https://foreignersgo.com'
    },
    areaServed: 'Guangzhou, China',
    hasOfferCatalog: {
      name: 'Canton Fair Services',
      itemListElement: [
        {
          name: 'Airport Pickup & Transfer',
          description: 'Professional airport pickup from Guangzhou Baiyun International Airport'
        },
        {
          name: 'Hotel Accommodation',
          description: 'Premium hotel booking near Canton Fair complex with special rates'
        },
        {
          name: 'Daily Fair Transport',
          description: 'Reliable daily transportation between hotel and Canton Fair venue'
        },
        {
          name: 'Translation Services',
          description: 'Professional interpreters for business negotiations during the fair'
        },
        {
          name: 'Business Consultation',
          description: 'Expert guidance on navigating the fair and finding suppliers'
        }
      ]
    }
  }
  
  const [activeStory, setActiveStory] = useState(0)
  const [langOpen, setLangOpen] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const footerBookRef = useRef<HTMLElement>(null)
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  // ── COLORS (updated to match new logo) ──
  const darkGrey   = '#2C3E50'
  const darkGreyMid= '#34495E'
  const red        = '#E74C3C'
  const redLight   = '#C0392B'
  const gold       = '#F39C12'
  const goldLight  = '#F1C40F'
  const cream      = '#FFFFFF'
  const creamDk    = '#ECF0F1'

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)
      const w = window.innerWidth
      const isMobileLayout = w <= 900
      const y = window.scrollY
      const vh = window.innerHeight
      const docEl = document.documentElement
      const scrollBottom = vh + y
      const pageLen = docEl.scrollHeight
      const nearPageEnd = pageLen > vh + 80 && scrollBottom >= pageLen - 96

      if (isMobileLayout) {
        // Show when scrolled past first container (hero section)
        const passedFirstSection = y > vh * 0.8
        // Hide when footer is visible
        const footerVisible = scrollBottom >= pageLen - 200
        setShowStickyWidget(passedFirstSection && !footerVisible)
        return
      }

      const el = footerBookRef.current
      if (!el) {
        setShowStickyWidget(false)
        return
      }
      const top = el.getBoundingClientRect().top
      const passedHero = y > Math.min(700, vh * 0.85)
      const footerNotYetInView = top > vh * 0.06
      setShowStickyWidget(passedHero && footerNotYetInView)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    }, [isLoading])

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [menuOpen])

  const contact = (p: string) => {
    const msg = encodeURIComponent('Hello! I would like to book a service with ForeignersGO. Please assist me with my travel needs to China.')
    if (p === 'whatsapp') window.open(`https://wa.me/8619584750412?text=${msg}`, '_blank')
    if (p === 'telegram') window.open(`https://t.me/+8619584750412?text=${msg}`, '_blank')
    if (p === 'wechat') setShowWeChatModal(true)
  }

  // ── LANGUAGE LABELS ──
  const LANGS = [
    { code: 'en', label: '🇬🇧 English' }, { code: 'zh', label: '🇨🇳 中文' },
    { code: 'es', label: '🇪🇸 Español' }, { code: 'fr', label: '🇫🇷 Français' },
    { code: 'ru', label: '🇷🇺 Русский' }, { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'ar', label: '🇸🇦 العربية' }, { code: 'am', label: '🇪🇹 አማርኛ' },
  ]

  // ── LOADER ──
  if (isLoading) return (
    <div style={{ 
      height:'100vh', 
      background:'#FFFFFF', 
      display:'flex', 
      flexDirection:'column', 
      alignItems:'center', 
      justifyContent:'center',
      padding:'20px',
      boxSizing:'border-box'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fgLoaderIn { to { opacity:1; transform:translateY(0); } }
        @keyframes fgLineGrow { to { width:180px; } }
        @keyframes fgPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}</style>
      <div 
        className="logo-container"
        style={{ 
          height: getLogoSize().height, 
          width: getLogoSize().width, 
          maxHeight: getLogoSize().max + 'px',
          maxWidth: getLogoSize().max + 'px',
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          opacity:0, 
          transform:'translateY(20px)', 
          animation:'fgLoaderIn .8s .2s ease forwards',
          position:'relative'
        }}
      >
        <img 
          src="/foreignersgologo.png" 
          alt="ForeignersGO Logo"
          className="logo-image"
          style={{ 
            height:'100%', 
            width:'100%', 
            objectFit:'contain',
            animation:'fgPulse 2s ease-in-out infinite',
            maxWidth:'100%',
            maxHeight:'100%'
          }}
        />
      </div>
      <div style={{ 
        height:'2px', 
        background:darkGrey, 
        marginTop:'25px', 
        animation:'fgLineGrow 1.4s .8s ease forwards',
        maxWidth:'200px',
        width: getLineWidth()
      }} />
      <div 
        className="tagline"
        style={{ 
          fontFamily:"'DM Sans',sans-serif", 
          fontSize: getFontSize(), 
          letterSpacing:'2px', 
          textTransform:'uppercase', 
          color:darkGrey, 
          marginTop:'20px', 
          opacity:0, 
          animation:'fgLoaderIn .6s 1.6s ease forwards',
          textAlign:'center'
        }}
      >
        Your China Concierge
      </div>
      <div 
        className="loading-dots"
        style={{ 
          marginTop:'40px', 
          display:'flex', 
          gap: getGap()
        }}
      >
        {[0,1,2].map(i => (
          <div 
            key={i} 
            style={{ 
              width: getDotSize(), 
              height: getDotSize(), 
              borderRadius:'50%', 
              background:darkGrey, 
              animation:`fgPulse 1.2s ${i*0.2}s ease-in-out infinite` 
            }} 
          />
        ))}
      </div>
    </div>
  )

  return (
    <>
    <Suspense fallback={<div></div>}>
      <StructuredData type="Organization" data={organizationData} />
      <StructuredData type="Service" data={serviceData} />
      <HiddenSEO lang={lang} />
    </Suspense>
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="container" style={{ fontFamily:"'DM Sans',sans-serif", background:cream, color:darkGrey, width:'100vw', maxWidth:'100vw', margin:'0 auto', padding:'0' }}>

    {/* ══════════════ GLOBAL STYLES ══════════════ */}
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      html { width:100%; }
      body { width:100%; max-width:100%; }
      
      /* RESPONSIVE CONTAINER */
      .fg-container { 
        width:100%; 
        max-width:100%; 
        margin:0 auto; 
        padding:0 16px;
      }
      
      @media (max-width:480px) {
        .fg-container { padding:0 12px; }
      }
      @media (min-width:481px) and (max-width:768px) {
        .fg-container { padding:0 20px; }
      }
      @media (min-width:769px) and (max-width:1024px) {
        .fg-container { padding:0 24px; max-width:100%; }
      }
      @media (min-width:1025px) and (max-width:1440px) {
        .fg-container { padding:0 32px; max-width:1200px; }
      }
      @media (min-width:1441px) {
        .fg-container { padding:0 40px; max-width:1400px; }
      }

      
      /* MARQUEE */
      @keyframes fgMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

      /* HERO BG ZOOM */
      @keyframes fgZoom { to { transform:scale(1.0); } }
      .fg-hero-bg { animation: fgZoom 14s ease-in-out infinite alternate; }

      /* HERO TEXT */
      @keyframes fgUp { to { opacity:1; transform:translateY(0); } }
      .fg-h1 { opacity:0; transform:translateY(20px); animation:fgUp .8s .1s ease forwards; }
      .fg-h2 { opacity:0; transform:translateY(20px); animation:fgUp .8s .25s ease forwards; }
      .fg-h3 { opacity:0; transform:translateY(20px); animation:fgUp .8s .4s ease forwards; }
      .fg-h4 { opacity:0; transform:translateY(20px); animation:fgUp .8s .55s ease forwards; }
      .fg-h5 { opacity:0; animation:fgUp .8s .7s ease forwards; }

      /* DISC CARD */
      .fg-disc img { transition:transform .7s ease, filter .7s ease; filter:brightness(.6); }
      .fg-disc:hover img { transform:scale(1.07); filter:brightness(.4); }
      .fg-disc-tag { opacity:0; transform:translateY(6px); transition:all .3s .05s; }
      .fg-disc:hover .fg-disc-tag { opacity:1; transform:translateY(0); }
      .fg-disc-arrow { transition:gap .3s, color .3s; }
      .fg-disc:hover .fg-disc-arrow { gap:14px !important; color:${gold} !important; }
      .fg-disc-pb { transition:padding-bottom .4s; }
      .fg-disc:hover .fg-disc-pb { padding-bottom:36px !important; }

      /* SERVICE CARD */
      .fg-svc { transition:background .35s; }
      .fg-svc::after { content:''; position:absolute; bottom:0; left:0; right:100%; height:2px; background:${gold}; transition:right .4s; }
      .fg-svc:hover { background:${darkGreyMid} !important; }
      .fg-svc:hover::after { right:0; }

      /* STORY ITEM */
      .fg-story-item { transition:background .25s, padding-left .25s; cursor:pointer; }
      .fg-story-item:hover { background:${creamDk}; padding-left:12px !important; }
      .fg-story-item.fg-active { border-left:3px solid ${gold} !important; background:${creamDk}; }

      /* WHY CARD */
      .fg-why { transition:transform .35s, box-shadow .35s; }
      .fg-why:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,.08); }

      /* NAV DROPDOWN */
      .fg-dd { display:none; position:absolute; top:calc(100% + 8px); left:0; background:#fff;
        min-width:200px; box-shadow:0 20px 50px rgba(0,0,0,.12); border-radius:4px;
        padding:8px 0; z-index:999; border-top:2px solid ${gold}; }
      .fg-ddp { position:relative; }
      .fg-ddp:hover .fg-dd { display:block; animation:fgDDIn .25s ease; }
      @keyframes fgDDIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      .fg-dd a { display:block; padding:10px 18px; font-size:13px; color:${darkGrey}; text-decoration:none;
        transition:background .2s, color .2s; white-space:nowrap; }
      .fg-dd a:hover { background:${cream}; color:${gold}; }

      /* SCROLL LINE */
      @keyframes fgScrollPulse { 0%,100%{opacity:.3} 50%{opacity:1} }

      /* STICKY WIDGET — contact icons only */
      .fg-sticky-widget {
        animation: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        bottom: max(22px, env(safe-area-inset-bottom, 0px));
        flex-direction: column !important;
        align-items: center !important;
        flex-wrap: nowrap !important;
        background: transparent !important;
        backdrop-filter: none !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
      .fg-sticky-widget .fg-sticky-book {
        white-space: nowrap !important;
      }
      .fg-sticky-orbits { 
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        flex-wrap: nowrap !important;
        gap: 8px !important;
      }
      .fg-sticky-orbit {
        width: 48px !important;
        height: 48px !important;
        border-radius: 12px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        transition: all .3s !important;
        border: 2px solid rgba(255,255,255,0.3) !important;
        position: relative !important;
      }
      .fg-sticky-orbit:hover {
        transform: translateY(-3px) scale(1.05) !important;
        border-color: rgba(255,255,255,0.6) !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
      }
      .fg-sticky-orbit:active {
        transform: translateY(-1px) scale(0.98) !important;
      }
      @media (max-width:900px) {
        .fg-sticky-widget {
          position: fixed !important;
          left: auto !important;
          right: max(14px, env(safe-area-inset-right, 0px)) !important;
          top: 70% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          margin: 0 !important;
          padding: 14px 16px !important;
          gap: 12px !important;
        }
        .fg-sticky-orbits { 
          gap: 12px !important;
        }
        .fg-sticky-orbit {
          width: 52px !important;
          height: 52px !important;
          font-size: 11px !important;
          border-radius: 14px !important;
        }
        .fg-sticky-orbit:hover {
          transform: translateY(-4px) scale(1.08) !important;
        }
      }

      /* MODAL */
      @keyframes fgModalIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

      /* BUTTON EFFECTS */
      .fg-btn-gold { transition:background .3s, transform .2s; }
      .fg-btn-gold:hover { background:${goldLight} !important; transform:translateY(-2px); }
      .fg-btn-outline { transition:border-color .3s, color .3s; }
      .fg-btn-outline:hover { border-color:${gold} !important; color:${gold} !important; }

      /* TESTIMONIAL */
      .fg-test-item { transition:padding-left .25s; }
      .fg-test-item:hover { padding-left:8px; }

      /* FOOTER LINK */
      .fg-flink { transition:color .25s; cursor:pointer; display:block; font-size:13px; color:rgba(255,255,255,.4); margin-bottom:12px; text-decoration:none; }
      .fg-flink:hover { color:${goldLight}; }

      /* LANG DROPDOWN */
      .fg-lang-dd { position:absolute; top:calc(100% + 8px); right:0; background:#fff;
        min-width:160px; border-radius:4px; box-shadow:0 16px 40px rgba(0,0,0,.15);
        border-top:2px solid ${gold}; z-index:9999; overflow:hidden; }
      .fg-lang-item { display:flex; align-items:center; gap:8px; padding:10px 14px;
        font-size:13px; cursor:pointer; color:${darkGrey}; transition:background .2s; }
      .fg-lang-item:hover { background:${cream}; }
      .fg-lang-item.active { color:${gold}; font-weight:600; }

      /* MOBILE */
      @media (max-width:900px) {
        .fg-nav-links { display:none !important; }
        .fg-hamburger { display:flex !important; }
        .fg-stories-grid { grid-template-columns:1fr !important; }
        .fg-footer-grid { grid-template-columns:1fr 1fr !important; gap:40px !important; }
      }
      @media (max-width:768px) {
        .fg-disc-grid { grid-template-columns:1fr !important; }
        .fg-disc-grid > div:first-child { grid-column:1 !important; }
        .fg-svc-grid { grid-template-columns:1fr !important; }
        .fg-why-grid { grid-template-columns:1fr !important; }
        .fg-stats-grid { grid-template-columns:1fr 1fr !important; }
        .fg-footer-grid { grid-template-columns:1fr !important; gap:40px !important; }
        .fg-cta-btns { flex-direction:column !important; align-items:center !important; }
        .fg-hero-content { padding:0 5% 20vh !important; }
        /* Keep contacts inside hero only (avoid duplicating sticky WA/TG/WC) */
        .fg-hero-contacts {
          position:absolute !important;
          right:5% !important;
          bottom:calc(88px + env(safe-area-inset-bottom, 0px)) !important;
          top:auto !important;
          left:auto !important;
          transform:none !important;
          flex-direction:row !important;
          gap:10px !important;
          z-index:2 !important;
        }
        .fg-hero-contacts > div {
          width:46px !important;
          height:46px !important;
          font-size:10px !important;
        }
        /* Ensure all content is visible on mobile */
        #hero { display: flex !important; visibility: visible !important; padding-top: 80px !important; }
        .fg-hero-bg { display: block !important; visibility: visible !important; }
        .fg-hero-content { display: block !important; visibility: visible !important; }
        .fg-h1, .fg-h2, .fg-h3, .fg-h4, .fg-h5 { display: block !important; visibility: visible !important; }
      }
      @media (max-width:640px) {
        .fg-stats-grid { grid-template-columns:1fr !important; }
      }
    `}</style>

    {/* ══════════════ NAVBAR ══════════════ */}
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      padding: isScrolled ? '8px 5%' : '12px 5%',
      height: isScrolled ? '60px' : '80px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      transition:'all .45s cubic-bezier(0.4, 0, 0.2, 1)',
      background: isScrolled 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: isScrolled 
        ? 'blur(10px) saturate(100%)' 
        : 'blur(8px) saturate(100%)',
      WebkitBackdropFilter: isScrolled 
        ? 'blur(10px) saturate(100%)' 
        : 'blur(8px) saturate(100%)',
      borderBottom: isScrolled 
        ? `1px solid rgba(0, 0, 0, 0.1)` 
        : `1px solid rgba(0, 0, 0, 0.05)`,
      boxShadow: isScrolled 
        ? '0 2px 10px rgba(0, 0, 0, 0.1)' 
        : '0 1px 5px rgba(0, 0, 0, 0.05)',
      minHeight: isScrolled ? '80px' : '100px',
    }}>
      {/* Logo */}
      <Link href="/" style={{ fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:900, color:'#2C3E50', textDecoration:'none', letterSpacing:'-0.5px', flexShrink:0, display:'flex', alignItems:'center', gap:'8px' }}>
        <img 
          src="/foreignersgologo.png" 
          alt="ForeignersGO Logo"
          style={{ 
            height:'60px', 
            width:'auto', 
            objectFit:'contain'
          }}
        />
      </Link>

      {/* Desktop links */}
      <div className="fg-nav-links" style={{ display:'flex', alignItems:'center', gap:'4px', flex:1, justifyContent:'center' }}>
        {/* Home */}
        <Link href="/" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', textDecoration:'none', letterSpacing:'.3px', transition:'color .25s', borderRadius:'3px' }}
          onMouseEnter={e=>e.currentTarget.style.color='#E74C3C'} onMouseLeave={e=>e.currentTarget.style.color='#2C3E50'}>
          {t('home')}
        </Link>
        {/* Destinations dropdown */}
        <div className="fg-ddp" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', cursor:'pointer', letterSpacing:'.3px', userSelect:'none', display:'flex', alignItems:'center', gap:'4px' }}>
          {t('destinations')} <span style={{ fontSize:'9px', opacity:.6 }}>▾</span>
          <div className="fg-dd">
            <a href="/destinations">{t('discoveries')}</a>
            <a href="/destinations">{t('events')}</a>
            <a href="/destinations">{t('marketPlaces')}</a>
          </div>
        </div>
        {/* Services dropdown */}
        <div className="fg-ddp" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', cursor:'pointer', letterSpacing:'.3px', userSelect:'none', display:'flex', alignItems:'center', gap:'4px' }}>
          {t('services')} <span style={{ fontSize:'9px', opacity:.6 }}>▾</span>
          <div className="fg-dd">
            <a href="/services">{t('extendVisa')}</a>
            <a href="/services">{t('rentApartment')}</a>
            <a href="/services">{t('rentHotels')}</a>
            <a href="/services">{t('rentDriveCars')}</a>
            <a href="/canton-fair">{t('cantonFair')}</a>
            <a href="/services">{t('stayInChina')}</a>
          </div>
        </div>
        {/* Resources dropdown */}
        <div className="fg-ddp" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', cursor:'pointer', letterSpacing:'.3px', userSelect:'none', display:'flex', alignItems:'center', gap:'4px' }}>
          {t('resources')} <span style={{ fontSize:'9px', opacity:.6 }}>▾</span>
          <div className="fg-dd">
            <a href="/resources">{t('toolkits')}</a>
            <a href="/resources">{t('usefulApps')}</a>
            <a href="/resources">{t('planYourTrip')}</a>
          </div>
        </div>
        <a href="/about" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', textDecoration:'none', letterSpacing:'.3px', transition:'color .25s', borderRadius:'3px' }}
          onMouseEnter={e=>e.currentTarget.style.color='#E74C3C'} onMouseLeave={e=>e.currentTarget.style.color='#2C3E50'}>
          {t('aboutUs')}
        </a>
        <a href="/contact" style={{ padding:'8px 14px', fontSize:'13px', fontWeight:500, color:'#2C3E50', textDecoration:'none', letterSpacing:'.3px', transition:'color .25s', borderRadius:'3px' }}
          onMouseEnter={e=>e.currentTarget.style.color='#E74C3C'} onMouseLeave={e=>e.currentTarget.style.color='#2C3E50'}>
          {t('contactUs')}
        </a>
      </div>

      {/* Right side: lang + person icon */}
      <div className="fg-nav-links" style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
        {/* Language selector */}
        <div style={{ position:'relative' }}>
          <div
            onClick={() => setLangOpen(!langOpen)}
            style={{ display:'flex', alignItems:'center', gap:'6px', padding:'7px 12px', border:'1px solid rgba(44,62,80,.25)', borderRadius:'3px', cursor:'pointer', fontSize:'12px', color:'#2C3E50', userSelect:'none', transition:'border-color .25s' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='#E74C3C'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(44,62,80,.25)'}>
            {LANGS.find(l=>l.code===lang)?.label.slice(0,4)}&nbsp;
            <span style={{ fontSize:'9px', opacity:.6 }}>▾</span>
          </div>
          {langOpen && (
            <div className="fg-lang-dd">
              {LANGS.map(l => (
                <div key={l.code} className={`fg-lang-item${lang===l.code?' active':''}`}
                  onClick={() => { setLang(l.code); setLangOpen(false) }}>
                  {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Login icon */}
        <div title={t('loginRegister')} style={{ width:'36px', height:'36px', borderRadius:'50%', border:'1px solid rgba(44,62,80,.25)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'border-color .25s, background .25s' }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#E74C3C';(e.currentTarget as HTMLElement).style.background='rgba(231,76,60,.15)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(44,62,80,.25)';(e.currentTarget as HTMLElement).style.background='transparent'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>

      {/* Hamburger */}
      <div className="fg-hamburger" style={{ display:'none', flexDirection:'column', gap:'5px', cursor:'pointer', padding:'4px', marginLeft:'12px' }} onClick={() => {
        if (menuOpen) { setDestOpen(false); setServOpen(false); setResOpen(false) }
        setMenuOpen(!menuOpen)
      }}>
        <span style={{ width:'22px', height:'1.5px', background:'#2C3E50', display:'block', transition:'all .3s', transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
        <span style={{ width:'22px', height:'1.5px', background:'#2C3E50', display:'block', transition:'all .3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width:'22px', height:'1.5px', background:'#2C3E50', display:'block', transition:'all .3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
      </div>
    </nav>

    {/* Mobile Menu */}
    {menuOpen && (
      <div style={{
        position:'fixed',
        left:0,
        right:0,
        bottom:0,
        top: isScrolled ? 80 : 100,
        background:darkGrey,
        zIndex:998,
        display:'flex',
        flexDirection:'column',
        alignItems:'stretch',
        padding:'24px 24px 40px',
        overflowY:'auto',
        WebkitOverflowScrolling:'touch',
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', maxWidth:'360px', width:'100%', margin:'0 auto' }}>
          <Link href="/" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', textDecoration:'none' }}>{t('home')}</Link>

          <button type="button" onClick={() => { setDestOpen(d => !d); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
            {t('destinations')} <span style={{ fontSize:'14px', opacity:.7 }}>{destOpen ? '▴' : '▾'}</span>
          </button>
          {destOpen && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', paddingBottom:'8px' }}>
              <Link href="/destinations" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'16px', color:'rgba(255,255,255,.85)', textDecoration:'none' }}>{t('discoveries')}</Link>
              <Link href="/destinations" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'16px', color:'rgba(255,255,255,.85)', textDecoration:'none' }}>{t('events')}</Link>
              <Link href="/destinations" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'16px', color:'rgba(255,255,255,.85)', textDecoration:'none' }}>{t('marketPlaces')}</Link>
            </div>
          )}

          <button type="button" onClick={() => { setServOpen(s => !s); setDestOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
            {t('services')} <span style={{ fontSize:'14px', opacity:.7 }}>{servOpen ? '▴' : '▾'}</span>
          </button>
          {servOpen && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', paddingBottom:'8px' }}>
              {(['extendVisa','rentApartment','rentHotels','rentDriveCars','stayInChina'] as const).map(k => (
                <Link key={k} href="/services" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'16px', color:'rgba(255,255,255,.85)', textDecoration:'none' }}>{t(k)}</Link>
              ))}
            </div>
          )}

          <button type="button" onClick={() => { setResOpen(r => !r); setDestOpen(false); setServOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
            {t('resources')} <span style={{ fontSize:'14px', opacity:.7 }}>{resOpen ? '▴' : '▾'}</span>
          </button>
          {resOpen && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', paddingBottom:'8px' }}>
              {(['toolkits','usefulApps','planYourTrip'] as const).map(k => (
                <Link key={k} href="/resources" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'16px', color:'rgba(255,255,255,.85)', textDecoration:'none' }}>{t(k)}</Link>
              ))}
            </div>
          )}

          <Link href="/about" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', textDecoration:'none' }}>{t('aboutUs')}</Link>
          <Link href="/contact" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', textDecoration:'none' }}>{t('contactUs')}</Link>
        </div>
        <div style={{ display:'flex', gap:'16px', marginTop:'28px', flexWrap:'wrap', justifyContent:'center' }}>
          {LANGS.map(l => (
            <button key={l.code} type="button" onClick={() => { setLang(l.code); setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'20px', cursor:'pointer', opacity: lang===l.code ? 1 : .5, background:'none', border:'none', padding:'4px' }}>
              {l.label.slice(0,2)}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* ══════════════ HERO ══════════════ */}
    <header id="hero" style={{ minHeight:'100vh', position:'relative', display:'flex', flexDirection:'column', justifyContent:'flex-end', overflow:'hidden' }}>
      <div className="fg-hero-bg" style={{
        position:'absolute', inset:0, transform:'scale(1.06)',
        background:`linear-gradient(160deg,rgba(44,62,80,.92) 0%,rgba(44,62,80,.75) 40%,rgba(231,76,60,.85) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2400&auto=format&fit=crop') center/cover no-repeat`,
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }} />

      {/* Floating contact bubbles */}
      <div className="fg-hero-contacts" style={{ position:'absolute', right:'5%', top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:'14px', zIndex:2 }}>
        {[
          { p:'whatsapp', label:'WA', bg:'rgba(37,211,102,.28)', title:'WhatsApp' },
          { p:'telegram', label:'TG', bg:'rgba(0,136,204,.28)', title:'Telegram' },
          { p:'wechat',   label:'WC', bg:'rgba(7,193,96,.28)',  title:'WeChat' },
        ].map(({ p, label, bg, title }) => (
          <div key={p} title={title} onClick={() => contact(p)} style={{ width:'52px', height:'52px', borderRadius:'50%', background:bg, border:'1px solid rgba(255,255,255,.22)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:700, fontSize:'12px', color:'#fff', letterSpacing:'0', transition:'transform .3s, border-color .3s' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.12)';(e.currentTarget as HTMLElement).style.borderColor=gold}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)';(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.22)'}}>
            {label}
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="fg-hero-content" style={{ position:'relative', zIndex:2, padding:'100px 5% 10vh', maxWidth:'820px' }}>
        <div className="fg-h1" style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:gold, marginBottom:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
          <span style={{ width:'30px', height:'1px', background:gold, display:'inline-block' }} />
          Guangzhou, China
        </div>
        <h1 className="fg-h2" style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(44px,8vw,90px)', fontWeight:900, lineHeight:.95, color:'#fff', marginBottom:'22px' }}>
          {t('heroTitle').split(' ').slice(0,2).join(' ')}<br />
          <em style={{ color:redLight, fontStyle:'italic' }}>{t('heroTitle').split(' ').slice(2,3).join(' ')}</em><br />
          {t('heroTitle').split(' ').slice(3).join(' ')}
        </h1>
        <p className="fg-h3" style={{ fontSize:'16px', lineHeight:1.75, color:'rgba(255,255,255,.65)', maxWidth:'500px', marginBottom:'38px' }}>
          {t('heroSub')}
        </p>
        <div className="fg-h4 fg-cta-btns" style={{ display:'flex', alignItems:'center', gap:'18px', flexWrap:'wrap' }}>
          <button className="fg-btn-gold" onClick={() => contact('whatsapp')} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:darkGrey, background:gold, padding:'16px 40px', border:'none', cursor:'pointer' }}>
            {t('bookNow')}
          </button>
          <button className="fg-btn-outline" onClick={() => setShowWeChatModal(true)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'#fff', padding:'15px 30px', border:'1px solid rgba(255,255,255,.3)', background:'transparent', cursor:'pointer' }}>
            WeChat QR
          </button>
        </div>
        {/* Contact icons row */}
        <div className="fg-h5" style={{ display:'flex', alignItems:'center', gap:'60px', marginTop:'20px' }}>
          <span style={{ fontSize:'18px', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,.6)', fontWeight:600, textShadow:'0 0 10px rgba(255,255,255,0.3)' }}>Connect:</span>
          {[
            { p:'whatsapp', label:'WhatsApp', color:'#25D366' }, 
            { p:'telegram', label:'Telegram', color:'#0088CC' },
            { p:'wechat',   label:'WeChat',   color:'#07C160' },
          ].map(({ p, label, color }) => (
            <div key={p} onClick={() => contact(p)} style={{ 
              display:'flex', 
              alignItems:'center', 
              gap:'12px', 
              cursor:'pointer', 
              padding:'12px 24px', 
              borderRadius:'35px', 
              border:`2px solid ${color}`, 
              background:'transparent',
              transition:'all 0.4s ease',
              animation: `neonPulse${p} 2s ease-in-out infinite`,
              boxShadow: `0 0 15px ${color}40, inset 0 0 15px ${color}20`,
              margin: '0 15px'
            }}
              onMouseEnter={e=>{
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${color}20`;
                el.style.transform = 'scale(1.05)';
                el.style.boxShadow = `0 0 25px ${color}60, inset 0 0 20px ${color}30, 0 0 35px ${color}40`;
              }}
              onMouseLeave={e=>{
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.transform = 'scale(1)';
                el.style.boxShadow = `0 0 15px ${color}40, inset 0 0 15px ${color}20`;
              }}>
              <div style={{ 
                width:'12px', 
                height:'12px', 
                borderRadius:'50%', 
                background:color,
                boxShadow: `0 0 10px ${color}`,
                animation: `neonGlow${p} 1.5s ease-in-out infinite alternate`
              }} />
              <span style={{ 
                fontSize:'16px', 
                fontWeight:600, 
                color:'rgba(255,255,255,.95)',
                textShadow: `0 0 8px ${color}`
              }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ paddingBottom:'40px' }}></div>
        
        {/* Neon animation styles */}
        <style>{`
          @keyframes neonPulsewhatsapp {
            0%, 100% { box-shadow: 0 0 15px #25D36640, inset 0 0 15px #25D36620; }
            50% { box-shadow: 0 0 25px #25D36660, inset 0 0 20px #25D36630, 0 0 35px #25D36640; }
          }
          @keyframes neonPulsetelegram {
            0%, 100% { box-shadow: 0 0 15px #0088CC40, inset 0 0 15px #0088CC20; }
            50% { box-shadow: 0 0 25px #0088CC60, inset 0 0 20px #0088CC30, 0 0 35px #0088CC40; }
          }
          @keyframes neonPulsewechat {
            0%, 100% { box-shadow: 0 0 15px #07C16040, inset 0 0 15px #07C16020; }
            50% { box-shadow: 0 0 25px #07C16060, inset 0 0 20px #07C16030, 0 0 35px #07C16040; }
          }
          @keyframes neonGlowwhatsapp {
            0% { box-shadow: 0 0 10px #25D366; }
            100% { box-shadow: 0 0 20px #25D366, 0 0 30px #25D36680; }
          }
          @keyframes neonGlowtelegram {
            0% { box-shadow: 0 0 10px #0088CC; }
            100% { box-shadow: 0 0 20px #0088CC, 0 0 30px #0088CC80; }
          }
          @keyframes neonGlowwechat {
            0% { box-shadow: 0 0 10px #07C160; }
            100% { box-shadow: 0 0 20px #07C160, 0 0 30px #07C16080; }
          }
          
          /* Mobile-specific button spacing */
          @media (max-width: 768px) {
            .fg-h5 > div[style*="margin"] {
              margin: 0 30px !important;
            }
            .fg-h5 {
              flex-wrap: wrap !important;
              justify-content: center !important;
            }
            /* Ensure Guangzhou, China text is visible on mobile */
            .fg-hero-content {
              padding-top: 120px !important;
            }
            .fg-h1 {
              margin-bottom: 10px !important;
            }
          }
          @media (max-width: 480px) {
            .fg-h5 > div[style*="margin"] {
              margin: 10px 20px !important;
            }
            .fg-h5 {
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 40px !important;
            }
            /* Ensure Guangzhou, China text is fully visible on small mobile */
            .fg-hero-content {
              padding-top: 100px !important;
            }
            .fg-h1 {
              margin-bottom: 12px !important;
            }
          }
          @media (max-width: 380px) {
            .fg-h5 > div[style*="margin"] {
              margin: 15px 15px !important;
            }
            .fg-h5 {
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 30px !important;
            }
            /* Ensure Guangzhou, China text is fully visible on very small mobile */
            .fg-hero-content {
              padding-top: 90px !important;
            }
            .fg-h1 {
              margin-bottom: 8px !important;
            }
          }
        `}</style>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:'28px', right:'5%', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', opacity:.6 }}>
        <div style={{ width:'1px', height:'44px', background:`linear-gradient(to bottom,${gold},transparent)`, animation:'fgScrollPulse 2s ease-in-out infinite' }} />
        <span style={{ fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,.5)', writingMode:'vertical-rl' }}>Scroll</span>
      </div>
    </header>

    {/* ══════════════ MARQUEE ══════════════ */}
    <div style={{ background:darkGrey, padding:'13px 0', overflow:'hidden', borderTop:`1px solid rgba(184,151,106,.18)`, borderBottom:`1px solid rgba(184,151,106,.18)` }}>
      <div style={{ display:'flex', animation:'fgMarquee 30s linear infinite', whiteSpace:'nowrap' }}>
        {Array.from({ length: 4 }).flatMap((repIndex) =>
          [t('extendVisa'), t('rentApartment'), t('rentHotels'), t('rentDriveCars'), t('stayInChina'), t('discoveries'), t('events'), t('marketPlaces'), t('toolkits'), t('usefulApps')].map((item, i) => (
            <span key={`${item}-${repIndex}-${i}`} style={{ display:'inline-flex', alignItems:'center', gap:'20px', fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,.4)', padding:'0 36px' }}>
              <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:gold, display:'inline-block', flexShrink:0 }} />
              {item}
            </span>
          ))
        )}
      </div>
    </div>

    {/* ══════════════ STATS ══════════════ */}
    <div style={{ background:darkGreyMid, borderBottom:`1px solid rgba(184,151,106,.12)` }}>
      <div className="fg-stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', maxWidth:'1400px', margin:'0 auto' }}>
        {[
          { n:'8,000+', l:'Clients Served' }, { n:'12', l:'Languages Spoken' },
          { n:'24/7', l:'Arrival Support' }, { n:'98%', l:'Satisfaction Rate' }
        ].map((s,i) => (
          <div key={i} className={`fg-d${i}`} style={{ padding:'32px 24px', textAlign:'center', borderRight:`1px solid rgba(255,255,255,.05)` }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'34px', fontWeight:700, color:gold, lineHeight:1, marginBottom:'6px' }}>{s.n}</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,.38)' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* ══════════════ DISCOVERIES ══════════════ */}
    <section id="discoveries" style={{ padding:'90px 5%', background:cream }}>
      <div className="" style={{ marginBottom:'56px' }}>
        <div style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:gold, display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
          <span style={{ width:'26px', height:'1px', background:gold, display:'inline-block' }} />
          {t('destinations')}
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(30px,4vw,50px)', fontWeight:900, color:darkGrey, lineHeight:1.1 }}>{t('topDiscoveries')}</h2>
        <p style={{ fontSize:'15px', color:'#7A7570', maxWidth:'480px', lineHeight:1.75, marginTop:'12px' }}>{t('exploreSub')}</p>
      </div>

      <div className="fg-disc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px' }}>
        {DISCOVERIES.map((d, i) => (
          <div key={d.id} className="fg-disc" onClick={() => window.location.href = d.link} style={{ position:'relative', overflow:'hidden', cursor:'pointer', background:darkGrey, aspectRatio: i===0 ? '16/9' : '4/3', gridColumn: i===0 ? '1/3' : 'auto' }}>
            <img src={d.img} alt={d.titleKey} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,27,42,.95) 0%,transparent 55%)' }}>
              <div className="fg-disc-pb" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 24px 26px' }}>
                <div className="fg-disc-tag" style={{ fontSize:'9px', letterSpacing:'2.5px', textTransform:'uppercase', color:gold, marginBottom:'7px' }}>{d.tag}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(14px,1.8vw,20px)', fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:'10px' }}>{d.titleKey}</h3>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,.55)', lineHeight:1.6, marginBottom:'12px', display: i===0 ? 'block' : 'none' }}>{d.descKey}</p>
                <div className="fg-disc-arrow" style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'flex', alignItems:'center', gap:'8px' }}>
                  {t('viewDetails')} <span>→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop:'48px' }}>
        <button className="fg-btn-outline" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:darkGrey, padding:'14px 36px', border:`1px solid ${darkGrey}`, background:'transparent', cursor:'pointer' }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=darkGrey;(e.currentTarget as HTMLElement).style.color='#fff'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';(e.currentTarget as HTMLElement).style.color=darkGrey}}>
          {t('exploreMore')} →
        </button>
      </div>
    </section>

    {/* ══════════════ SERVICES ══════════════ */}
    <section id="services" style={{ background:darkGrey }}>
      <div style={{ padding:'90px 5%', maxWidth:'1400px', margin:'0 auto' }}>
        <div className="" style={{ marginBottom:'56px' }}>
          <div style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:gold, display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <span style={{ width:'26px', height:'1px', background:gold, display:'inline-block' }} />
            {t('services')}
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(30px,4vw,50px)', fontWeight:900, color:'#fff', lineHeight:1.1 }}>Concierge Services</h2>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,.4)', maxWidth:'480px', lineHeight:1.75, marginTop:'12px' }}>Everything a foreigner needs to thrive in China — under one roof.</p>
        </div>
        <div className="fg-svc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.05)' }}>
          {[
            { num:'01', name:t('extendVisa'),      desc:'Full-service visa support — documents, submission, and follow-up handled for you.' },
            { num:'02', name:t('rentApartment'),   desc:'Verified listings, bilingual contracts, and landlord liaisons in every major district.' },
            { num:'03', name:t('rentHotels'),      desc:'Foreigner-friendly hotels with verified check-in procedures and priority rates.' },
            { num:'04', name:t('rentDriveCars'),   desc:'Licensed bilingual drivers and self-drive rentals with full support documentation.' },
            { num:'05', name:t('cantonFair'),      desc:'Complete Canton Fair assistance: airport pickup, hotel booking, daily transport, and translation services.' },
            { num:'06', name:t('stayInChina'),     desc:'Long-term stay packages including SIM cards, bank setup, and neighbourhood guides.' },
            { num:'07', name:'Business Support',   desc:'Translation, factory visits, and sourcing trips across the Pearl River Delta.' },
          ].map(s => (
            <div key={s.num} className="fg-svc" style={{ padding:'38px 32px', background:darkGrey, position:'relative', overflow:'hidden', cursor:'pointer' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'11px', letterSpacing:'2px', color:'rgba(255,255,255,.18)', marginBottom:'10px' }}>{s.num}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:700, color:'#fff', marginBottom:'10px' }}>{s.name}</div>
              <div style={{ fontSize:'13px', lineHeight:1.7, color:'rgba(255,255,255,.42)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════ STORIES ══════════════ */}
    <section id="stories" className="fg-stories-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'600px' }}>
      {/* Image panel */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        <img
          src={STORIES[activeStory].img}
          alt={STORIES[activeStory].name}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'opacity .5s ease' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,27,42,.7) 0%,transparent 50%)' }} />
        <div style={{ position:'absolute', bottom:'28px', left:'28px', right:'28px' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', fontStyle:'italic', color:'#fff', lineHeight:1.4, marginBottom:'10px' }}>{STORIES[activeStory].quote}</div>
          <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:gold }}>{STORIES[activeStory].name} — {STORIES[activeStory].origin}</div>
        </div>
      </div>
      {/* List panel */}
      <div style={{ background:cream, padding:'72px 6% 72px 5%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div className="">
          <div style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:gold, display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <span style={{ width:'26px', height:'1px', background:gold, display:'inline-block' }} />
            {t('clientStories')}
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,3.5vw,44px)', fontWeight:900, color:darkGrey, marginBottom:'36px' }}>{t('storiesSub')}</h2>
          {STORIES.map((s, i) => (
            <div key={i} className={`fg-story-item${activeStory===i?' fg-active':''}`}
              onClick={() => setActiveStory(i)}
              style={{ padding:'18px 0 18px 0', borderBottom:`1px solid ${creamDk}`, borderLeft: activeStory===i ? `3px solid ${gold}` : '3px solid transparent', paddingLeft:'14px', marginLeft:'-14px', transition:'all .25s' }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'16px', fontStyle:'italic', color:darkGrey, lineHeight:1.5, marginBottom:'6px' }}>{s.quote}</p>
              <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#7A7570', display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ width:'18px', height:'1px', background:gold, display:'inline-block' }} />
                {s.name} — {s.origin}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════ WHY US ══════════════ */}
    <section id="about" style={{ padding:'90px 5%', background:creamDk }}>
      <div className="" style={{ marginBottom:'56px' }}>
        <div style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:gold, display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
          <span style={{ width:'26px', height:'1px', background:gold, display:'inline-block' }} />
          Our Difference
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(30px,4vw,50px)', fontWeight:900, color:darkGrey }}>{t('whyChooseUs')}</h2>
      </div>
      <div className="fg-why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'2px' }}>
        {[
          { icon:'✦', t:t('w1t'), d:t('w1d') },
          { icon:'◈', t:t('w2t'), d:t('w2d') },
          { icon:'◉', t:t('w3t'), d:t('w3d') },
          { icon:'◇', t:t('w4t'), d:t('w4d') },
        ].map((w,i) => (
          <div key={i} className={`fg-why fg-reveal fg-d${i}`} style={{ 
          background:cream, 
          padding:'42px 32px', 
          position:'relative', 
          overflow:'hidden',
          border:`1px solid ${creamDk}`,
          borderRadius:'8px',
          minHeight:'280px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between'
        }}>
          <div>
            <div style={{ width:'56px', height:'56px', borderRadius:'12px', border:`2px solid ${gold}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'24px', fontSize:'24px', background:`linear-gradient(135deg, ${gold}20, ${gold}10)` }}>
              {w.icon}
            </div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:700, color:darkGrey, marginBottom:'14px', lineHeight:1.3 }}>{w.t}</div>
            <div style={{ fontSize:'14px', lineHeight:1.75, color:'#7A7570' }}>{w.d}</div>
          </div>
          <div style={{ position:'absolute', bottom:'16px', right:'16px', fontFamily:"'Playfair Display',serif", fontSize:'48px', fontWeight:900, color:`${gold}15`, lineHeight:1, userSelect:'none', pointerEvents:'none' }}>0{i+1}</div>
        </div>
        ))}
      </div>
    </section>

    {/* ══════════════ CTA BOOK NOW ══════════════ */}
    <section id="contact" ref={footerBookRef as React.RefObject<HTMLElement>} style={{ padding:'90px 5%', background:darkGrey, textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-80px', left:'50%', transform:'translateX(-50%)', width:'500px', height:'500px', borderRadius:'50%', background:`radial-gradient(circle,rgba(200,39,58,.07) 0%,transparent 70%)`, pointerEvents:'none' }} />
      <h2 className="" style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(34px,5vw,62px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:'18px', position:'relative' }}>
        {t('readyToExplore').split(' ').slice(0,3).join(' ')}<br />
        <em style={{ color:redLight, fontStyle:'italic' }}>{t('readyToExplore').split(' ').slice(3).join(' ')}</em>
      </h2>
      <p className="" style={{ fontSize:'15px', color:'rgba(255,255,255,.45)', maxWidth:'460px', margin:'0 auto 38px', lineHeight:1.75, position:'relative' }}>{t('ctaSub')}</p>
      <div className="fg-cta-btns" style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap', position:'relative' }}>
        <button className="fg-btn-gold" onClick={() => contact('whatsapp')} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:darkGrey, background:gold, padding:'16px 38px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={darkGrey}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
        <button style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#fff', padding:'15px 32px', border:`1px solid rgba(255,255,255,.25)`, background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', transition:'all .3s' }}
          onClick={() => contact('telegram')}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=gold;(e.currentTarget as HTMLElement).style.color=gold}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.25)';(e.currentTarget as HTMLElement).style.color='#fff'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Telegram
        </button>
        <button className="fg-btn-gold" onClick={() => setShowWeChatModal(true)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:darkGrey, background:gold, padding:'16px 32px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={darkGrey}><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c-.276-.93-.418-1.907-.418-2.906 0-3.91 3.507-7.077 7.832-7.077.3 0 .598.016.892.046C15.968 4.195 12.583 2.188 8.691 2.188zm-2.73 3.485a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14zm5.46 0a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14zM24 14.714c0-3.455-3.256-6.26-7.277-6.26s-7.277 2.805-7.277 6.26 3.256 6.26 7.277 6.26c.9 0 1.761-.147 2.554-.409a.72.72 0 0 1 .594.08l1.576.924a.27.27 0 0 0 .138.045.245.245 0 0 0 .245-.245c0-.06-.024-.12-.04-.176l-.323-1.226a.49.49 0 0 1 .177-.551C23.023 18.454 24 16.674 24 14.714zm-9.85-1.07a.89.89 0 1 1 0-1.78.89.89 0 0 1 0 1.78zm5.145 0a.89.89 0 1 1 0-1.78.89.89 0 0 1 0 1.78z"/></svg>
          WeChat
        </button>
      </div>
    </section>

    {/* ══════════════ FOOTER ══════════════ */}
    <Suspense fallback={<div style={{ height: '400px' }}></div>}>
      <Footer lang={lang} />
    </Suspense>

    </div>

    <Suspense fallback={<div></div>}>
      <StickyContact 
        showStickyWidget={showStickyWidget}
        menuOpen={menuOpen}
        showWeChatModal={showWeChatModal}
        setShowWeChatModal={setShowWeChatModal}
        contact={contact}
      />
    </Suspense>

    {showWeChatModal && (
  <div onClick={() => setShowWeChatModal(false)} style={{ position:'fixed', inset:0, background:'rgba(8,15,24,.93)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
    <div onClick={e => e.stopPropagation()} style={{ background:cream, padding:'48px 44px', maxWidth:'460px', width:'92%', position:'relative', animation:'fgModalIn .4s ease', borderTop:`3px solid ${gold}` }}>
      <button onClick={() => setShowWeChatModal(false)} style={{ position:'absolute', top:'16px', right:'20px', fontSize:'22px', lineHeight:1, background:'none', border:'none', cursor:'pointer', color:'#7A7570', transition:'color .25s' }}
        onMouseEnter={e=>e.currentTarget.style.color=darkGrey} onMouseLeave={e=>e.currentTarget.style.color='#7A7570'}>×</button>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:darkGrey, marginBottom:'6px' }}>{t('wechatTitle')}</h2>
      <p style={{ fontSize:'13px', color:'#7A7570', marginBottom:'26px' }}>{t('wechatSub')}</p>
      {/* WeChat QR Code - FIXED PATH */}
      <div style={{ width:'220px', height:'220px', margin:'0 auto 26px', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${creamDk}`, borderRadius:'8px', overflow:'hidden' }}>
        <img 
          src="/foreignersgo_wechatqr.png"
          alt="WeChat QR Code"
          style={{
            width:'100%',
            height:'100%',
            objectFit:'cover',
          }}
        />
      </div>
      <ol style={{ listStyle:'none', marginBottom:'26px' }}>
        {[t('wStep1'),t('wStep2'),t('wStep3'),t('wStep4'),t('wStep5')].map((step,i) => (
          <li key={i} style={{ display:'flex', gap:'12px', padding:'9px 0', borderBottom:`1px solid ${creamDk}`, fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
            <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>{i+1}</span>
            {step}
          </li>
        ))}
      </ol>
      <button onClick={() => setShowWeChatModal(false)} style={{ width:'100%', padding:'15px', background:darkGrey, color:gold, fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .3s' }}
        onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background=darkGreyMid}
        onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=darkGrey}>
        {t('gotIt')}
      </button>
    </div>
  </div>
)}

    </>
  )
}