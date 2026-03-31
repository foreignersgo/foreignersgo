'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import StickyContact from '../components/StickyContact'
import HiddenSEO from '../components/HiddenSEO'
import '../components/StickyContact.css'

// ── TRANSLATION DATA ──────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  en: {
    aboutUs: 'About Us', heroTitle: 'About ForeignersGO', heroSub: 'Your trusted partner for navigating life in China.',
    backToHome: 'Back to Home', ourMission: 'Our Mission', ourStory: 'Our Story',
    ourTeam: 'Our Team', contactUs: 'Contact Us',
    missionDesc: 'To make every foreigner\'s journey in China seamless, safe, and enriching through personalized concierge services and local expertise.',
    storyDesc: 'Founded in 2020 by a team of expatriates who understood the challenges foreigners face in China, ForeignersGO has become the premier service provider for international visitors and residents.',
    teamDesc: 'Our multicultural team speaks over 12 languages and combines local expertise with international standards.',
    stats: 'Our Impact', clients: 'Clients Served', languages: 'Languages Spoken', 
    satisfaction: 'Satisfaction Rate', years: 'Years of Experience',
    getInTouch: 'Get In Touch', email: 'Email', phone: 'Phone', address: 'Address',
    cantonFairServices: 'Canton Fair Services', cantonFairTitle: 'China Import & Export Fair',
    cantonFairAbout: 'The largest trade fair in China, connecting global buyers with Chinese manufacturers across all industries.',
    fairDates2026: '2026 Fair Dates', phase1: 'Phase 1', phase2: 'Phase 2', phase3: 'Phase 3',
    ourAssistance: 'Our Fair Assistance',
    cantonFairAssistance: 'We provide complete Canton Fair support: airport pickup, hotel booking, daily transport to the fair, translation services, and business consultation.',
    learnMoreAboutCantonFair: 'Learn More About Canton Fair',
  },
  zh: {
    aboutUs: '关于我们', heroTitle: '关于ForeignersGO', heroSub: '您在中国生活的值得信赖的伙伴。',
    backToHome: '返回首页', ourMission: '我们的使命', ourStory: '我们的故事',
    ourTeam: '我们的团队', contactUs: '联系我们',
    missionDesc: '通过个性化礼宾服务和本地专业知识，让每个外国人在中国的旅程无缝、安全和丰富。',
    storyDesc: 'ForeignersGO于2020年由一群了解外国人在中国面临挑战的侨民创立，已成为国际访客和居民的顶级服务提供商。',
    teamDesc: '我们的多元文化团队会说12种语言，将本地专业知识与国际标准相结合。',
    stats: '我们的影响', clients: '服务客户', languages: '语言',
    satisfaction: '满意度', years: '经验年限',
    getInTouch: '联系我们', email: '邮箱', phone: '电话', address: '地址',
    cantonFairServices: '广交会服务', cantonFairTitle: '中国进出口商品交易会',
    cantonFairAbout: '中国最大的贸易展览会，连接全球买家与各行业的中国制造商。',
    fairDates2026: '2026年展会日期', phase1: '第一期', phase2: '第二期', phase3: '第三期',
    ourAssistance: '我们的展会协助',
    cantonFairAssistance: '我们提供完整的广交会支持：机场接送、酒店预订、每日展会交通、翻译服务和商务咨询。',
    learnMoreAboutCantonFair: '了解更多关于广交会',
  },
  es: {
    aboutUs: 'Sobre Nosotros', heroTitle: 'Acerca de ForeignersGO', heroSub: 'Tu socio de confianza para navegar por la vida en China.',
    backToHome: 'Volver al Inicio', ourMission: 'Nuestra Misión', ourStory: 'Nuestra Historia',
    ourTeam: 'Nuestro Equipo', contactUs: 'Contáctanos',
    missionDesc: 'Hacer el viaje de cada extranjero en China sin problemas, seguro y enriquecedor a través de servicios de conserjería personalizados y experiencia local.',
    storyDesc: 'Fundada en 2020 por un equipo de expatriados que entendieron los desafíos que enfrentan los extranjeros en China, ForeignersGO se ha convertido en el proveedor de servicios líder para visitantes y residentes internacionales.',
    teamDesc: 'Nuestro equipo multicultural habla más de 12 idiomas y combina experiencia local con estándares internacionales.',
    stats: 'Nuestro Impacto', clients: 'Clientes Atendidos', languages: 'Idiomas Hablados',
    satisfaction: 'Tasa de Satisfacción', years: 'Años de Experiencia',
    getInTouch: 'Contáctanos', email: 'Correo', phone: 'Teléfono', address: 'Dirección',
    cantonFairServices: 'Servicios de la Feria de Cantón', cantonFairTitle: 'Feria de Importación y Exportación de China',
    cantonFairAbout: 'La feria comercial más grande de China, conectando compradores globales con fabricantes chinos de todas las industrias.',
    fairDates2026: 'Fechas de la Feria 2026', phase1: 'Fase 1', phase2: 'Fase 2', phase3: 'Fase 3',
    ourAssistance: 'Nuestra Asistencia en la Feria',
    cantonFairAssistance: 'Proporcionamos soporte completo para la Feria de Cantón: recolección del aeropuerto, reserva de hotel, transporte diario a la feria, servicios de traducción y consultoría de negocios.',
    learnMoreAboutCantonFair: 'Aprende Más Sobre la Feria de Cantón',
  },
  fr: {
    aboutUs: 'À Propos', heroTitle: 'À Propos de ForeignersGO', heroSub: 'Votre partenaire de confiance pour naviguer dans la vie en Chine.',
    backToHome: 'Retour à l\'Accueil', ourMission: 'Notre Mission', ourStory: 'Notre Histoire',
    ourTeam: 'Notre Équipe', contactUs: 'Contactez-nous',
    missionDesc: 'Rendre le voyage de chaque étranger en Chine fluide, sûr et enrichissant grâce à des services de conserjería personnalisés et une expertise locale.',
    storyDesc: 'Fondée en 2020 par une équipe d\'expatriés qui comprenaient les défis auxquels les étrangers sont confrontés en Chine, ForeignersGO est devenu le fournisseur de services leader pour les visiteurs et résidents internationaux.',
    teamDesc: 'Notre équipe multiculturelle parle plus de 12 langues et combine expertise locale avec normes internationales.',
    stats: 'Notre Impact', clients: 'Clients Servis', languages: 'Langues Parlées',
    satisfaction: 'Taux de Satisfaction', years: 'Années d\'Expérience',
    getInTouch: 'Contactez-nous', email: 'Email', phone: 'Téléphone', address: 'Adresse',
    cantonFairServices: 'Services Foire de Canton', cantonFairTitle: 'Foire d\'Importation et d\'Exportation de Chine',
    cantonFairAbout: 'La plus grande foire commerciale de Chine, connectant les acheteurs mondiaux avec les fabricants chinois de toutes les industries.',
    fairDates2026: 'Dates de la Foire 2026', phase1: 'Phase 1', phase2: 'Phase 2', phase3: 'Phase 3',
    ourAssistance: 'Notre Assistance à la Foire',
    cantonFairAssistance: 'Nous fournissons un soutien complet pour la Foire de Canton: prise en charge aéroport, réservation d\'hôtel, transport quotidien vers la foire, services de traduction et consultation commerciale.',
    learnMoreAboutCantonFair: 'En Savoir Plus sur la Foire de Canton',
  },
  ru: {
    aboutUs: 'О Нас', heroTitle: 'О ForeignersGO', heroSub: 'Ваш надежный партнер для навигации по жизни в Китае.',
    backToHome: 'Вернуться домой', ourMission: 'Наша Миссия', ourStory: 'Наша История',
    ourTeam: 'Наша Команда', contactUs: 'Связаться с нами',
    missionDesc: 'Сделать путешествие каждого иностранца в Китае гладким, безопасным и обогащающим через персонализированные консьерж-услуги и местную экспертизу.',
    storyDesc: 'Основана в 2020 году командой экспатриантов, которые понимали проблемы, с которыми сталкиваются иностранцы в Китае, ForeignersGO стала ведущим поставщиком услуг для международных посетителей и резидентов.',
    teamDesc: 'Наша мультикультурная команда говорит более чем на 12 языках и сочетает местную экспертизу с международными стандартами.',
    stats: 'Наше Влияние', clients: 'Обслужено Клиентов', languages: 'Говорят на Языках',
    satisfaction: 'Уровень Удовлетворенности', years: 'Лет Опыта',
    getInTouch: 'Связаться с нами', email: 'Email', phone: 'Телефон', address: 'Адрес',
    cantonFairServices: 'Услуги Кантонской Ярмарки', cantonFairTitle: 'Китайская Ярмарка Импорта и Экспорта',
    cantonFairAbout: 'Крупнейшая торговая ярмарка Китая, соединяющая глобальных покупателей с китайскими производителями во всех отраслях.',
    fairDates2026: 'Даты Ярмарки 2026', phase1: 'Фаза 1', phase2: 'Фаза 2', phase3: 'Фаза 3',
    ourAssistance: 'Наша Помощь на Ярмарке',
    cantonFairAssistance: 'Мы предоставляем полную поддержку для Кантонской Ярмарки: встреча в аэропорту, бронирование отеля, ежедневный транспорт к ярмарке, услуги перевода и бизнес-консультации.',
    learnMoreAboutCantonFair: 'Узнать Больше о Кантонской Ярмарке',
  },
  de: {
    aboutUs: 'Über Uns', heroTitle: 'Über ForeignersGO', heroSub: 'Ihr vertrauenswürdiger Partner für die Navigation durch das Leben in China.',
    backToHome: 'Zurück zur Startseite', ourMission: 'Unsere Mission', ourStory: 'Unsere Geschichte',
    ourTeam: 'Unser Team', contactUs: 'Kontaktieren Sie uns',
    missionDesc: 'Die Reise jedes Ausländers in China reibungslos, sicher und bereichernd gestalten durch personalisierte Concierge-Dienste und lokale Expertise.',
    storyDesc: 'Gegründet 2020 von einem Team von Expatriates, das die Herausforderungen von Ausländern in China verstand, wurde ForeignersGO zum führenden Dienstleister für internationale Besucher und Bewohner.',
    teamDesc: 'Unser multikulturelles Team spricht über 12 Sprachen und kombiniert lokale Expertise mit internationalen Standards.',
    stats: 'Unsere Wirkung', clients: 'Bediente Kunden', languages: 'Gesprochene Sprachen',
    satisfaction: 'Zufriedenheitsrate', years: 'Jahre Erfahrung',
    getInTouch: 'Kontaktieren Sie uns', email: 'Email', phone: 'Telefon', address: 'Adresse',
    cantonFairServices: 'Kanton Messe Dienstleistungen', cantonFairTitle: 'China Import-Export Messe',
    cantonFairAbout: 'Die größte Handelsmesse Chinas, die globale Käufer mit chinesischen Herstellern aus allen Branchen verbindet.',
    fairDates2026: 'Messedaten 2026', phase1: 'Phase 1', phase2: 'Phase 2', phase3: 'Phase 3',
    ourAssistance: 'Unsere Messeunterstützung',
    cantonFairAssistance: 'Wir bieten vollständige Unterstützung für die Kanton Messe: Flughafenabholung, Hotelreservierung, täglicher Transport zur Messe, Übersetzungsdienste und Geschäftsberatung.',
    learnMoreAboutCantonFair: 'Mehr über die Kanton Messe erfahren',
  },
  ar: {
    aboutUs: 'من نحن', heroTitle: 'حول ForeignersGO', heroSub: 'شريكك الموثوق للتنقل في الحياة في الصين.',
    backToHome: 'العودة إلى الرئيسية', ourMission: 'مهمتنا', ourStory: 'قصتنا',
    ourTeam: 'فريقنا', contactUs: 'اتصل بنا',
    missionDesc: 'جعل رحلة كل أجنبي في الصين سلسة وآمنة وغنية من خلال الخدمات الشخصية والخبرة المحلية.',
    storyDesc: 'تأسست في عام 2020 من قبل فريق من المغتربين الذين فهموا التحديات التي يواجهها الأجانب في الصين، أصبحت ForeignersGO مزود الخدمات الأول للزوار الدوليين والمقيمين.',
    teamDesc: 'فريقنا متعدد الثقافات يتحدث أكثر من 12 لغة ويجمع بين الخبرة المحلية والمعايير الدولية.',
    stats: 'تأثيرنا', clients: 'العملاء', languages: 'اللغات',
    satisfaction: 'معدل الرضا', years: 'سنوات الخبرة',
    getInTouch: 'تواصل معنا', email: 'البريد الإلكتروني', phone: 'الهاتف', address: 'العنوان',
    cantonFairServices: 'خدمات معرض كانتون', cantonFairTitle: 'معرض الصين للواردات والصادرات',
    cantonFairAbout: 'أكبر معرض تجاري في الصين، يربط المشترين العالميين بالصانعين الصينيين في جميع الصناعات.',
    fairDates2026: 'مواعيد المعرض 2026', phase1: 'المرحلة 1', phase2: 'المرحلة 2', phase3: 'المرحلة 3',
    ourAssistance: 'مساعدتنا في المعرض',
    cantonFairAssistance: 'نقدم دعمًا كاملاً لمعرض كانتون: الاستقبال من المطار، حجز الفنادق، النقل اليومي، وخدمات الترجمة.',
    learnMoreAboutCantonFair: 'اعرف المزيد عن معرض كانتون',
  },
  am: {
    aboutUs: 'ስለ እኛ', heroTitle: 'ስለ ForeignersGO', heroSub: 'ቻይና ውስጥ ለህይወት የሚሰራ ታማኛያዎን።',
    backToHome: 'ወደ መነሻ ተመለስ', ourMission: 'የእኛ ተልዕና', ourStory: 'የእኛ ታሪክ',
    ourTeam: 'የእኛ ቡድና', contactUs: 'ያግኙን',
    missionDesc: 'ለእዚብ የውጭ ተጓዛሚ በቻይና የሚያለፍ ጉዞ ሰላግጣማዊ፣ ደህናኛ፣ እና አስተማማሚያ ማድረግ በግልግጎቶች እና በአካባቢ እውታዎች።',
    storyDesc: 'በ2020 ዓ.ም. በቻይና ያሉት የውጭ ተጓዛሚዎች ቡድና በእኛ ተተማረ፣ የውጭ ተጓዛሚዎች የሚያጋጉት ችግዮችን በማርተማሪያው ቻይና የመጀመሻው የአገልግሎት ማለው ሆነ።',
    teamDesc: 'የእኛ ባለለው ባህልግ የሚናገር ቡድና 12 በላዛ ቋንቋችን ይናገራል እና የአካባቢ እውታን ከዓለም አፈር አያይው።',
    stats: 'የእኛ ተጽእና', clients: 'ደንቀማማማሚዎች', languages: 'ቋንቋች',
    satisfaction: 'ደንቀማማማሚነት መጠን', years: 'የልምዓት ዓመታት',
    getInTouch: 'ያግኙን', email: 'ኢሜል', phone: 'ስልክ', address: 'አድራሻ',
    cantonFairServices: 'የካንተን ፌር አገልግሎቶች', cantonFairTitle: 'የቻይና የማስገርእና የመላክ ንግድ',
    cantonFairAbout: 'በቻይና ትልቅ የኢንዱስትሪ ንግድ አየርማሽ ነው፣ የአለልዩ ዓለም ገዢችን ከቻይና አምላኮች ጋር ይገጣል።',
    fairDates2026: '2026 የፌር ቀንዎች', phase1: 'ደረጃ 1', phase2: 'ደረጃ 2', phase3: 'ደረጃ 3',
    ourAssistance: 'የእኛ የፌር ድጋፍ',
    cantonFairAssistance: 'ሙሉ የካንተን ፌር ድጋፍ እንደል: ከአየርማሽ መረጃ፣ ሆቴል ክፈለፍ፣ የዕለት አየርማሽ፣ እና ትርጉም።',
    learnMoreAboutCantonFair: 'ስለ ካንተን ፌር ተጨማማሪ ይምለክ',
  },
}

const STATS = [
  { number: '8,000+', label: 'clients', color: '#E74C3C' },
  { number: '12+', label: 'languages', color: '#3498DB' },
  { number: '98%', label: 'satisfaction', color: '#2ECC71' },
  { number: '4+', label: 'years', color: '#F39C12' },
]

const TEAM = [
  {
    name: 'Sona',
    role: 'Software Developer & CEO',
    bio: 'Based in China, leading innovative software solutions and digital transformation.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c2c2d8d8b2c?q=80&w=300',
    website: 'foreignersgo.com',
    linkedin: 'https://linkedin.com/in/sona'
  }
]

export default function AboutPage() {
  const [lang, setLang] = useState('en')
  const [showWeChatModal, setShowWeChatModal] = useState(false)
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
  }

  // WORKING CONTACT FUNCTION
  const handleContact = (method: string) => {
    const msg = encodeURIComponent('Hello! I would like to book a service with ForeignersGO. Please assist me with my travel needs to China.')
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/8619584750412?text=${msg}`, '_blank')
    } else if (method === 'telegram') {
      window.open(`https://t.me/+8619584750412?text=${msg}`, '_blank')
    } else if (method === 'wechat') {
      setShowWeChatModal(true)
    }
  }

  // ── COLORS ──
  const darkGrey = '#2C3E50'
  const red = '#E74C3C'
  const gold = '#F39C12'
  const goldLight = '#F1C40F'
  const cream = '#FFFFFF'
  const creamDk = '#ECF0F1'

  return (
    <>
      <HiddenSEO lang={lang} />
      <Navigation 
        lang={lang} 
        isScrolled={false}
        onLanguageChange={handleLanguageChange}
        onContact={handleContact}
      />
      
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="fg-container" style={{ fontFamily:"'DM Sans',sans-serif", background:cream, color:darkGrey, minHeight:'100vh', paddingTop:'100px', width:'100%', maxWidth:'100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { width:100%; }
        body { width:100%; max-width:100%; }
        .stat-card { transition:transform .3s, box-shadow .3s; }
        .stat-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
        .team-card { transition:transform .3s, box-shadow .3s; }
        .team-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
        @keyframes fgModalIn {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }
        @media (max-width:768px) {
          .hero-content { padding:40px 5% !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .team-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ 
        background:`linear-gradient(135deg, ${darkGrey} 0%, ${darkGrey}dd 100%)`,
        padding:'100px 5% 80px', 
        textAlign:'center',
        position:'relative'
      }}>
        <div className="hero-content" style={{ position:'relative', zIndex:2 }}>
          <h1 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(36px,6vw,64px)', 
            fontWeight:900, 
            color:cream, 
            lineHeight:1.1, 
            marginBottom:'20px' 
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{ 
            fontSize:'16px', 
            color:'rgba(255,255,255,.7)', 
            lineHeight:1.6, 
            maxWidth:'600px', 
            margin:'0 auto 40px' 
          }}>
            {t('heroSub')}
          </p>
          <div style={{ 
            display:'flex', 
            justifyContent:'center', 
            gap:'16px', 
            marginTop:'30px',
            flexWrap:'wrap'
          }}>
            <Link href="/" style={{ 
              display:'inline-flex', 
              alignItems:'center', 
              gap:'8px', 
              padding:'12px 24px', 
              background:'transparent', 
              border:`2px solid ${cream}`, 
              color:cream, 
              textDecoration:'none', 
              borderRadius:'8px', 
              fontSize:'14px', 
              fontWeight:600, 
              transition:'all .3s' 
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=cream;(e.currentTarget as HTMLElement).style.color=darkGrey}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';(e.currentTarget as HTMLElement).style.color=cream}}>
              <img 
                src="/foreignersgologo.png" 
                alt="ForeignersGO Logo"
                style={{ 
                  height:'72px', 
                  width:'auto', 
                  objectFit:'contain',
                  marginRight:'8px'
                }}
              />
              ← {t('backToHome')}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ MISSION ══════════════ */}
      <section style={{ padding:'80px 5%', background:creamDk }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(32px,4vw,48px)', 
            fontWeight:900, 
            color:darkGrey, 
            marginBottom:'20px',
            position:'relative',
            display:'inline-block'
          }}>
            {t('ourMission')}
            <div style={{ 
              position:'absolute', 
              bottom:'-8px', 
              left:'50%', 
              transform:'translateX(-50%)', 
              width:'60px', 
              height:'3px', 
              background:gold 
            }} />
          </h2>
          <p style={{ 
            fontSize:'18px', 
            lineHeight:1.7, 
            color:'rgba(44,62,80,.8)', 
            maxWidth:'700px', 
            margin:'0 auto' 
          }}>
            {t('missionDesc')}
          </p>
        </div>
      </section>

      {/* ══════════════ CANTON FAIR ══════════════ */}
      <section style={{ padding:'80px 5%', background:cream }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <h2 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(32px,4vw,48px)', 
            fontWeight:900, 
            color:darkGrey, 
            textAlign:'center', 
            marginBottom:'60px',
            position:'relative'
          }}>
            <span style={{ 
              position:'absolute', 
              bottom:'-10px', 
              left:'50%', 
              transform:'translateX(-50%)', 
              width:'60px', 
              height:'3px', 
              background:goldLight 
            }} />
            {t('cantonFairServices')}
          </h2>
          
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'40px', marginBottom:'60px' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'48px', marginBottom:'20px' }}>🏛️</div>
              <h3 style={{ 
                fontFamily:"'Playfair Display',serif", 
                fontSize:'24px', 
                fontWeight:700, 
                color:darkGrey, 
                marginBottom:'15px' 
              }}>
                {t('cantonFairTitle')}
              </h3>
              <p style={{ fontSize:'16px', lineHeight:1.6, color:darkGrey, opacity:0.8, marginBottom:'20px' }}>
                {t('cantonFairAbout')}
              </p>
            </div>
            
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'48px', marginBottom:'20px' }}>📅</div>
              <h3 style={{ 
                fontFamily:"'Playfair Display',serif", 
                fontSize:'24px', 
                fontWeight:700, 
                color:darkGrey, 
                marginBottom:'15px' 
              }}>
                {t('fairDates2026')}
              </h3>
              <div style={{ fontSize:'16px', lineHeight:1.6, color:darkGrey, opacity:0.8 }}>
                <div style={{ marginBottom:'10px' }}><strong>{t('phase1')}:</strong> April 15-19, 2026</div>
                <div style={{ marginBottom:'10px' }}><strong>{t('phase2')}:</strong> April 23-27, 2026</div>
                <div><strong>{t('phase3')}:</strong> May 1-5, 2026</div>
              </div>
            </div>
            
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'48px', marginBottom:'20px' }}>🎯</div>
              <h3 style={{ 
                fontFamily:"'Playfair Display',serif", 
                fontSize:'24px', 
                fontWeight:700, 
                color:darkGrey, 
                marginBottom:'15px' 
              }}>
                {t('ourAssistance')}
              </h3>
              <p style={{ fontSize:'16px', lineHeight:1.6, color:darkGrey, opacity:0.8, marginBottom:'20px' }}>
                {t('cantonFairAssistance')}
              </p>
            </div>
          </div>
          
          <div style={{ textAlign:'center', marginTop:'40px' }}>
            <Link href="/canton-fair" style={{ 
              display:'inline-flex', 
              alignItems:'center', 
              gap:'8px', 
              padding:'16px 32px', 
              background:goldLight, 
              color:darkGrey, 
              textDecoration:'none', 
              borderRadius:'8px', 
              fontSize:'16px', 
              fontWeight:700, 
              transition:'all .3s',
              boxShadow:'0 4px 16px rgba(243,156,18,0.3)'
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(243,156,18,0.4)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(243,156,18,0.3)'}}>
              {t('learnMoreAboutCantonFair')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section style={{ padding:'60px 5%', background:cream }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          <h2 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(28px,4vw,42px)', 
            fontWeight:900, 
            color:darkGrey, 
            marginBottom:'40px',
            textAlign:'center'
          }}>
            {t('stats')}
          </h2>
          <div className="stats-grid" style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', 
            gap:'30px' 
          }}>
            {STATS.map((stat, i) => (
              <div key={i} className="stat-card" style={{ 
                background:cream, 
                padding:'40px 30px', 
                borderRadius:'16px', 
                textAlign:'center', 
                border:`2px solid ${stat.color}20`,
                boxShadow:'0 4px 20px rgba(0,0,0,.08)'
              }}>
                <div style={{ 
                  fontSize:'48px', 
                  fontWeight:900, 
                  color:stat.color, 
                  marginBottom:'12px',
                  fontFamily:"'Playfair Display',serif"
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize:'14px', 
                  fontWeight:600, 
                  color:darkGrey,
                  textTransform:'uppercase',
                  letterSpacing:'1px'
                }}>
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM ══════════════ */}
      <section style={{ padding:'80px 5%', background:creamDk }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <h2 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(28px,4vw,42px)', 
            fontWeight:900, 
            color:darkGrey, 
            marginBottom:'40px',
            textAlign:'center'
          }}>
            {t('ourTeam')}
          </h2>
          <p style={{ 
            fontSize:'16px', 
            lineHeight:1.7, 
            color:'rgba(44,62,80,.8)', 
            maxWidth:'700px', 
            margin:'0 auto 60px', 
            textAlign:'center' 
          }}>
            {t('teamDesc')}
          </p>
          <div className="team-grid" style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', 
            gap:'40px' 
          }}>
            {TEAM.map((member, i) => (
              <div key={i} className="team-card" style={{ 
                background:cream, 
                borderRadius:'16px', 
                boxShadow:'0 4px 20px rgba(0,0,0,.08)'
              }}>
                <div style={{ height:'200px' }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ 
                      width:'100%', 
                      height:'100%', 
                      objectFit:'cover',
                      borderRadius:'16px 16px 0 0'
                    }}
                  />
                </div>
                <div style={{ padding:'30px' }}>
                  <h3 style={{ 
                    fontFamily:"'Playfair Display',serif", 
                    fontSize:'20px', 
                    fontWeight:700, 
                    color:darkGrey, 
                    marginBottom:'8px' 
                  }}>
                    {member.name}
                  </h3>
                  <div style={{ 
                    fontSize:'14px', 
                    color:gold, 
                    fontWeight:600, 
                    marginBottom:'12px' 
                  }}>
                    {member.role}
                  </div>
                  <p style={{ 
                    fontSize:'14px', 
                    color:'rgba(44,62,80,.7)', 
                    lineHeight:1.6,
                    marginBottom:'16px'
                  }}>
                    {member.bio}
                  </p>
                  <div style={{ 
                    fontSize:'13px', 
                    color:darkGrey, 
                    marginBottom:'8px',
                    fontWeight:500
                  }}>
                    🌐 {member.website}
                  </div>
                  <div style={{ 
                    display:'flex', 
                    alignItems:'center', 
                    gap:'8px',
                    marginTop:'12px'
                  }}>
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        display:'inline-flex', 
                        alignItems:'center', 
                        gap:'6px',
                        color:'#0077B5', 
                        textDecoration:'none',
                        fontSize:'14px',
                        fontWeight:600,
                        transition:'all .3s'
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section style={{ padding:'80px 5%', background:darkGrey, color:cream }}>
        <div style={{ maxWidth:'800px', margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ 
            fontFamily:"'Playfair Display',serif", 
            fontSize:'clamp(32px,4vw,48px)', 
            fontWeight:900, 
            marginBottom:'40px'
          }}>
            {t('getInTouch')}
          </h2>
          <div style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', 
            gap:'40px', 
            marginBottom:'40px' 
          }}>
            <div>
              <div style={{ 
                fontSize:'48px', 
                marginBottom:'16px', 
                color:gold 
              }}>
                📧
              </div>
              <h4 style={{ fontSize:'16px', fontWeight:600, marginBottom:'8px' }}>{t('email')}</h4>
              <p style={{ fontSize:'14px', opacity:0.8 }}>info@foreignersgo.com</p>
            </div>
            <div>
              <div style={{ 
                fontSize:'48px', 
                marginBottom:'16px', 
                color:gold 
              }}>
                📱
              </div>
              <h4 style={{ fontSize:'16px', fontWeight:600, marginBottom:'8px' }}>{t('phone')}</h4>
              <p style={{ fontSize:'14px', opacity:0.8 }}>+86 19 5847 5041</p>
            </div>
            <div>
              <div style={{ 
                fontSize:'48px', 
                marginBottom:'16px', 
                color:gold 
              }}>
                📍
              </div>
              <h4 style={{ fontSize:'16px', fontWeight:600, marginBottom:'8px' }}>{t('address')}</h4>
              <p style={{ fontSize:'14px', opacity:0.8 }}>Guangzhou, China</p>
            </div>
          </div>
          <Link 
            href="/contact"
            style={{ 
              display:'inline-block', 
              padding:'16px 32px', 
              background:gold, 
              color:darkGrey, 
              textDecoration:'none', 
              borderRadius:'8px', 
              fontSize:'16px', 
              fontWeight:600, 
              transition:'all .3s'
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
            {t('contactUs')} →
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
      <StickyContact onContact={handleContact} />
    </div>

    {/* WeChat Modal */}
    {showWeChatModal && (
      <div onClick={() => setShowWeChatModal(false)} style={{ 
        position:'fixed', 
        inset:0, 
        background:'rgba(8,15,24,.93)', 
        zIndex:2000, 
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center', 
        backdropFilter:'blur(8px)' 
      }}>
        <div onClick={e => e.stopPropagation()} style={{ 
          background:cream, 
          padding:'48px 44px', 
          maxWidth:'460px', 
          width:'92%', 
          position:'relative', 
          animation:'fgModalIn .4s ease', 
          borderTop:`3px solid ${gold}` 
        }}>
          <button onClick={() => setShowWeChatModal(false)} style={{ 
            position:'absolute', 
            top:'16px', 
            right:'20px', 
            fontSize:'22px', 
            lineHeight:1, 
            background:'none', 
            border:'none', 
            cursor:'pointer', 
            color:'#7A7570',
            transition:'color .25s'
          }}
            onMouseEnter={e=>e.currentTarget.style.color=darkGrey} 
            onMouseLeave={e=>e.currentTarget.style.color='#7A7570'}>
            ×
          </button>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:darkGrey, marginBottom:'6px' }}>
            Connect via WeChat
          </h2>
          <p style={{ fontSize:'13px', color:'#7A7570', marginBottom:'26px' }}>
            Scan the QR code to add us on WeChat
          </p>
          <div style={{ 
            width:'220px', 
            height:'220px', 
            margin:'0 auto 26px', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            border:`1px solid ${creamDk}`, 
            borderRadius:'8px', 
            overflow:'hidden' 
          }}>
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
            <li style={{ display:'flex', gap:'12px', padding:'9px 0', borderBottom:`1px solid ${creamDk}`, fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
              <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>1</span>
              Create your WeChat account at weixin.qq.com or download the app
            </li>
            <li style={{ display:'flex', gap:'12px', padding:'9px 0', borderBottom:`1px solid ${creamDk}`, fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
              <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>2</span>
              Open WeChat and log in to your account
            </li>
            <li style={{ display:'flex', gap:'12px', padding:'9px 0', borderBottom:`1px solid ${creamDk}`, fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
              <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>3</span>
              Tap the + icon in the top-right corner
            </li>
            <li style={{ display:'flex', gap:'12px', padding:'9px 0', borderBottom:`1px solid ${creamDk}`, fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
              <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>4</span>
              Select "Scan QR Code" and point at the code above
            </li>
            <li style={{ display:'flex', gap:'12px', padding:'9px 0', fontSize:'13px', color:darkGrey, alignItems:'flex-start' }}>
              <span style={{ width:'20px', height:'20px', flexShrink:0, background:darkGrey, color:gold, fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>5</span>
              Send "Hello, I need to book a service" to start
            </li>
          </ol>
          <button onClick={() => setShowWeChatModal(false)} style={{ 
            width:'100%', 
            padding:'15px', 
            background:darkGrey, 
            color:gold, 
            fontSize:'11px', 
            letterSpacing:'2px', 
            textTransform:'uppercase', 
            fontWeight:700, 
            border:'none', 
            cursor:'pointer', 
            fontFamily:"'DM Sans',sans-serif",
            transition:'background .3s'
          }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background=darkGrey}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=darkGrey}>
            Got It — Close
          </button>
        </div>
      </div>
    )}
    </>
  )
}