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
    cantonFair: 'Canton Fair',
    aboutCantonFair: 'About Canton Fair',
    whatIsCantonFair: 'What is Canton Fair',
    cantonFairDesc: 'The Canton Fair is the largest trade fair in China, held twice a year in Guangzhou. It connects thousands of international buyers with Chinese manufacturers and suppliers across various industries.',
    ourServices: 'Our Canton Fair Services',
    service1: 'Airport Pickup & Transfer',
    service1Desc: 'Professional airport pickup from Guangzhou Baiyun International Airport with comfortable transfer to your hotel.',
    service2: 'Hotel Accommodation',
    service2Desc: 'Premium hotel booking near the Canton Fair complex with special rates for fair attendees.',
    service3: 'Daily Fair Transport',
    service3Desc: 'Reliable daily transportation between your hotel and the Canton Fair venue for all phases.',
    service4: 'Translation Services',
    service4Desc: 'Professional interpreters available during the fair to facilitate business negotiations.',
    service5: 'Business Consultation',
    service5Desc: 'Expert guidance on navigating the fair, finding suppliers, and negotiating deals.',
    fairDates: '2026 Canton Fair Dates',
    phase1: 'Phase 1',
    phase2: 'Phase 2', 
    phase3: 'Phase 3',
    phase1Dates: 'April 15-19, 2026',
    phase2Dates: 'April 23-27, 2026',
    phase3Dates: 'May 1-5, 2026',
    phase1Focus: 'Electronics, Household Electrical Appliances, Consumer Goods',
    phase2Focus: 'Decorative Materials, Ceramics, Household Items',
    phase3Focus: 'Textiles & Garments, Shoes, Bags, Medicine',
    bookNow: 'Book Canton Fair Service',
    contactUs: 'Contact Us',
    backToServices: 'Back to Services',
    fairLocation: 'Canton Fair Complex',
    fairAddress: 'No. 380, Yuejiang Zhong Road, Pazhou, Haizhu District, Guangzhou',
    whyChooseUs: 'Why Choose ForeignersGO for Canton Fair',
    reason1: 'Local Expertise',
    reason1Desc: 'Deep knowledge of Guangzhou and Canton Fair logistics.',
    reason2: 'Professional Service',
    reason2Desc: 'Experienced team providing reliable, high-quality service.',
    reason3: 'Competitive Pricing',
    reason3Desc: 'Fair rates with no hidden costs for all fair services.',
    reason4: '24/7 Support',
    reason4Desc: 'Round-the-clock assistance during your Canton Fair visit.',
  },
  zh: {
    cantonFair: '广交会',
    aboutCantonFair: '关于广交会',
    whatIsCantonFair: '什么是广交会',
    cantonFairDesc: '广交会是中国最大的贸易展览会，每年在广州举办两次。它连接了成千上万的国际买家与中国制造商和供应商，涵盖各个行业。',
    ourServices: '我们的广交会服务',
    service1: '机场接送',
    service1Desc: '从广州白云国际机场专业接送，舒适地送您到酒店。',
    service2: '酒店住宿',
    service2Desc: '预订广交会附近的优质酒店，为参展商提供特别优惠。',
    service3: '每日展会交通',
    service3Desc: '在广交会期间提供酒店与展馆之间的可靠日常交通服务。',
    service4: '翻译服务',
    service4Desc: '展会期间提供专业口译服务，协助商务谈判。',
    service5: '商务咨询',
    service5Desc: '专家指导如何逛展、寻找供应商和谈判交易。',
    fairDates: '2026年广交会日期',
    phase1: '第一期',
    phase2: '第二期',
    phase3: '第三期',
    phase1Dates: '2026年4月15-19日',
    phase2Dates: '2026年4月23-27日',
    phase3Dates: '2026年5月1-5日',
    phase1Focus: '电子产品、家用电器、消费品',
    phase2Focus: '装饰材料、陶瓷、家居用品',
    phase3Focus: '纺织品服装、鞋类、箱包、医药',
    bookNow: '预订广交会服务',
    contactUs: '联系我们',
    backToServices: '返回服务',
    fairLocation: '广交会展馆',
    fairAddress: '广州市海珠区阅江中路380号琶洲',
    whyChooseUs: '为什么选择ForeignersGO参加广交会',
    reason1: '本地专业知识',
    reason1Desc: '对广州和广交会物流有深入了解。',
    reason2: '专业服务',
    reason2Desc: '经验丰富的团队提供可靠、高质量的服务。',
    reason3: '竞争性价格',
    reason3Desc: '所有广交会服务价格合理，无隐藏费用。',
    reason4: '24/7支持',
    reason4Desc: '在您参加广交会期间提供全天候协助。',
  },
  es: {
    cantonFair: 'Feria de Cantón',
    aboutCantonFair: 'Acerca de la Feria de Cantón',
    whatIsCantonFair: '¿Qué es la Feria de Cantón',
    cantonFairDesc: 'La Feria de Cantón es la feria comercial más grande de China, celebrada dos veces al año en Guangzhou. Conecta a miles de compradores internacionales con fabricantes y proveedores chinos en diversas industrias.',
    ourServices: 'Nuestros Servicios para la Feria de Cantón',
    service1: 'Recogida y Transferencia del Aeropuerto',
    service1Desc: 'Recogida profesional del Aeropuerto Internacional de Guangzhou Baiyun con cómoda transferencia a su hotel.',
    service2: 'Alojamiento Hotelero',
    service2Desc: 'Reserva de hoteles premium cerca del complejo de la Feria de Cantón con tarifas especiales para asistentes.',
    service3: 'Transporte Diario a la Feria',
    service3Desc: 'Transporte diario confiable entre su hotel y el recinto de la Feria de Cantón para todas las fases.',
    service4: 'Servicios de Traducción',
    service4Desc: 'Intérpretes profesionales disponibles durante la feria para facilitar negociaciones comerciales.',
    service5: 'Consultoría de Negocios',
    service5Desc: 'Guía experta para navegar la feria, encontrar proveedores y negociar acuerdos.',
    fairDates: 'Fechas de la Feria de Cantón 2026',
    phase1: 'Fase 1',
    phase2: 'Fase 2',
    phase3: 'Fase 3',
    phase1Dates: '15-19 de abril de 2026',
    phase2Dates: '23-27 de abril de 2026',
    phase3Dates: '1-5 de mayo de 2026',
    phase1Focus: 'Electrónica, Electrodomésticos, Bienes de Consumo',
    phase2Focus: 'Materiales Decorativos, Cerámica, Artículos para el Hogar',
    phase3Focus: 'Textiles y Ropa, Calzado, Bolsos, Medicina',
    bookNow: 'Reservar Servicio para la Feria',
    contactUs: 'Contáctanos',
    backToServices: 'Volver a Servicios',
    fairLocation: 'Complejo de la Feria de Cantón',
    fairAddress: 'No. 380, Calle Yuejiang Zhong, Pazhou, Distrito de Haizhu, Guangzhou',
    whyChooseUs: 'Por Qué Elegir ForeignersGO para la Feria de Cantón',
    reason1: 'Experiencia Local',
    reason1Desc: 'Conocimiento profundo de Guangzhou y logística de la Feria de Cantón.',
    reason2: 'Servicio Profesional',
    reason2Desc: 'Equipo experimentado que proporciona servicio confiable y de alta calidad.',
    reason3: 'Precios Competitivos',
    reason3Desc: 'Tarifas justas sin costos ocultos para todos los servicios de la feria.',
    reason4: 'Soporte 24/7',
    reason4Desc: 'Asistencia continua durante su visita a la Feria de Cantón.',
  },
  ar: {
    cantonFair: 'معرض كانتون',
    aboutCantonFair: 'حول معرض كانتون',
    whatIsCantonFair: 'ما هو معرض كانتون',
    cantonFairDesc: 'معرض كانتون هو أكبر معرض تجاري في الصين، يقام مرتين في السنة في غوانزو. يربط آلاف المشترين الدوليين بالشركات الصينية والموردين في مختلف الصناعات.',
    ourServices: 'خدمات معرض كانتون',
    service1: 'الاستلام من المطار والنقل',
    service1Desc: 'استلام مهني من مطار غوانزو بايون الدولي مع نقل مريح إلى فندقك.',
    service2: 'الإقامة في الفنادق',
    service2Desc: 'حجز فنادق بالقرب من مجمع معرض كانتون بأسعار خاصة لحضور المعارض.',
    service3: 'النقل اليومي للمعرض',
    service3Desc: 'مواصلات يومية موثوقة بين فندقك ومجمع معرض كانتون لجميع مراحل المعارض.',
    service4: 'خدمات الترجمة',
    service4Desc: 'مترجمون محترفون متاحون خلال المعارض لتسهيل المفاوضات التجارية.',
    service5: 'استشارات تجارية',
    service5Desc: 'إرشادات خبراء في التنقل في المعارض والعثور على الموردين والتفاوض على الصفقات.',
    fairDates: 'تواريخ معرض كانتون 2026',
    phase1: 'المرحلة الأولى',
    phase2: 'المرحلة الثانية', 
    phase3: 'المرحلة الثالثة',
    phase1Dates: '15-19 أبريل 2026',
    phase2Dates: '23-27 أبريل 2026',
    phase3Dates: '1-5 مايو 2026',
    phase1Focus: 'الإلكترونيات، الأجهزة المنزلية، السلع الاستهلاكية',
    phase2Focus: 'مواد الديكور، السيراميك، الأثاث المنزلي',
    phase3Focus: 'المنسوجات والأقمشة، الأحذية، الأكييس، الأدوية',
    bookNow: 'احجز خدمة معرض كانتون',
    contactUs: 'اتصل بنا',
    backToServices: 'العودة إلى الخدمات',
    fairLocation: 'مجمع معرض كانتون',
    fairAddress: 'رقم 380، طريق يوجيانغ تشونغ، حي بايوهو، منطقة هايتشو، غوانزو',
    whyChooseUs: 'لماذا تختار ForeignersGO لمعرض كانتون',
    reason1: 'الخبرة المحلية',
    reason1Desc: 'معرفة عميقة بغوانزو وخدمات معرض كانتون.',
    reason2: 'الخدمة الاحترافية',
    reason2Desc: 'فريق ذو خبرة يقدم خدمة موثوقة وعالية الجودة.',
    reason3: 'الأسعار التنافسية',
    reason3Desc: 'أسعار عادلة بدون رسوم خفية لجميع خدمات المعارض.',
    reason4: 'دعم على مدار الساعة',
    reason4Desc: 'فريق دعم متاح طوال الوقت للمساعدة في أي استفسار.',
  },
  am: {
    cantonFair: 'ካንቶን ፈር',
    aboutCantonFair: 'ካንቶን ፈር ስለማ',
    whatIsCantonFair: 'ካንቶን ፈር ምማርች',
    cantonFairDesc: 'ካንቶን ፈር በጓዋንዞው የቻራልጥን ስልየማር የቻራልጥን ህይትንንዋንም እስትንንዋንም.',
    ourServices: 'የካንቶን ፈር አገለች',
    service1: 'አየርራት እና መተርልብን',
    service1Desc: 'ከጓዋንዞው ባንርናን በጓዋንዞው የቻራልጥን ስልየማር የቻራልጥን ህይትንንዋንም.',
    service2: 'ሆቴል መከማር',
    service2Desc: 'ከካንቶን ፈር በጓዋንዞው ስለማር አገለች በጓዋንዞው ወደ ሆቴል መልተርን.',
    service3: 'ለደ ወደ መተርልብን',
    service3Desc: 'ከሆቴልዎች እና ሆቴልዎች መካከሉ በጓዋንዞው ወደ ሆቴል መልተርን ለዋን አገለች፣ የካንቶን ፈር ስልየማር መልተርን.',
    service4: 'ትርግማች አገለች',
    service4Desc: 'በጓዋንዞው የቻራልጥን ስልየማር መልተርን በጓዋንዞው የቻራልጥን ህይትንንዋንም.',
    service5: 'ንርዛ ደገለች',
    service5Desc: 'ከካንቶን ፈር በጓዋንዞው የቻራልጥን ስልየማር መልተርን በጓዋንዞው ወደ ሆቴል መልተርን.',
    fairDates: 'ካንቶን ፈር 2026 ቀንታ',
    phase1: 'የመጀመር ምር',
    phase2: 'ሁለደ ምር', 
    phase3: 'ሶለደ ምር',
    phase1Dates: 'ኤፕሬል 15-19, 2026',
    phase2Dates: 'ኤፕሬል 23-27, 2026',
    phase3Dates: 'ሜይ 1-5, 2026',
    phase1Focus: 'ኢሌክትሮስች፣ እና ቤልብርርች',
    phase2Focus: 'ዲማርች ምርርች፣ እና የጓዋንዞው ስልየማር መልተርን.',
    phase3Focus: 'ንማርችእና አገለች፣ የጓዋንዞው የቤልብርርች',
    bookNow: 'ካንቶን ፈር አገለች',
    contactUs: 'የማርትን አስግክ',
    backToServices: 'ወደ አገለችዎች',
    fairLocation: 'ካንቶን ፈር አገለች',
    fairAddress: 'ቁጋ 380, የውጅግ ጓው, ባይንት ባይንት, ሃይዙው አወል, ጓዋንዞው',
    whyChooseUs: 'ለምኦ ForeignersGO የካንቶን ፈር ምርትንንዋንም',
    reason1: 'የቻራልጥን ዕውር',
    reason1Desc: 'ጓዋንዞው በጓዋንዞው የቻራልጥን ስልየማር መልተርን.',
    reason2: 'ንርዛ ደገለች',
    reason2Desc: 'ዕ�ር ደገለች የጓዋንዞው የቻራልጥን ስልየማር መልተርን.',
    reason3: 'የተርማርች ዋ�ግብ',
    reason3Desc: 'ለዋን አገለች ዋ�ግብ ለዋን እና የጓዋንዞው ወደ ሆቴል መልተርን.',
    reason4: '24/7 ደገለች',
    reason4Desc: 'ለዋን አገለች የጓዋንዞው ወደ ሆቴል መልተርን.',
  },
}

export default function CantonFairPage() {
  const [lang, setLang] = useState('en')
  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
  }

  const handleContact = (method: string) => {
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
          html { }
          .service-card { transition:transform .3s, box-shadow .3s; }
          .service-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
          .phase-card { transition:all .3s; border:2px solid transparent; }
          .phase-card:hover { border-color:${gold}; transform:translateY(-4px); }
          .reason-card { transition:all .3s; }
          .reason-card:hover { transform:translateY(-4px); box-shadow:0 12px 24px rgba(0,0,0,.1); }
          @media (max-width:768px) {
            .hero-content { padding:40px 5% !important; }
            .service-grid { grid-template-columns:1fr !important; }
            .phases-grid { grid-template-columns:1fr !important; }
          }
        `}</style>

        {/* ════════════ HERO ════════════ */}
        <section style={{ 
          minHeight:'100vh', 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center',
          background:`linear-gradient(135deg, ${darkGrey} 0%, ${red} 100%)`,
          color:cream,
          position:'relative',
          overflow:'hidden'
        }}>
          <div style={{ 
            position:'absolute', 
            inset:0, 
            background:'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2400") center/cover',
            opacity:0.2
          }} />
          
          <div className="hero-content" style={{ 
            position:'relative', 
            zIndex:2, 
            textAlign:'center', 
            padding:'80px 5%', 
            maxWidth:'800px',
            margin:'0 auto'
          }}>
            <div style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:goldLight, marginBottom:'20px' }}>
              {t('aboutCantonFair')}
            </div>
            <h1 style={{ 
              fontFamily:"'Playfair Display',serif", 
              fontSize:'clamp(40px,6vw,70px)', 
              fontWeight:900, 
              lineHeight:1.1, 
              marginBottom:'30px',
              textShadow:'2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {t('cantonFair')}
            </h1>
            <p style={{ fontSize:'18px', lineHeight:1.6, marginBottom:'40px', opacity:0.9 }}>
              {t('cantonFairDesc')}
            </p>
            <div style={{ display:'flex', gap:'20px', justifyContent:'center', flexWrap:'wrap' }}>
              <button style={{ 
                fontFamily:"'DM Sans',sans-serif", 
                fontSize:'14px', 
                fontWeight:700, 
                letterSpacing:'2px', 
                textTransform:'uppercase', 
                color:darkGrey, 
                background:goldLight, 
                padding:'16px 32px', 
                border:'none', 
                cursor:'pointer',
                borderRadius:'6px',
                transition:'all .3s'
              }}>
                {t('bookNow')}
              </button>
              <Link href="/services" style={{ 
                fontFamily:"'DM Sans',sans-serif", 
                fontSize:'14px', 
                fontWeight:500, 
                letterSpacing:'1.5px', 
                textTransform:'uppercase', 
                color:cream, 
                padding:'15px 30px', 
                border:'2px solid rgba(255,255,255,.3)', 
                background:'transparent',
                cursor:'pointer',
                borderRadius:'6px',
                textDecoration:'none',
                transition:'all .3s'
              }}>
                {t('backToServices')}
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════ 2026 FAIR DATES ════════════ */}
        <section style={{ padding:'100px 5%', background:creamDk }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h2 style={{ 
              fontFamily:"'Playfair Display',serif", 
              fontSize:'clamp(32px,4vw,48px)', 
              fontWeight:900, 
              color:darkGrey, 
              textAlign:'center', 
              marginBottom:'20px' 
            }}>
              {t('fairDates')}
            </h2>
            <p style={{ textAlign:'center', fontSize:'16px', color:darkGrey, marginBottom:'60px', opacity:0.8 }}>
              {t('fairLocation')} - {t('fairAddress')}
            </p>
            
            <div className="phases-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'30px' }}>
              {[
                { phase: t('phase1'), dates: t('phase1Dates'), focus: t('phase1Focus') },
                { phase: t('phase2'), dates: t('phase2Dates'), focus: t('phase2Focus') },
                { phase: t('phase3'), dates: t('phase3Dates'), focus: t('phase3Focus') }
              ].map((item, index) => (
                <div key={index} className="phase-card" style={{ 
                  background:cream, 
                  padding:'40px', 
                  borderRadius:'12px', 
                  boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
                  textAlign:'center'
                }}>
                  <div style={{ 
                    fontSize:'14px', 
                    fontWeight:700, 
                    color:goldLight, 
                    marginBottom:'10px', 
                    letterSpacing:'2px', 
                    textTransform:'uppercase' 
                  }}>
                    {item.phase}
                  </div>
                  <div style={{ 
                    fontSize:'20px', 
                    fontWeight:700, 
                    color:darkGrey, 
                    marginBottom:'15px' 
                  }}>
                    {item.dates}
                  </div>
                  <div style={{ fontSize:'14px', lineHeight:1.6, color:darkGrey, opacity:0.8 }}>
                    {item.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ OUR SERVICES ════════════ */}
        <section style={{ padding:'100px 5%', background:cream }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h2 style={{ 
              fontFamily:"'Playfair Display',serif", 
              fontSize:'clamp(32px,4vw,48px)', 
              fontWeight:900, 
              color:darkGrey, 
              textAlign:'center', 
              marginBottom:'60px' 
            }}>
              {t('ourServices')}
            </h2>
            
            <div className="service-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:'40px' }}>
              {[
                { title: t('service1'), desc: t('service1Desc'), icon: '✈️' },
                { title: t('service2'), desc: t('service2Desc'), icon: '🏨' },
                { title: t('service3'), desc: t('service3Desc'), icon: '🚗' },
                { title: t('service4'), desc: t('service4Desc'), icon: '🗣️' },
                { title: t('service5'), desc: t('service5Desc'), icon: '💼' }
              ].map((service, index) => (
                <div key={index} className="service-card" style={{ 
                  background:cream, 
                  padding:'40px', 
                  borderRadius:'12px', 
                  boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
                  border:'1px solid rgba(44,62,80,0.1)'
                }}>
                  <div style={{ fontSize:'48px', marginBottom:'20px', textAlign:'center' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ 
                    fontFamily:"'Playfair Display',serif", 
                    fontSize:'24px', 
                    fontWeight:700, 
                    color:darkGrey, 
                    marginBottom:'15px', 
                    textAlign:'center' 
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize:'16px', lineHeight:1.6, color:darkGrey, opacity:0.8, textAlign:'center' }}>
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ WHY CHOOSE US ════════════ */}
        <section style={{ padding:'100px 5%', background:darkGrey, color:cream }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h2 style={{ 
              fontFamily:"'Playfair Display',serif", 
              fontSize:'clamp(32px,4vw,48px)', 
              fontWeight:900, 
              color:cream, 
              textAlign:'center', 
              marginBottom:'60px' 
            }}>
              {t('whyChooseUs')}
            </h2>
            
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'30px' }}>
              {[
                { title: t('reason1'), desc: t('reason1Desc'), icon: '🎯' },
                { title: t('reason2'), desc: t('reason2Desc'), icon: '⭐' },
                { title: t('reason3'), desc: t('reason3Desc'), icon: '💰' },
                { title: t('reason4'), desc: t('reason4Desc'), icon: '📞' }
              ].map((reason, index) => (
                <div key={index} className="reason-card" style={{ 
                  background:'rgba(255,255,255,0.05)', 
                  padding:'40px 30px', 
                  borderRadius:'12px', 
                  textAlign:'center',
                  border:'1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize:'48px', marginBottom:'20px' }}>
                    {reason.icon}
                  </div>
                  <h3 style={{ 
                    fontFamily:"'Playfair Display',serif", 
                    fontSize:'20px', 
                    fontWeight:700, 
                    color:goldLight, 
                    marginBottom:'15px' 
                  }}>
                    {reason.title}
                  </h3>
                  <p style={{ fontSize:'15px', lineHeight:1.6, opacity:0.9 }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ CTA ════════════ */}
        <section style={{ padding:'80px 5%', background:red, textAlign:'center', color:cream }}>
          <div style={{ maxWidth:'800px', margin:'0 auto' }}>
            <h2 style={{ 
              fontFamily:"'Playfair Display',serif", 
              fontSize:'clamp(32px,4vw,48px)', 
              fontWeight:900, 
              marginBottom:'30px' 
            }}>
              {t('bookNow')}
            </h2>
            <p style={{ fontSize:'18px', marginBottom:'40px', opacity:0.9 }}>
              Let us handle all your Canton Fair logistics while you focus on business.
            </p>
            <button style={{ 
              fontFamily:"'DM Sans',sans-serif", 
              fontSize:'16px', 
              fontWeight:700, 
              letterSpacing:'2px', 
              textTransform:'uppercase', 
              color:red, 
              background:cream, 
              padding:'18px 40px', 
              border:'none', 
              cursor:'pointer',
              borderRadius:'8px',
              transition:'all .3s',
              boxShadow:'0 8px 24px rgba(0,0,0,0.2)'
            }}>
              {t('contactUs')}
            </button>
          </div>
        </section>

        <Footer lang={lang} />
      <StickyContact />
      </div>
    </>
  )
}
