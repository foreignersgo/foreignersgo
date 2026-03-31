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
    services: 'Services', heroTitle: 'Our Services', heroSub: 'Everything a foreigner needs to thrive in China — under one roof.',
    extendVisa: 'Extend Visa', rentApartment: 'Rent Apartment', rentHotels: 'Rent Hotels',
    rentDriveCars: 'Rent / Drive Cars', stayInChina: 'Stay in China', businessSupport: 'Business Support',
    backToHome: 'Back to Home', bookNow: 'Book Now', learnMore: 'Learn More',
    visaDesc: 'Full-service visa support — documents, submission, and follow-up handled for you.',
    apartmentDesc: 'Verified listings, bilingual contracts, and landlord liaisons in every major district.',
    hotelsDesc: 'Foreigner-friendly hotels with verified check-in procedures and priority rates.',
    carsDesc: 'Licensed bilingual drivers and self-drive rentals with full support documentation.',
    stayDesc: 'Long-term stay packages including SIM cards, bank setup, and neighbourhood guides.',
    cantonFair: 'Canton Fair Services', cantonFairDesc: 'Complete Canton Fair assistance including airport pickup, accommodation, transport, and translation.',
    businessDesc: 'Professional business services including translation, factory visits, and meeting arrangements.',
    features: 'Features', contactUs: 'Contact Us',
  },
  zh: {
    services: '服务', heroTitle: '我们的服务', heroSub: '外国人在中国茁壮成长所需的一切——尽在同一屋檐下。',
    extendVisa: '延长签证', rentApartment: '租公寓', rentHotels: '租酒店',
    rentDriveCars: '租车/驾车', stayInChina: '在中国住', businessSupport: '商业支持',
    backToHome: '返回首页', bookNow: '立即预订', learnMore: '了解更多',
    visaDesc: '全方位签证支持——为您处理文件、提交和跟进。',
    apartmentDesc: '经过验证的房源、双语合同和每个主要区域的房东联络。',
    hotelsDesc: '对外国人友好的酒店，提供经过验证的入住程序和优先价格。',
    carsDesc: '持证双语司机和自驾租赁，提供全套支持文件。',
    stayDesc: '长期住宿套餐，包括SIM卡、银行设置和社区指南。',
    cantonFair: '广交会服务', cantonFairDesc: '完整的广交会协助，包括机场接送、住宿、交通和翻译。',
    businessDesc: '专业商务服务，包括翻译、工厂参观和会议安排。珠江三角洲的采购之旅。',
    features: '特色', contactUs: '联系我们',
  },
  es: {
    services: 'Servicios', heroTitle: 'Nuestros Servicios', heroSub: 'Todo lo que un extranjero necesita para prosperar en China — bajo un mismo techo.',
    extendVisa: 'Extender Visa', rentApartment: 'Alquilar Apartamento', rentHotels: 'Alquilar Hoteles',
    rentDriveCars: 'Alquilar / Conducir Autos', stayInChina: 'Vivir en China', businessSupport: 'Soporte Empresarial',
    backToHome: 'Volver al Inicio', bookNow: 'Reservar Ahora', learnMore: 'Aprender Más',
    visaDesc: 'Soporte completo de visa — documentos, presentación y seguimiento manejados para usted.',
    apartmentDesc: 'Listados verificados, contratos bilingües y enlaces con propietarios en cada distrito principal.',
    hotelsDesc: 'Hoteles amigables para extranjeros con procedimientos de check-in verificados y tarifas prioritarias.',
    carsDesc: 'Conductores bilingües con licencia y alquileres con autista con documentación de soporte completa.',
    stayDesc: 'Paquetes de estancia a largo plazo incluyendo tarjetas SIM, configuración bancaria y guías del barrio.',
    cantonFair: 'Servicios de la Feria de Cantón', cantonFairDesc: 'Asistencia completa para la Feria de Cantón incluyendo recolección del aeropuerto, alojamiento, transporte y traducción.',
    businessDesc: 'Servicios empresariales profesionales incluyendo traducción, visitas a fábricas y arreglos de reuniones.',
    features: 'Características', contactUs: 'Contáctenos',
  },
  fr: {
    services: 'Services', heroTitle: 'Nos Services', heroSub: 'Tout ce dont un étranger a besoin pour prospérer en Chine — sous un même toit.',
    extendVisa: 'Extension de Visa', rentApartment: 'Louer Appartement', rentHotels: 'Louer Hôtels',
    rentDriveCars: 'Louer / Conduire Voiture', stayInChina: 'Vivre en Chine', businessSupport: 'Support Commercial',
    backToHome: 'Retour à l\'Accueil', bookNow: 'Réserver Maintenant', learnMore: 'Apprendre Plus',
    visaDesc: 'Support complet de visa — documents, soumission et suivi gérés pour vous.',
    apartmentDesc: 'Annonces vérifiées, contrats bilingues et liaison avec propriétaires dans chaque quartier principal.',
    hotelsDesc: 'Hôtels conviviaux pour étrangers avec procédures d\'enregistrement vérifiées et tarifs prioritaires.',
    carsDesc: 'Chauffeurs bilingues avec licence et locations avec chauffeur avec documentation de support complète.',
    stayDesc: 'Forfaits de séjour à long terme incluant cartes SIM, configuration bancaire et guides de quartier.',
    cantonFair: 'Services Foire de Canton', cantonFairDesc: 'Assistance complète pour la Foire de Canton incluant prise en charge aéroport, hébergement, transport et traduction.',
    businessDesc: 'Services commerciaux professionnels incluant traduction, visites d\'usines et arrangements de réunions.',
    features: 'Caractéristiques', contactUs: 'Contactez-nous',
  },
  ru: {
    services: 'Услуги', heroTitle: 'Наши Услуги', heroSub: 'Все, что нужно иностранцу для процветания в Китае — под одной крышей.',
    extendVisa: 'Продление Визы', rentApartment: 'Аренда Квартиры', rentHotels: 'Аренда Отелей',
    rentDriveCars: 'Аренда/Вождение Авто', stayInChina: 'Жизнь в Китае', businessSupport: 'Бизнес Поддержка',
    backToHome: 'Вернуться домой', bookNow: 'Забронировать Сейчас', learnMore: 'Узнать Больше',
    visaDesc: 'Полная поддержка визы — документы, подача и сопровождение обрабатываются для вас.',
    apartmentDesc: 'Проверенные объявления, двуязычные контракты и связь с арендодателями в каждом основном районе.',
    hotelsDesc: 'Дружелюбные к иностранцам отели с проверенными процедурами регистрации и приоритетными тарифами.',
    carsDesc: 'Лицензированные двуязычные водители и аренда с водителем с полной поддержкой документов.',
    stayDesc: 'Пакеты длительного пребывания включая SIM-карты, настройку банковских счетов и гиды по районам.',
    cantonFair: 'Услуги Кантонской Ярмарки', cantonFairDesc: 'Полная помощь для Кантонской Ярмарки включая встречу в аэропорту, проживание, транспорт и перевод.',
    businessDesc: 'Профессиональные бизнес-услуги включая перевод, посещение фабрик и организацию встреч.',
    features: 'Особенности', contactUs: 'Связаться с нами',
  },
  de: {
    services: 'Dienstleistungen', heroTitle: 'Unsere Dienstleistungen', heroSub: 'Alles, was ein Ausländer zum Gedeihen in China braucht — unter einem Dach.',
    extendVisa: 'Visum Verlängern', rentApartment: 'Wohnung Mieten', rentHotels: 'Hotel Buchen',
    rentDriveCars: 'Auto Mieten/Fahren', stayInChina: 'In China Leben', businessSupport: 'Geschäftliche Unterstützung',
    backToHome: 'Zurück zur Startseite', bookNow: 'Jetzt Buchen', learnMore: 'Mehr Erfahren',
    visaDesc: 'Komplette Visumunterstützung — Dokumente, Einreichung und Nachverfolgung werden für Sie erledigt.',
    apartmentDesc: 'Verifizierte Angebote, zweisprachige Verträge und Vermittlung mit Vermietern in allen wichtigen Bezirken.',
    hotelsDesc: 'Ausländerfreundliche Hotels mit verifizierten Anmeldeverfahren und Vorzugspreisen.',
    carsDesc: 'Lizensierte zweisprachige Fahrer und Mietwagen mit Fahrer mit vollständiger Unterstützungsdokumentation.',
    stayDesc: 'Langzeitaufenthalte inklusive SIM-Karten, Bankkonto-Einrichtung und Stadtteilführern.',
    cantonFair: 'Kanton Messe Dienstleistungen', cantonFairDesc: 'Vollständige Unterstützung für die Kanton Messe inklusive Flughafenabholung, Unterkunft, Transport und Übersetzung.',
    businessDesc: 'Professionelle Geschäftsdienstleistungen einschließlich Übersetzung, Fabrikbesuchen und Meeting-Arrangements.',
    features: 'Merkmale', contactUs: 'Kontaktieren Sie uns',
  },
  ar: {
    services: 'الخدمات', heroTitle: 'خدماتنا', heroSub: 'كل ما يحتاجه الأجانب للازدهار في الصين — تحت سقف واحد.',
    extendVisa: 'تمديد التأشيرة', rentApartment: 'استئجار شقة', rentHotels: 'حجز فنادق',
    rentDriveCars: 'استئجار/قيادة سيارة', stayInChina: 'الإقامة في الصين', businessSupport: 'دعم الأعمال',
    backToHome: 'العودة إلى الرئيسية', bookNow: 'احجز الآن', learnMore: 'اعرف المزيد',
    visaDesc: 'دعم كامل للتأشيرات — المستندات، التقديم، والمتابعة تتم بالنيابة عنك.',
    apartmentDesc: 'قوائم موثوقة، عقود ثنائية اللغة، ووسطاء مع الملاك في جميع المناطق الرئيسية.',
    hotelsDesc: 'فنادق صديقة للأجانب بإجراءات تسجيل موثوقة وأسعار أولوية.',
    carsDesc: 'سائقون مرخصون ثنائيو اللغة وتأجير سيارات ذاتي القيادة بدعم وثائق كامل.',
    stayDesc: 'حزم إقامة طويلة الأمد تشمل بطاقات SIM، إعداد حسابات بنكية، وأدلة الأحياء.',
    cantonFair: 'خدمات معرض كانتون', cantonFairDesc: 'خدمة شاملة لمعرض كانتون: الاستقبال من المطار، حجز الفنادق، النقل اليومي، والترجمة.',
    businessDesc: 'خدمات تجارية احترافية بما في ذلك الترجمة، زيارات المصانع، وترتيبات الاجتماعات.',
    features: 'المميزات', contactUs: 'اتصل بنا',
  },
  am: {
    services: 'አገልግሎቶች', heroTitle: 'አገልግሎቶቻችን', heroSub: 'ቻይና ውስጥ ለውጭ ተጓዛሚዎች የሚያስፈልግ ሁሉም — አንድ ላይ በታች.',
    extendVisa: 'ቪዛ ዘርጋ', rentApartment: 'አፓርትማንት መከራ', rentHotels: 'ሆቴሎችን መከራ',
    rentDriveCars: 'ኪና መከራ/መንዳ', stayInChina: 'ቻይና ማለት', businessSupport: 'ንግድ ድጋፍ',
    backToHome: 'ወደ መነሻ ተመለስ', bookNow: 'አሁን ይዝርዝር', learnMore: 'ተጨማማሪ ይምለክ',
    visaDesc: 'ሙሉ የቪዛ ድጋፍ — ሰነዶች፣ ማስረጃ፣ እና መከተል በእርስዎ ይከናውላል።',
    apartmentDesc: 'የተረጋጋጁ ዝርዝሮች፣ የሁለት ቋንዛ ኮንትራቶች፣ እና በሁሉም ዋናታዊ ክፍሎች የቤት ባለንጋጌዎች።',
    hotelsDesc: 'የውጭ ተጓዛሚዎች የሚገባሉ ሆቴሎች ከተረጋጋጉ የመግቢያ ሂዳቶች እና የቅድሚያ ዋጋዎች።',
    carsDesc: 'የተፈቀዱ የሁለት ቋንዛ ሰላፊያት እና የሙሉ ድጋፍ ያለው የራስ መንዳ ኪና አስርጋ።',
    stayDesc: 'የረጅም ጊዜ ማለት ጥቅሎች የSIM ካርዶች፣ የባንክ አቋቋጥ፣ እና የአካባቢ መመሪያዎችን ያካትታል።',
    cantonFair: 'የካንተን ፌር አገልግሎቶች', cantonFairDesc: 'ሙሉ የካንተን ፌር ድጋፍ: ከአየርማሽ መረጃ፣ ሆቴል ክፈለፍ፣ የዕለት አየርማሽ፣ እና ትርጉም።',
    businessDesc: 'ፕሮፌሽናል ንግድ አገልግሎቶች ትርጉም፣ የፋብሪካ ጉዞዎች፣ እና የስብሰባት አስተካከሎችን ያካትታል።',
    features: 'ገጽባት', contactUs: 'ያግኙን',
  },
}

const SERVICES = [
  {
    id: 1,
    icon: '🛂',
    titleKey: 'extendVisa',
    descKey: 'visaDesc',
    features: ['Document Preparation', 'Submission Support', 'Follow-up Service', 'Express Processing'],
    color: '#E74C3C'
  },
  {
    id: 2,
    icon: '🏠',
    titleKey: 'rentApartment',
    descKey: 'apartmentDesc',
    features: ['Verified Listings', 'Bilingual Contracts', 'Landlord Support', 'Inspection Service'],
    color: '#3498DB'
  },
  {
    id: 3,
    icon: '🏨',
    titleKey: 'rentHotels',
    descKey: 'hotelsDesc',
    features: ['Foreigner-friendly', 'Priority Rates', 'Airport Transfer', '24/7 Support'],
    color: '#2ECC71'
  },
  {
    id: 4,
    icon: '🚗',
    titleKey: 'rentDriveCars',
    descKey: 'carsDesc',
    features: ['Licensed Drivers', 'Self-drive Option', 'Insurance Included', 'GPS Navigation'],
    color: '#F39C12'
  },
  {
    id: 5,
    icon: '🏮',
    titleKey: 'stayInChina',
    descKey: 'stayDesc',
    features: ['SIM Card Setup', 'Bank Account', 'Neighborhood Tour', 'Cultural Orientation'],
    color: '#9B59B6'
  },
  {
    id: 6,
    icon: '🏛️',
    titleKey: 'cantonFair',
    descKey: 'cantonFairDesc',
    features: ['Airport Pickup', 'Hotel Booking', 'Fair Transport', 'Translation Service'],
    color: '#E74C3C'
  },
  {
    id: 7,
    icon: '💼',
    titleKey: 'businessSupport',
    descKey: 'businessDesc',
    features: ['Translation Service', 'Factory Visits', 'Sourcing Trips', 'Business Meetings'],
    color: '#1ABC9C'
  },
]

export default function ServicesPage() {
  const [lang, setLang] = useState('en')
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
  }

  const handleContact = (method: string) => {
    // Handle contact method (WhatsApp, etc.)
    console.log(`Contact via ${method}`)
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
          
          .service-card { transition:transform .3s, box-shadow .3s; max-width:100%; }
          .service-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
          .feature-tag { transition:all .3s; word-wrap:break-word; overflow-wrap:break-word; }
          .feature-tag:hover { transform:scale(1.05); background:${darkGrey}10; }
          
          @media (max-width:480px) {
            .services-grid { grid-template-columns:1fr !important; gap:16px; }
            .hero-content { padding:40px 12px !important; }
            .service-card { margin-bottom:20px; }
          }
          @media (min-width:481px) and (max-width:768px) {
            .services-grid { grid-template-columns:1fr !important; gap:20px; }
            .hero-content { padding:40px 20px !important; }
            .service-card { margin-bottom:20px; }
          }
          @media (min-width:769px) and (max-width:1024px) {
            .services-grid { grid-template-columns:repeat(2, 1fr) !important; gap:24px; }
            .hero-content { padding:40px 24px !important; }
          }
          @media (min-width:1025px) {
            .services-grid { grid-template-columns:repeat(2, 1fr) !important; gap:30px; }
            .hero-content { padding:40px 32px !important; max-width:1200px; margin:0 auto; }
          }
        `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="fg-container" style={{ 
        background:`linear-gradient(135deg, ${darkGrey} 0%, ${darkGrey}dd 100%)`,
        padding:'60px 0 40px', 
        textAlign:'center',
        position:'relative',
        width:'100%',
        maxWidth:'100%'
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

      {/* ══════════════ SERVICES GRID ══════════════ */}
      <section className="fg-container" style={{ padding:'40px 0', background:cream, width:'100%', maxWidth:'100%' }}>
        <div className="services-grid grid-responsive" style={{ 
          display:'grid', 
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', 
          gap:'30px', 
          maxWidth:'1200px', 
          margin:'0 auto',
          width:'100%'
        }}>
          {SERVICES.map(service => (
            <div key={service.id} className="service-card" style={{ 
              background:cream, 
              borderRadius:'16px', 
              border:`1px solid ${creamDk}`,
              boxShadow:'0 4px 20px rgba(0,0,0,.08)'
            }}>
              <div style={{ 
                padding:'40px 30px', 
                background:`linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                borderBottom:`1px solid ${creamDk}`,
                textAlign:'center'
              }}>
                <div style={{ 
                  fontSize:'48px', 
                  marginBottom:'16px',
                  display:'inline-block',
                  padding:'16px',
                  background:`${service.color}20`,
                  borderRadius:'50%',
                  width:'80px',
                  height:'80px',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  fontFamily:"'Playfair Display',serif", 
                  fontSize:'24px', 
                  fontWeight:700, 
                  color:darkGrey, 
                  marginBottom:'12px', 
                  lineHeight:1.3 
                }}>
                  {t(service.titleKey)}
                </h3>
                <p style={{ 
                  fontSize:'14px', 
                  color:'rgba(44,62,80,.7)', 
                  lineHeight:1.6 
                }}>
                  {t(service.descKey)}
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
                    {service.features.map((feature, i) => (
                      <span key={i} className="feature-tag" style={{ 
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
                  paddingTop:'20px', 
                  borderTop:`1px solid ${creamDk}`
                }}>
                  <button style={{ 
                    padding:'12px 24px', 
                    background:service.color, 
                    color:cream, 
                    border:'none', 
                    borderRadius:'8px', 
                    fontSize:'14px', 
                    fontWeight:600, 
                    cursor:'pointer',
                    transition:'all .3s'
                  }}
                  onClick={() => handleContact('whatsapp')}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
                  >
                    {t('bookNow')} →
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
