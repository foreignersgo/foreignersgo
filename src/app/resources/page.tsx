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
    resources: 'Resources', heroTitle: 'Resources & Tools', heroSub: 'Essential tools, apps, and guides to make your life in China easier.',
    toolkits: 'Toolkits', usefulApps: 'Useful Apps', planYourTrip: 'Plan Your Trip',
    backToHome: 'Back to Home', download: 'Download', getStarted: 'Get Started',
    toolkitDesc: 'Comprehensive guides and checklists for every stage of your China journey.',
    appsDesc: 'Curated apps that foreigners find essential for daily life in China.',
    tripDesc: 'Step-by-step trip planning tools with insider tips and recommendations.',
    features: 'Features', category: 'Category', popular: 'Popular', new: 'New',
  },
  zh: {
    resources: '资源', heroTitle: '资源与工具', heroSub: '让您在中国生活更轻松的必备工具、应用和指南。',
    toolkits: '工具包', usefulApps: '实用应用', planYourTrip: '规划行程',
    backToHome: '返回首页', download: '下载', getStarted: '开始使用',
    toolkitDesc: '为您中国之旅每个阶段提供的综合指南和清单。',
    appsDesc: '外国人认为在中国日常生活中必不可少的应用程序。',
    tripDesc: '带有内幕贴士和推荐的分步旅行规划工具。',
    features: '特色', category: '类别', popular: '热门', new: '新',
  },
  es: {
    resources: 'Recursos', heroTitle: 'Recursos y Herramientas', heroSub: 'Herramientas esenciales, aplicaciones y guías para hacer tu vida en China más fácil.',
    toolkits: 'Herramientas', usefulApps: 'Aplicaciones Útiles', planYourTrip: 'Planifica tu Viaje',
    backToHome: 'Volver al Inicio', download: 'Descargar', getStarted: 'Comenzar',
    toolkitDesc: 'Guías completas y listas de verificación para cada etapa de tu viaje a China.',
    appsDesc: 'Aplicaciones curadas que los extranjeros encuentran esenciales para la vida diaria en China.',
    tripDesc: 'Herramientas de planificación de viajes paso a paso con consejos internos y recomendaciones.',
    features: 'Características', category: 'Categoría', popular: 'Popular', new: 'Nuevo',
  },
  fr: {
    resources: 'Ressources', heroTitle: 'Ressources et Outils', heroSub: 'Outils essentiels, applications et guides pour faciliter votre vie en Chine.',
    toolkits: 'Boîtes à Outils', usefulApps: 'Applications Utiles', planYourTrip: 'Planifier votre Voyage',
    backToHome: 'Retour à l\'Accueil', download: 'Télécharger', getStarted: 'Commencer',
    toolkitDesc: 'Guides complets et listes de vérification pour chaque étape de votre voyage en Chine.',
    appsDesc: 'Applications sélectionnées que les étrangers trouvent essentielles pour la vie quotidienne en Chine.',
    tripDesc: 'Outils de planification de voyage étape par étape avec conseils internes et recommandations.',
    features: 'Caractéristiques', category: 'Catégorie', popular: 'Populaire', new: 'Nouveau',
  },
  ru: {
    resources: 'Ресурсы', heroTitle: 'Ресурсы и Инструменты', heroSub: 'Основные инструменты, приложения и руководства для облегчения вашей жизни в Китае.',
    toolkits: 'Наборы инструментов', usefulApps: 'Полезные Приложения', planYourTrip: 'Планирование Поездки',
    backToHome: 'На главную', download: 'Скачать', getStarted: 'Начать',
    toolkitDesc: 'Комплексные руководства и чек-листы для каждого этапа вашего путешествия по Китаю.',
    appsDesc: 'Отобранные приложения, которые иностранцы считают необходимыми для повседневной жизни в Китае.',
    tripDesc: 'Инструменты для планирования поездок шаг за шагом с внутренними советами и рекомендациями.',
    features: 'Возможности', category: 'Категория', popular: 'Популярное', new: 'Новое',
  },
  de: {
    resources: 'Ressourcen', heroTitle: 'Ressourcen & Werkzeuge', heroSub: 'Wesentliche Tools, Apps und Leitfäden für ein einfacheres Leben in China.',
    toolkits: 'Werkzeugkästen', usefulApps: 'Nützliche Apps', planYourTrip: 'Reise Planen',
    backToHome: 'Zurück zur Startseite', download: 'Herunterladen', getStarted: 'Loslegen',
    toolkitDesc: 'Umfassende Leitfäden und Checklisten für jede Phase Ihrer China-Reise.',
    appsDesc: 'Kuratierte Apps, die Ausländer für das tägliche Leben in China als unerlässlich empfinden.',
    tripDesc: 'Schritt-für-Schritt-Reiseplanungswerkzeuge mit Insider-Tipps und Empfehlungen.',
    features: 'Merkmale', category: 'Kategorie', popular: 'Beliebt', new: 'Neu',
  },
  ar: {
    resources: 'الموارد', heroTitle: 'الموارد والأدوات', heroSub: 'أدوات أساسية وتطبيقات وإرشادات لتسهيل حياتك في الصين.',
    toolkits: 'أطوات', usefulApps: 'تطبيقات مفيدة', planYourTrip: 'تخطيط الرحلة',
    backToHome: 'العودة إلى الصفحة الرئيسية', download: 'تحميل', getStarted: 'ابدأ',
    toolkitDesc: 'أدلة شاملة وقوائم مراجعة لكل مرحلة من رحلتك في الصين.',
    appsDesc: 'تطبيقات مختارة يعتبرها الأجانب ضرورية للحياة اليومية في الصين.',
    tripDesc: 'أدوات تخطيط الرحلات خطوة بخطوة مع نصائح داخلية وتوصيات.',
    features: 'المميزات', category: 'الفئة', popular: 'شائع', new: 'جديد',
  },
  am: {
    resources: 'ሀርርችእት', heroTitle: 'ሀርርችእትእ ዘርማርች', heroSub: 'በጓዋንዞው የቻያልጥንዎችእት፣ የቻራልጥን ህይትንንዋንንም ህይትንንዋንም.',
    toolkits: 'የተርማርች ስብስች', usefulApps: 'ጠርማርች እስትች', planYourTrip: 'ጉዕዝን መመልተርን',
    backToHome: 'ወደ ወደ ገጽ', download: 'መዋወርም', getStarted: 'መጀመርር',
    toolkitDesc: 'ለላን የቻራልጥን ለላንእት፣ እና የቻራልጥን የቻራልጥንህይትንንዋንም.',
    appsDesc: 'የቻራልጥን አርማርች እስትች በጓዋንዞው የቻራልጥን ህይትንንዋንም እስትንንዋንም.',
    tripDesc: 'በጓዋንዞው የተርማርች መመልተርን ዘርማርች እና የቻራልጥን ህይትንንዋንም.',
    features: 'ባርንማርች', category: 'አይነ', popular: 'ተላልጥ', new: 'አዲስ',
  },
}

const RESOURCES = [
  {
    id: 1,
    category: 'toolkits',
    title: 'China Arrival Kit',
    description: 'Complete guide for your first 72 hours in China',
    icon: '🎯',
    color: '#E74C3C',
    features: ['Airport Pickup', 'SIM Setup', 'Bank Account', 'First Week Guide'],
    downloadUrl: '#',
    popular: true
  },
  {
    id: 2,
    category: 'toolkits',
    title: 'Apartment Hunting Guide',
    description: 'Step-by-step process for finding and securing housing',
    icon: '🏠',
    color: '#3498DB',
    features: ['Neighborhood Guide', 'Contract Templates', 'Inspection Checklist', 'Landlord Tips'],
    downloadUrl: '#',
    popular: true
  },
  {
    id: 3,
    category: 'usefulApps',
    title: 'WeChat for Foreigners',
    description: 'Complete guide to using WeChat for daily life',
    icon: '💬',
    color: '#07C160',
    features: ['Payment Setup', 'Mini Programs', 'Translation Tips', 'Social Features'],
    downloadUrl: '#',
    popular: true
  },
  {
    id: 4,
    category: 'usefulApps',
    title: 'Metro Navigation',
    description: 'Best apps for navigating Guangzhou public transport',
    icon: '🚇',
    color: '#F39C12',
    features: ['Offline Maps', 'English Interface', 'Route Planning', 'Real-time Updates'],
    downloadUrl: '#',
    isNew: true
  },
  {
    id: 5,
    category: 'planYourTrip',
    title: 'Guangzhou Trip Planner',
    description: 'Interactive tool for planning perfect itineraries',
    icon: '🗺',
    color: '#9B59B6',
    features: ['Day Planning', 'Budget Calculator', 'Weather Integration', 'Local Tips'],
    downloadUrl: '#',
    isNew: true
  },
  {
    id: 6,
    category: 'planYourTrip',
    title: 'Cultural Etiquette Guide',
    description: 'Essential cultural dos and don\'ts for foreigners',
    icon: '🎭',
    color: '#1ABC9C',
    features: ['Business Etiquette', 'Social Customs', 'Dining Rules', 'Gift Giving'],
    downloadUrl: '#',
    popular: true
  },
]

export default function ResourcesPage() {
  const [lang, setLang] = useState('en')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  // ── COLORS ──
  const darkGrey = '#2C3E50'
  const red = '#E74C3C'
  const gold = '#F39C12'
  const cream = '#FFFFFF'
  const creamDk = '#ECF0F1'

  const filteredResources = selectedCategory === 'all' 
    ? RESOURCES 
    : RESOURCES.filter(resource => resource.category === selectedCategory)

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
  }

  const handleContact = (platform: string) => {
    if (platform === 'whatsapp') {
      window.open('https://wa.me/8618728744992', '_blank')
    } else if (platform === 'telegram') {
      window.open('https://t.me/foreignersgo', '_blank')
    }
  }

  return (
    <>
      <HiddenSEO lang={lang} />
      <Navigation 
        lang={lang} 
        isScrolled={false}
        onLanguageChange={handleLanguageChange}
        onContact={handleContact}
      />

      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="fg-container" style={{ fontFamily:"'DM Sans',sans-serif", background:cream, color:darkGrey, minHeight:'100vh', width:'100%', maxWidth:'100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { }
        .resource-card { transition:transform .3s, box-shadow .3s; }
        .resource-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
        .categories { flex-wrap:wrap; gap:12px; }
        .category-btn { transition:all .3s; }
        .category-btn:hover { background:${darkGrey}; color:${cream}; }
        .category-btn.active { background:${darkGrey}; color:${cream}; }
        @media (max-width:768px) {
          .resource-grid { grid-template-columns:1fr !important; }
          .hero-content { padding:40px 5% !important; }
          .categories { flex-direction:column !important; gap:12px; }
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

      {/* ══════════════ CATEGORIES ══════════════ */}
      <section style={{ padding:'40px 5%', background:creamDk }}>
        <div className="categories" style={{ 
          display:'flex', 
          justifyContent:'center', 
          alignItems:'center', 
          flexWrap:'wrap', 
          gap:'16px',
          maxWidth:'800px',
          margin:'0 auto'
        }}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            style={{ 
              padding:'10px 20px', 
              border:`1px solid ${darkGrey}`, 
              borderRadius:'25px', 
              fontSize:'14px', 
              fontWeight:500,
              background:selectedCategory === 'all' ? darkGrey : 'transparent',
              color:selectedCategory === 'all' ? cream : darkGrey,
              cursor:'pointer'
            }}>
            {t('all')} {t('resources')}
          </button>
          {['toolkits', 'usefulApps', 'planYourTrip'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              style={{ 
                padding:'10px 20px', 
                border:`1px solid ${darkGrey}`, 
                borderRadius:'25px', 
                fontSize:'14px', 
                fontWeight:500,
                background:selectedCategory === cat ? darkGrey : 'transparent',
                color:selectedCategory === cat ? cream : darkGrey,
                cursor:'pointer'
              }}>
              {t(cat)}
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════ RESOURCES GRID ══════════════ */}
      <section style={{ padding:'60px 5%', background:cream }}>
        <div className="resources-grid" style={{ 
          display:'grid', 
          gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))', 
          gap:'30px', 
          maxWidth:'1200px', 
          margin:'0 auto' 
        }}>
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card" style={{ 
              background:cream, 
              borderRadius:'16px', 
              overflow:'hidden', 
              border:`1px solid ${creamDk}`,
              boxShadow:'0 4px 20px rgba(0,0,0,.08)',
              position:'relative'
            }}>
              {resource.popular && (
                <div style={{ 
                  position:'absolute', 
                  top:'16px', 
                  right:'16px', 
                  background:red, 
                  color:cream, 
                  padding:'4px 12px', 
                  borderRadius:'20px', 
                  fontSize:'11px', 
                  fontWeight:600,
                  zIndex:1
                }}>
                  {t('popular')}
                </div>
              )}
              {resource.isNew && (
                <div style={{ 
                  position:'absolute', 
                  top:'16px', 
                  right:'16px', 
                  background:gold, 
                  color:darkGrey, 
                  padding:'4px 12px', 
                  borderRadius:'20px', 
                  fontSize:'11px', 
                  fontWeight:600,
                  zIndex:1
                }}>
                  {t('new')}
                </div>
              )}
              
              <div style={{ 
                padding:'40px 30px', 
                background:`linear-gradient(135deg, ${resource.color}15 0%, transparent 100%)`,
                borderBottom:`1px solid ${creamDk}`,
                textAlign:'center'
              }}>
                <div style={{ 
                  fontSize:'48px', 
                  marginBottom:'16px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  padding:'16px',
                  background:`${resource.color}20`,
                  borderRadius:'50%',
                  width:'80px',
                  height:'80px',
                }}>
                  {resource.icon}
                </div>
                <h3 style={{ 
                  fontFamily:"'Playfair Display',serif", 
                  fontSize:'22px', 
                  fontWeight:700, 
                  color:darkGrey, 
                  marginBottom:'12px', 
                  lineHeight:1.3 
                }}>
                  {resource.title}
                </h3>
                <p style={{ 
                  fontSize:'14px', 
                  color:'rgba(44,62,80,.7)', 
                  lineHeight:1.6 
                }}>
                  {resource.description}
                </p>
              </div>
              
              <div style={{ padding:'30px' }}>
                <div style={{ marginBottom:'24px' }}>
                  <h4 style={{ 
                    fontSize:'12px', 
                    fontWeight:600, 
                    color:darkGrey, 
                    marginBottom:'12px', 
                    textTransform:'uppercase', 
                    letterSpacing:'1px' 
                  }}>
                    {t('features')}
                  </h4>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    {resource.features.map((feature, i) => (
                      <span key={i} style={{ 
                        display:'inline-block', 
                        padding:'6px 12px', 
                        background:`${darkGrey}08`, 
                        color:darkGrey, 
                        fontSize:'12px', 
                        borderRadius:'20px',
                        fontWeight:500,
                        border:`1px solid ${darkGrey}15`
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  display:'flex', 
                  justifyContent:'space-between', 
                  alignItems:'center', 
                  gap:'12px'
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{ 
                      fontSize:'12px', 
                      color:'rgba(44,62,80,.6)', 
                      marginBottom:'4px' 
                    }}>
                      {t('category')}
                    </div>
                    <div style={{ 
                      fontSize:'14px', 
                      fontWeight:600, 
                      color:resource.color,
                      textTransform:'capitalize'
                    }}>
                      {t(resource.category)}
                    </div>
                  </div>
                  <button 
                    onClick={() => { window.location.href = resource.downloadUrl }}
                    style={{ 
                      padding:'12px 24px', 
                      background:resource.color, 
                      color:cream, 
                      border:'none', 
                      borderRadius:'8px', 
                      fontSize:'14px', 
                      fontWeight:600, 
                      cursor:'pointer',
                      transition:'all .3s',
                      textDecoration:'none',
                      display:'flex',
                      alignItems:'center',
                      gap:'8px'
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                    {t('download')} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer lang={lang} />
      <StickyContact />
    </div>
    </>
  )
}
