'use client'

import Link from 'next/link'

// ── TRANSLATION DATA ──────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  en: {
    home: 'Home', destinations: 'Destinations', services: 'Services',
    resources: 'Resources', aboutUs: 'About Us', contactUs: 'Contact Us',
    extendVisa: 'Extend Visa', rentApartment: 'Rent Apartment', rentHotels: 'Rent Hotels',
    rentDriveCars: 'Rent / Drive Cars', stayInChina: 'Stay in China', cantonFair: 'Canton Fair',
    quickLinks: 'Quick Links', servicesCol: 'Services', followUs: 'Follow Us',
    joinUs: 'Join Us', copyright: ' 2026 ForeignersGO',
    privacy: 'Privacy Policy', terms: 'Terms of Service',
    footerDesc: 'The official travel concierge for international arrivals and long-term expats in China.',
  },
  zh: {
    home: '首页', destinations: '目的地', services: '服务', resources: '资源',
    aboutUs: '关于我们', contactUs: '联系我们', discoveries: '发现', events: '活动',
    marketPlaces: '市场', extendVisa: '延长签证', rentApartment: '租公寓', rentHotels: '租酒店',
    rentDriveCars: '租车/驾车', stayInChina: '在中国住', cantonFair: '广交会',
    quickLinks: '快速链接', servicesCol: '服务', followUs: '关注我们',
    joinUs: '加入我们', copyright: ' 2026 ForeignersGO',
    privacy: '隐私政策', terms: '服务条款',
    footerDesc: '为国际抵港人士和长居外籍人士提供官方旅行礼宾服务。',
  },
  es: {
    home: 'Inicio', destinations: 'Destinos', services: 'Servicios', resources: 'Recursos',
    aboutUs: 'Sobre Nosotros', contactUs: 'Contáctenos', discoveries: 'Descubrimientos',
    events: 'Eventos', marketPlaces: 'Mercados', extendVisa: 'Extender Visa', rentApartment: 'Alquilar Apartamento', rentHotels: 'Alquilar Hoteles',
    rentDriveCars: 'Alquilar / Conducir Autos', stayInChina: 'Vivir en China', cantonFair: 'Feria de Cantón',
    quickLinks: 'Enlaces Rápidos', servicesCol: 'Servicios', followUs: 'Síguenos',
    joinUs: 'Únete', copyright: ' 2026 ForeignersGO',
    privacy: 'Política de Privacidad', terms: 'Términos de Servicio',
    footerDesc: 'El servicio oficial de conserjería para expatriados en China.',
  },
  fr: {
    home: 'Accueil', destinations: 'Destinations', services: 'Services', resources: 'Ressources',
    aboutUs: 'À Propos', contactUs: 'Contactez-nous', discoveries: 'Découverties',
    events: 'Événements', marketPlaces: 'Marchés', extendVisa: 'Extension de Visa',
    rentApartment: 'Louer Appartement', rentHotels: 'Louer Hôtels',
    rentDriveCars: 'Louer / Conduire Voiture', stayInChina: 'Vivre en Chine', cantonFair: 'Foire de Canton',
    quickLinks: 'Liens Rapides', servicesCol: 'Services', followUs: 'Suivez-nous',
    joinUs: 'Rejoignez-nous', copyright: ' 2026 ForeignersGO',
    privacy: 'Politique de Confidentialité', terms: 'Conditions d\'Utilisation',
    footerDesc: 'Le service officiel de conciergerie pour les expatriés en Chine.',
  },
  ru: {
    home: 'Главная', destinations: 'Направления', services: 'Услуги', resources: 'Ресурсы',
    aboutUs: 'О Нас', contactUs: 'Контакты', discoveries: 'Открытия', events: 'События',
    marketPlaces: 'Рынки', extendVisa: 'Продление Визы', rentApartment: 'Аренда Квартиры',
    rentHotels: 'Аренда Отелей', rentDriveCars: 'Аренда/Вождение Авто', stayInChina: 'Жизнь в Китае', cantonFair: 'Кантонская Ярмарка',
    quickLinks: 'Быстрые Ссылки', servicesCol: 'Услуги', followUs: 'Следите за Нами',
    joinUs: 'Присоединяйтесь', copyright: ' 2026 ForeignersGO',
    privacy: 'Политика Конфиденциальности', terms: 'Условия Использования',
    footerDesc: 'Официальный консьерж-сервис для экспатов в Китае.',
  },
  de: {
    home: 'Startseite', destinations: 'Reiseziele', services: 'Dienstleistungen', resources: 'Ressourcen',
    aboutUs: 'Über Uns', contactUs: 'Kontakt', discoveries: 'Entdeckungen', events: 'Veranstaltungen',
    marketPlaces: 'Märkte', extendVisa: 'Visum Verlängern', rentApartment: 'Wohnung Mieten',
    rentHotels: 'Hotel Buchen', rentDriveCars: 'Auto Mieten/Fahren', stayInChina: 'In China Leben', cantonFair: 'Kanton Messe',
    quickLinks: 'Schnelllinks', servicesCol: 'Dienstleistungen', followUs: 'Folgen Sie Uns',
    joinUs: 'Mitmachen', copyright: ' 2026 ForeignersGO',
    privacy: 'Datenschutz', terms: 'Nutzungsbedingungen',
    footerDesc: 'Der offizielle Concierge-Service für Expatriates in China.',
  },
  ar: {
    home: 'الرئيسية', destinations: 'الوجهات', services: 'الخدمات', resources: 'الموارد',
    aboutUs: 'من نحن', contactUs: 'اتصل بنا', discoveries: 'اكتشافات',
    events: 'فعاليات', marketPlaces: 'الأسواق', extendVisa: 'تمديد التأشيرة',
    rentApartment: 'استئجار شقة', rentHotels: 'حجز فنادق', rentDriveCars: 'استئجار/قيادة سيارة', stayInChina: 'الإقامة في الصين', cantonFair: 'معرض كانتون',
    quickLinks: 'روابط سريعة', servicesCol: 'الخدمات', followUs: 'تابعنا',
    joinUs: 'انضم', copyright: ' 2026 ForeignersGO',
    privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة',
    footerDesc: 'خدمة الكونسيرج الرسمية للمغتربين في الصين.',
  },
  am: {
    home: 'መነሻ', destinations: 'መዳረሻዎች', services: 'አገልግሎቶች', resources: 'ሀብቶች',
    aboutUs: 'ስለ እኛ', contactUs: 'ያግኙን', discoveries: 'ግኝቶች', events: 'ዝግጅቶች',
    marketPlaces: 'ገበያዎች', extendVisa: 'ቪዛ ዘርጋ', rentApartment: 'አፓርትማንት መከራ',
    rentHotels: 'ሆቴሎችን መከራ', rentDriveCars: 'ኪና መከራ/መንዳ', stayInChina: 'ቻይና ማለት', cantonFair: 'ካንተን ፌር',
    quickLinks: 'ፈጣጣዊ አገናኞች', servicesCol: 'አገልግሎቶች', followUs: 'ይከተሉን',
    joinUs: 'ይቀላቀሉን', copyright: ' 2026 ForeignersGO',
    privacy: 'የግላዊነት ፖሊሲ', terms: 'የአገልግሎት ውልዎች',
    footerDesc: 'ቻይና ውስጥ ለውጭ ተጓዛሚዎች የሚሰራ ይፋጊያ አገልግሎት',
  },
}

interface FooterProps {
  lang?: string
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k
  
  const goldLight = '#F1C40F'

  return (
    <>
      <style>{`
        .fg-flink {
          display: block;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 8px;
          transition: color 0.25s ease;
        }
        .fg-flink:hover {
          color: #fff;
        }
        @media (max-width: 768px) {
          footer {
            padding: 40px 5% 0 !important;
          }
          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: left !important;
            padding-bottom: 30px !important;
          }
          footer > div:nth-child(2) {
            padding: 25px 5% !important;
            margin-bottom: -10px !important;
          }
          footer > div:last-child {
            padding: 35px 5% !important;
            margin-top: -10px !important;
            font-size: 10px !important;
            gap: 16px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          footer {
            padding: 30px 5% 0 !important;
          }
          footer > div:first-child {
            gap: 25px !important;
            padding-bottom: 25px !important;
          }
          footer > div:nth-child(2) {
            padding: 20px 5% !important;
            margin-bottom: -15px !important;
          }
          footer > div:last-child {
            padding: 30px 5% !important;
            margin-top: -15px !important;
            font-size: 9px !important;
            gap: 12px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
        }
      `}</style>
      
      <footer style={{ background:'#080F18', padding:'70px 5% 0', color:'rgba(255,255,255,.4)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'60px', paddingBottom:'50px', borderBottom:'1px solid rgba(255,255,255,.06)', maxWidth:'1200px', margin:'0 auto' }}>
        {/* Col 1 */}
        <div>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', textDecoration:'none' }}>
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
          <p style={{ 
            fontSize: '13px', 
            lineHeight: '1.4', 
            color: 'rgba(255,255,255,0.6)', 
            maxWidth: '260px',
            marginTop: '0px'
          }}>
            {t('footerDesc')}
          </p>
        </div>
        {/* Col 2 — Quick links */}
        <div>
          <h4 style={{ fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'#fff', marginBottom:'18px', fontWeight:600 }}>{t('quickLinks')}</h4>
          {[['home','#hero'],['destinations','#discoveries'],['services','#services'],['resources','#resources'],['aboutUs','#about'],['contactUs','#contact']].map(([k,h]) => (
            <a key={k} href={h} style={{ fontSize:'13px', color:'rgba(255,255,255,.7)', textDecoration:'none', marginBottom:'8px', display:'block' }}>{t(k)}</a>
          ))}
        </div>
        {/* Col 3 — Services */}
        <div>
          <h4 style={{ fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'#fff', marginBottom:'18px', fontWeight:600 }}>{t('servicesCol')}</h4>
          {['extendVisa','rentApartment','rentHotels','rentDriveCars','cantonFair','stayInChina'].map(k => (
            <a key={k} href={k === 'cantonFair' ? '/canton-fair' : '#services'} style={{ fontSize:'13px', color:'rgba(255,255,255,.7)', textDecoration:'none', marginBottom:'8px', display:'block' }}>{t(k)}</a>
          ))}
        </div>
      </div>

      {/* Join Us + Socials */}
      <div style={{ textAlign:'center', padding:'44px 5%', borderBottom:'1px solid rgba(255,255,255,.06)', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:'20px' }}>{t('joinUs')}</div>
        <div style={{ display:'flex', justifyContent:'center', gap:'20px', flexWrap:'wrap', alignItems:'center' }}>
          {[
            { name:'TikTok', bg:'#010101', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg> },
            { name:'Instagram', bg:'#E1306C', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
            { name:'Facebook', bg:'#1877F2', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
            { name:'YouTube', bg:'#FF0000', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
          ].map(s => (
            <div key={s.name} title={s.name} style={{ width:'50px', height:'50px', borderRadius:'50%', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'transform .3s, opacity .3s', opacity:.85, minWidth:'50px', minHeight:'50px' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.15)';(e.currentTarget as HTMLElement).style.opacity='1'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)';(e.currentTarget as HTMLElement).style.opacity='.85'}}>
              {s.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div style={{ textAlign:'center', padding:'22px 5%', fontSize:'11px', color:'rgba(255,255,255,.22)', display:'flex', alignItems:'center', justifyContent:'center', gap:'24px', flexWrap:'wrap' }}>
        <span>{t('copyright')}</span>
        <span style={{ opacity:.5 }}>·</span>
        <span style={{ cursor:'pointer', transition:'color .25s' }} onMouseEnter={e=>e.currentTarget.style.color=goldLight} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.22)'}>{t('privacy')}</span>
        <span style={{ opacity:.5 }}>·</span>
        <span style={{ cursor:'pointer', transition:'color .25s' }} onMouseEnter={e=>e.currentTarget.style.color=goldLight} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.22)'}>{t('terms')}</span>
      </div>
    </footer>
    </>
  )
}
