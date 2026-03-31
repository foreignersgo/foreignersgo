'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── TRANSLATION DATA ──────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  en: {
    home: 'Home', destinations: 'Destinations', services: 'Services',
    resources: 'Resources', aboutUs: 'About Us', contactUs: 'Contact Us',
    discoveries: 'Discoveries', events: 'Events', marketPlaces: 'Market Places',
    extendVisa: 'Extend Visa', rentApartment: 'Rent Apartment', rentHotels: 'Rent Hotels',
    rentDriveCars: 'Rent / Drive Cars', stayInChina: 'Stay in China', cantonFair: 'Canton Fair',
    toolkits: 'Toolkits', usefulApps: 'Useful Apps', planYourTrip: 'Plan Your Trip',
    loginRegister: 'Login / Register',
  },
  zh: {
    home: '首页', destinations: '目的地', services: '服务', resources: '资源',
    aboutUs: '关于我们', contactUs: '联系我们', discoveries: '发现', events: '活动',
    marketPlaces: '市场', extendVisa: '延长签证', rentApartment: '租公寓', rentHotels: '租酒店',
    rentDriveCars: '租车/驾车', stayInChina: '在中国住', cantonFair: '广交会',
    toolkits: '工具包', usefulApps: '实用应用', planYourTrip: '规划行程',
    loginRegister: '登录/注册',
  },
  es: {
    home: 'Inicio', destinations: 'Destinos', services: 'Servicios', resources: 'Recursos',
    aboutUs: 'Sobre Nosotros', contactUs: 'Contáctenos', discoveries: 'Descubrimientos',
    events: 'Eventos', marketPlaces: 'Mercados', extendVisa: 'Extender Visa', rentApartment: 'Alquilar Apartamento', rentHotels: 'Alquilar Hoteles',
    rentDriveCars: 'Alquilar / Conducir Autos', stayInChina: 'Vivir en China', cantonFair: 'Feria de Cantón',
    toolkits: 'Herramientas', usefulApps: 'Aplicaciones Útiles', planYourTrip: 'Planifica tu Viaje',
    loginRegister: 'Iniciar / Registrarse',
  },
  fr: {
    home: 'Accueil', destinations: 'Destinations', services: 'Services', resources: 'Ressources',
    aboutUs: 'À Propos', contactUs: 'Contactez-nous', discoveries: 'Découverties',
    events: 'Événements', marketPlaces: 'Marchés', extendVisa: 'Extension de Visa',
    rentApartment: 'Louer Appartement', rentHotels: 'Louer Hôtels',
    rentDriveCars: 'Louer / Conduire Voiture', stayInChina: 'Vivre en Chine', cantonFair: 'Foire de Canton',
    toolkits: 'Outils', usefulApps: 'Apps Utiles', planYourTrip: 'Planifier le Voyage',
    loginRegister: 'Connexion / Inscription',
  },
  ru: {
    home: 'Главная', destinations: 'Направления', services: 'Услуги', resources: 'Ресурсы',
    aboutUs: 'О Нас', contactUs: 'Контакты', discoveries: 'Открытия', events: 'События',
    marketPlaces: 'Рынки', extendVisa: 'Продление Визы', rentApartment: 'Аренда Квартиры',
    rentHotels: 'Аренда Отелей', rentDriveCars: 'Аренда/Вождение Авто', stayInChina: 'Жизнь в Китае', cantonFair: 'Кантонская Ярмарка',
    toolkits: 'Инструменты', usefulApps: 'Полезные Приложения', planYourTrip: 'Планирование Поездки',
    loginRegister: 'Войти / Зарегистрироваться',
  },
  de: {
    home: 'Startseite', destinations: 'Reiseziele', services: 'Dienstleistungen', resources: 'Ressourcen',
    aboutUs: 'Über Uns', contactUs: 'Kontakt', discoveries: 'Entdeckungen', events: 'Veranstaltungen',
    marketPlaces: 'Märkte', extendVisa: 'Visum Verlängern', rentApartment: 'Wohnung Mieten',
    rentHotels: 'Hotel Buchen', rentDriveCars: 'Auto Mieten/Fahren', stayInChina: 'In China Leben', cantonFair: 'Kanton Messe',
    toolkits: 'Werkzeugkästen', usefulApps: 'Nützliche Apps', planYourTrip: 'Reise Planen',
    loginRegister: 'Anmelden / Registrieren',
  },
  ar: {
    home: 'الرئيسية', destinations: 'الوجهات', services: 'الخدمات', resources: 'الموارد',
    aboutUs: 'من نحن', contactUs: 'اتصل بنا', discoveries: 'اكتشافات',
    events: 'فعاليات', marketPlaces: 'الأسواق', extendVisa: 'تمديد التأشيرة',
    rentApartment: 'استئجار شقة', rentHotels: 'حجز فنادق', rentDriveCars: 'استئجار/قيادة سيارة', stayInChina: 'الإقامة في الصين', cantonFair: 'معرض كانتون',
    toolkits: 'أدوات', usefulApps: 'تطبيقات مفيدة', planYourTrip: 'تخطيط رحلتك',
    loginRegister: 'تسجيل الدخول / إنشاء حساب',
  },
  am: {
    home: 'መነሻ', destinations: 'መዳረሻዎች', services: 'አገልግሎቶች', resources: 'ሀብቶች',
    aboutUs: 'ስለ እኛ', contactUs: 'ያግኙን', discoveries: 'ግኝቶች', events: 'ዝግጅቶች',
    marketPlaces: 'ገበያዎች', extendVisa: 'ቪዛ ዘርጋ', rentApartment: 'አፓርትማንት መከራ',
    rentHotels: 'ሆቴሎችን መከራ', rentDriveCars: 'ኪና መከራ/መንዳ', stayInChina: 'ቻይና ማለት', cantonFair: 'ካንተን ፌር',
    toolkits: 'መሳሪያዎች', usefulApps: 'ጠቃሚ መተግበሪያዎች', planYourTrip: 'ጉዞ ይቅርቱ',
    loginRegister: 'መግቢያ /መዝገቢያ',
  },
}

const LANGS = [
  { code: 'en', label: '🇬🇧 English' }, { code: 'zh', label: '🇨🇳 中文' },
  { code: 'es', label: '🇪🇸 Español' }, { code: 'fr', label: '🇫🇷 Français' },
  { code: 'ru', label: '🇷🇺 Русский' }, { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'ar', label: '🇸🇦 العربية' }, { code: 'am', label: '🇪🇹 አማርኛ' },
]

interface NavigationProps {
  lang?: string
  isScrolled?: boolean
  onLanguageChange?: (lang: string) => void
  onContact?: (method: string) => void
}

export default function Navigation({ 
  lang = 'en', 
  isScrolled = false, 
  onLanguageChange, 
  onContact 
}: NavigationProps) {
  const [langOpen, setLangOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [servOpen, setServOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  const handleLanguageChange = (newLang: string) => {
    setLangOpen(false)
    onLanguageChange?.(newLang)
  }

  const handleContact = (method: string) => {
    onContact?.(method)
  }

  return (
    <>
      <style>{`
        .fg-ddp { position: relative; }
        .fg-dd {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 8px 0;
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .fg-ddp:hover .fg-dd {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .fg-dd a {
          display: block;
          padding: 10px 16px;
          color: #2C3E50;
          text-decoration: none;
          font-size: 13px;
          transition: background-color 0.2s ease;
          font-weight: 500;
        }
        .fg-dd a:hover {
          background-color: rgba(231, 76, 60, 0.08);
          color: #E74C3C;
        }
        .fg-lang-dd {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 8px 0;
          min-width: 120px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .fg-lang-dd[style*="block"] {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .fg-lang-item {
          display: block;
          padding: 10px 16px;
          color: #2C3E50;
          text-decoration: none;
          font-size: 14px;
          transition: background-color 0.2s ease;
          font-weight: 500;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
        .fg-lang-item:hover {
          background-color: rgba(231, 76, 60, 0.08);
          color: #E74C3C;
        }
        .fg-lang-item.active {
          background-color: rgba(231, 76, 60, 0.12);
          color: #E74C3C;
        }
        .fg-hamburger:hover span {
          background: #E74C3C;
        }
        @media (max-width: 768px) {
          .fg-nav-links { display: none !important; }
          .fg-hamburger { display: flex !important; }
        }
      `}</style>
      
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
            style={{ display:'flex', alignItems:'center', gap:'6px', padding:'7px 12px', border:'1px solid rgba(44,62,80,.25)', borderRadius:'3px', cursor:'pointer', fontSize:'12px', color:'#2C3E50', userSelect:'none', transition:'border-color .25s', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='#E74C3C'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(44,62,80,.25)'}>
            {LANGS.find(l=>l.code===lang)?.label}&nbsp;
            <span style={{ fontSize:'9px', opacity:.6 }}>▾</span>
          </div>
          {langOpen && (
            <div className="fg-lang-dd" style={{ display: 'block' }}>
              {LANGS.map(l => (
                <div key={l.code} className={`fg-lang-item${lang===l.code?' active':''}`}
                  onClick={() => handleLanguageChange(l.code)}>
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
        {/* Book Now button in navigation */}
        <button onClick={() => handleContact('whatsapp')} style={{ 
          fontFamily:"'DM Sans',sans-serif", 
          fontSize:'11px', 
          fontWeight:700, 
          letterSpacing:'1.5px', 
          textTransform:'uppercase', 
          color:'#fff', 
          background:'#E74C3C', 
          padding:'8px 16px', 
          border:'none', 
          cursor:'pointer', 
          boxShadow:'0 2px 8px rgba(231,76,60,.3)', 
          lineHeight:1.2, 
          transition:'all .3s',
          borderRadius:'6px',
          whiteSpace:'nowrap'
        }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-1px)';(e.currentTarget as HTMLElement).style.boxShadow='0 4px 12px rgba(231,76,60,.4)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.boxShadow='0 2px 8px rgba(231,76,60,.3)'}}>
          Book Now
        </button>
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

    {/* Mobile Menu - Same as Home Page */}
    {menuOpen && (
      <div style={{
        position:'fixed',
        left:0,
        right:0,
        bottom:0,
        top: isScrolled ? 80 : 100,
        background:'#2C3E50',
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
          <Link href="/canton-fair" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', textDecoration:'none' }}>{t('cantonFair')}</Link>
          <Link href="/booking" onClick={() => { setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:700, color:'#fff', textDecoration:'none' }}>{t('bookNow')}</Link>
        </div>
        <div style={{ display:'flex', gap:'16px', marginTop:'28px', flexWrap:'wrap', justifyContent:'center' }}>
          {LANGS.map(l => (
            <button key={l.code} type="button" onClick={() => { onLanguageChange?.(l.code); setMenuOpen(false); setDestOpen(false); setServOpen(false); setResOpen(false) }} style={{ fontSize:'20px', cursor:'pointer', opacity: lang===l.code ? 1 : .5, background:'none', border:'none', padding:'4px' }}>
              {l.label.slice(0,2)}
            </button>
          ))}
        </div>
      </div>
    )}
    </>
  )
}
