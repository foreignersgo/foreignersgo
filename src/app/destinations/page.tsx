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
    destinations: 'Destinations', discoveries: 'Discoveries', events: 'Events', marketPlaces: 'Market Places',
    heroTitle: 'Explore Guangzhou', heroSub: 'Discover the best destinations, experiences, and hidden gems in Guangzhou.',
    allDestinations: 'All Destinations', viewDetails: 'View Details', backToHome: 'Back to Home',
    searchPlaceholder: 'Search destinations...', filterBy: 'Filter by category',
    allCategories: 'All Categories', cantonFair: 'Canton Fair', culturalSites: 'Cultural Sites',
    dining: 'Dining', shopping: 'Shopping', nightlife: 'Nightlife', nature: 'Nature',
    noResults: 'No destinations found', tryDifferent: 'Try different filters',
  },
  zh: {
    destinations: '目的地', discoveries: '发现', events: '活动', marketPlaces: '市场',
    heroTitle: '探索广州', heroSub: '发现广州最佳目的地、体验和隐藏的宝藏。',
    allDestinations: '所有目的地', viewDetails: '查看详情', backToHome: '返回首页',
    searchPlaceholder: '搜索目的地...', filterBy: '按类别筛选',
    allCategories: '所有类别', cantonFair: '广交会', culturalSites: '文化景点',
    dining: '餐饮', shopping: '购物', nightlife: '夜生活', nature: '自然',
    noResults: '未找到目的地', tryDifferent: '尝试不同的筛选条件',
  },
  es: {
    destinations: 'Destinos', discoveries: 'Descubrimientos', events: 'Eventos', marketPlaces: 'Mercados',
    heroTitle: 'Explora Guangzhou', heroSub: 'Descubre los mejores destinos, experiencias y joyas ocultas de Guangzhou.',
    allDestinations: 'Todos los Destinos', viewDetails: 'Ver Detalles', backToHome: 'Volver al Inicio',
    searchPlaceholder: 'Buscar destinos...', filterBy: 'Filtrar por categoría',
    allCategories: 'Todas las Categorías', cantonFair: 'Feria de Cantón', culturalSites: 'Sitios Culturales',
    dining: 'Comida', shopping: 'Compras', nightlife: 'Vida Nocturna', nature: 'Naturaleza',
    noResults: 'No se encontraron destinos', tryDifferent: 'Prueba diferentes filtros',
  },
  fr: {
    destinations: 'Destinations', discoveries: 'Découvertes', events: 'Événements', marketPlaces: 'Marchés',
    heroTitle: 'Explorer Guangzhou', heroSub: 'Découvrez les meilleures destinations, expériences et trésors cachés de Guangzhou.',
    allDestinations: 'Toutes les Destinations', viewDetails: 'Voir les Détails', backToHome: 'Retour à l\'Accueil',
    searchPlaceholder: 'Rechercher des destinations...', filterBy: 'Filtrer par catégorie',
    allCategories: 'Toutes les Catégories', cantonFair: 'Foire de Canton', culturalSites: 'Sites Culturels',
    dining: 'Restauration', shopping: 'Shopping', nightlife: 'Vie Nocturne', nature: 'Nature',
    noResults: 'Aucune destination trouvée', tryDifferent: 'Essayez des filtres différents',
  },
  ru: {
    destinations: 'Направления', discoveries: 'Открытия', events: 'События', marketPlaces: 'Рынки',
    heroTitle: 'Исследовать Гуанчжоу', heroSub: 'Откройте для себя лучшие направления, впечатления и скрытые жемчужины Гуанчжоу.',
    allDestinations: 'Все направления', viewDetails: 'Подробности', backToHome: 'На главную',
    searchPlaceholder: 'Поиск направлений...', filterBy: 'Фильтр по категории',
    allCategories: 'Все категории', cantonFair: 'Кантонская ярмарка', culturalSites: 'Культурные места',
    dining: 'Еда', shopping: 'Покупки', nightlife: 'Ночная жизнь', nature: 'Природа',
    noResults: 'Направления не найдены', tryDifferent: 'Попробуйте другие фильтры',
  },
  de: {
    destinations: 'Reiseziele', discoveries: 'Entdeckungen', events: 'Veranstaltungen', marketPlaces: 'Märkte',
    heroTitle: 'Guangzhou erkunden', heroSub: 'Entdecken Sie die besten Reiseziele, Erlebnisse und verborgenen Schätze von Guangzhou.',
    allDestinations: 'Alle Reiseziele', viewDetails: 'Details ansehen', backToHome: 'Zurück zur Startseite',
    searchPlaceholder: 'Reiseziele suchen...', filterBy: 'Nach Kategorie filtern',
    allCategories: 'Alle Kategorien', cantonFair: 'Kanton-Messe', culturalSites: 'Kulturelle Stätten',
    dining: 'Speisen', shopping: 'Einkaufen', nightlife: 'Nachtleben', nature: 'Natur',
    noResults: 'Keine Reiseziele gefunden', tryDifferent: 'Versuchen Sie andere Filter',
  },
  ar: {
    destinations: 'الوجهات', discoveries: 'الاكتشافات', events: 'الفاعليات', marketPlaces: 'الأسواق',
    heroTitle: 'استكشف غوانزو', heroSub: 'اكتشف أفضل الوجهات والتجارب والكنوز الدفينة في غوانزو.',
    allDestinations: 'كل الوجهات', viewDetails: 'عرض التفاصيل', backToHome: 'العودة إلى الصفحة الرئيسية',
    searchPlaceholder: 'البحث عن وجهات...', filterBy: 'تصفية حسب الفئة',
    allCategories: 'كل الفئات', cantonFair: 'معرض كانتون', culturalSites: 'المواقع الثقافية',
    dining: 'تناول', shopping: 'تسوق', nightlife: 'الحياة الليلية', nature: 'الطبيعة',
    noResults: 'لم يتم العثور على وجهات', tryDifferent: 'جرب فلاتر مختلفة',
  },
  am: {
    destinations: 'የውርትዎችዎች', discoveries: 'ማስማርቶች', events: 'ዝግታታት', marketPlaces: 'ገደቀትዎች',
    heroTitle: 'ጓዋንዞው መርምት', heroSub: 'በጓዋንዞው ውስያማርቶችን የጥቃዎች፣ የጥቃዎች፣ እና የማርቶች።',
    allDestinations: 'ሁሉት የውርትዎችዎች', viewDetails: 'ዝርላቶች መመመልከበ', backToHome: 'ወደ ወደ ገጽ',
    searchPlaceholder: 'የውርትዎችዎች መፈማት...', filterBy: 'በንግ መመፈለጫ',
    allCategories: 'ሁሉት አይነትዎች', cantonFair: 'ካንቶን ፈር', culturalSites: 'የባልታዎታ ቦክታ',
    dining: 'መመመገማት', shopping: 'መገቃት', nightlife: 'የማት ህይት', nature: 'ተፈራሪ',
    noResults: 'የውርትዎችዎች አልይተላል', tryDifferent: 'የተለያው ፈለጫ ይሞክ',
  },
}

const DESTINATIONS = [
  { 
    id: 1, 
    category: 'cantonFair',
    title: 'Canton Fair District', 
    description: 'The world\'s largest trade fair hub. Thousands of wholesale booths across textiles, electronics, and consumer goods.',
    image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=900',
    highlights: ['50,000+ Exhibitors', '175 Countries', '2 Million Visitors Annually']
  },
  { 
    id: 2, 
    category: 'culturalSites',
    title: 'Chen Clan Ancestral Hall', 
    description: 'A masterpiece of Qing dynasty folk architecture with breathtaking carved stonework and ceramic art.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=900',
    highlights: ['UNESCO Heritage Site', '300+ Years History', 'Traditional Crafts']
  },
  { 
    id: 3, 
    category: 'dining',
    title: 'Dim Sum Old Town Trail', 
    description: 'Authentic morning yum cha through Liwan\'s heritage teahouses. The best dim sum in southern China.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=900',
    highlights: ['100+ Teahouses', 'Traditional Recipes', 'Morning Culture']
  },
  { 
    id: 4, 
    category: 'shopping',
    title: 'Beijing Road Shopping', 
    description: 'Premier shopping district with luxury brands, local boutiques, and traditional markets.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd228d8?q=80&w=900',
    highlights: ['500+ Stores', 'Luxury Brands', 'Local Markets']
  },
  { 
    id: 5, 
    category: 'nature',
    title: 'Baiyun Mountain Park', 
    description: 'Escape the city at Guangzhou\'s beloved green lung — cable cars, temples, and panoramic views.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900',
    highlights: ['Cable Cars', 'Mountain Temples', 'City Views']
  },
  { 
    id: 6, 
    category: 'nightlife',
    title: 'Zhujiang New Town Night', 
    description: 'Neon-lit riverside promenades, rooftop bars, and the best night views over the Pearl River.',
    image: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?q=80&w=900',
    highlights: ['Riverside Bars', 'Night Markets', 'Live Music']
  },
  { 
    id: 7, 
    category: 'culturalSites',
    title: 'Sacred Heart Cathedral', 
    description: 'Gothic Revival cathedral and the seat of the Roman Catholic Archdiocese of Guangzhou.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900',
    highlights: ['130+ Years Old', 'Gothic Architecture', 'Historic Landmark']
  },
  { 
    id: 8, 
    category: 'dining',
    title: 'Shangxiajiu Food Street', 
    description: 'Famous street food destination offering authentic Cantonese cuisine and local delicacies.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877e5f94928?q=80&w=900',
    highlights: ['Street Food', 'Local Delicacies', 'Night Market']
  },
  { 
    id: 9, 
    category: 'shopping',
    title: 'Shangxiajiu Pedestrian Street', 
    description: 'Historic shopping street with traditional architecture, boutiques, and local crafts.',
    image: 'https://images.unsplash.com/photo-1542838131-44c9776b1e1f?q=80&w=900',
    highlights: ['Historic Street', 'Local Crafts', 'Architecture']
  },
]

export default function DestinationsPage() {
  const [lang, setLang] = useState('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  // ── COLORS ──
  const darkGrey = '#2C3E50'
  const red = '#E74C3C'
  const gold = '#F39C12'
  const cream = '#FFFFFF'
  const creamDk = '#ECF0F1'

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        .dest-card { transition:transform .3s, box-shadow .3s; }
        .dest-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
        .filter-btn { transition:all .3s; }
        .filter-btn:hover { background:${darkGrey}; color:${cream}; }
        .filter-btn.active { background:${darkGrey}; color:${cream}; }
        @media (max-width:768px) {
          .dest-grid { grid-template-columns:1fr !important; }
          .hero-content { padding:40px 5% !important; }
          .filters { flex-direction:column !important; gap:12px; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ 
        background:`linear-gradient(135deg, ${darkGrey} 0%, ${darkGrey}dd 100%)`,
        padding:'100px 5% 80px', 
        textAlign:'center',
        position:'relative'
      }}>
        <div style={{ position:'relative', zIndex:2 }}>
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
            <a href="/" style={{ 
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
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ FILTERS ══════════════ */}
      <section style={{ padding:'40px 5%', background:creamDk }}>
        <div className="filters" style={{ 
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          flexWrap:'wrap', 
          gap:'20px',
          maxWidth:'1200px',
          margin:'0 auto'
        }}>
          <div style={{ flex:1, minWidth:'250px' }}>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width:'100%', 
                padding:'12px 16px', 
                border:`1px solid ${darkGrey}30`, 
                borderRadius:'8px', 
                fontSize:'14px',
                outline:'none',
                transition:'border-color .3s'
              }}
              onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = darkGrey}
              onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = `${darkGrey}30`}
            />
          </div>
          
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              style={{ 
                padding:'8px 16px', 
                border:`1px solid ${darkGrey}`, 
                borderRadius:'20px', 
                fontSize:'12px', 
                fontWeight:500,
                background:selectedCategory === 'all' ? darkGrey : 'transparent',
                color:selectedCategory === 'all' ? cream : darkGrey,
                cursor:'pointer'
              }}>
              {t('allCategories')}
            </button>
            {['cantonFair', 'culturalSites', 'dining', 'shopping', 'nightlife', 'nature'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                style={{ 
                  padding:'8px 16px', 
                  border:`1px solid ${darkGrey}`, 
                  borderRadius:'20px', 
                  fontSize:'12px', 
                  fontWeight:500,
                  background:selectedCategory === cat ? darkGrey : 'transparent',
                  color:selectedCategory === cat ? cream : darkGrey,
                  cursor:'pointer'
                }}>
                {t(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DESTINATIONS GRID ══════════════ */}
      <section style={{ padding:'60px 5%', background:cream }}>
        {filteredDestinations.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontSize:'48px', marginBottom:'20px', opacity:0.3 }}>🔍</div>
            <h3 style={{ fontSize:'20px', color:darkGrey, marginBottom:'10px' }}>{t('noResults')}</h3>
            <p style={{ color:'rgba(44,62,80,.6)' }}>{t('tryDifferent')}</p>
          </div>
        ) : (
          <div className="dest-grid" style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))', 
            gap:'30px', 
            maxWidth:'1200px', 
            margin:'0 auto' 
          }}>
            {filteredDestinations.map(dest => (
              <div key={dest.id} className="dest-card" style={{ 
                background:cream, 
                borderRadius:'12px', 
                border:`1px solid ${creamDk}`,
                cursor:'pointer'
              }}>
                <div style={{ height:'200px' }}>
                  <img 
                    src={dest.image} 
                    alt={dest.title}
                    style={{ 
                      width:'100%', 
                      height:'100%', 
                      objectFit:'cover',
                      transition:'transform .5s'
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding:'24px' }}>
                  <div style={{ 
                    display:'inline-block', 
                    padding:'4px 12px', 
                    background:`${gold}20`, 
                    color:gold, 
                    fontSize:'11px', 
                    fontWeight:600, 
                    borderRadius:'20px', 
                    marginBottom:'16px',
                    textTransform:'uppercase',
                    letterSpacing:'0.5px'
                  }}>
                    {t(dest.category)}
                  </div>
                  <h3 style={{ 
                    fontFamily:"'Playfair Display',serif", 
                    fontSize:'20px', 
                    fontWeight:700, 
                    color:darkGrey, 
                    marginBottom:'12px', 
                    lineHeight:1.3 
                  }}>
                    {dest.title}
                  </h3>
                  <p style={{ 
                    fontSize:'14px', 
                    color:'rgba(44,62,80,.7)', 
                    lineHeight:1.6, 
                    marginBottom:'20px' 
                  }}>
                    {dest.description}
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'20px' }}>
                    {dest.highlights.map((highlight, i) => (
                      <span key={i} style={{ 
                        display:'inline-block', 
                        padding:'4px 8px', 
                        background:`${darkGrey}10`, 
                        color:darkGrey, 
                        fontSize:'11px', 
                        borderRadius:'4px',
                        fontWeight:500
                      }}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <button style={{ 
                    width:'100%', 
                    padding:'12px', 
                    background:darkGrey, 
                    color:cream, 
                    border:'none', 
                    borderRadius:'8px', 
                    fontSize:'14px', 
                    fontWeight:600, 
                    cursor:'pointer',
                    transition:'all .3s'
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = red}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = darkGrey}>
                    {t('viewDetails')} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer lang={lang} />
      <StickyContact />
    </div>
    </>
  )
}
