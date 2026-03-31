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
    contactUs: 'Contact Us', heroTitle: 'Get in Touch', heroSub: 'We\'re here to help you make the most of your time in China.',
    backToHome: 'Back to Home', sendMessage: 'Send Message',
    name: 'Name', email: 'Email', phone: 'Phone', service: 'Service',
    message: 'Message', submit: 'Submit', orContact: 'Or contact us directly',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: 'WeChat',
    officeHours: 'Office Hours', responseTime: 'Response Time',
    quickContact: 'Quick Contact', bookService: 'Book a Service',
    inquiry: 'General Inquiry', feedback: 'Feedback',
    extendVisa: 'Extend Visa', rentApartment: 'Rent Apartment', rentHotels: 'Rent Hotels',
    rentDriveCars: 'Rent / Drive Cars', stayInChina: 'Stay in China', businessSupport: 'Business Support',
  },
  zh: {
    contactUs: '联系我们', heroTitle: '联系', heroSub: '我们在这里帮助您充分利用在中国的时间。',
    backToHome: '返回首页', sendMessage: '发送消息',
    name: '姓名', email: '邮箱', phone: '电话', service: '服务',
    message: '消息', submit: '提交', orContact: '或直接联系我们',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: '微信',
    officeHours: '办公时间', responseTime: '回复时间',
    quickContact: '快速联系', bookService: '预订服务',
    inquiry: '一般咨询', feedback: '反馈',
    extendVisa: '延长签证', rentApartment: '租公寓', rentHotels: '租酒店',
    rentDriveCars: '租车/驾车', stayInChina: '在中国住', businessSupport: '商务支持',
  },
  es: {
    contactUs: 'Contáctenos', heroTitle: 'Póngase en Contacto', heroSub: 'Estamos aquí para ayudarle a aprovechar al máximo su tiempo en China.',
    backToHome: 'Volver al Inicio', sendMessage: 'Enviar Mensaje',
    name: 'Nombre', email: 'Correo', phone: 'Teléfono', service: 'Servicio',
    message: 'Mensaje', submit: 'Enviar', orContact: 'O contáctenos directamente',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: 'WeChat',
    officeHours: 'Horario de Oficina', responseTime: 'Tiempo de Respuesta',
    quickContact: 'Contacto Rápido', bookService: 'Reservar Servicio',
    inquiry: 'Consulta General', feedback: 'Comentarios',
    extendVisa: 'Extender Visa', rentApartment: 'Alquilar Apartamento', rentHotels: 'Alquilar Hoteles',
    rentDriveCars: 'Alquilar / Conducir Autos', stayInChina: 'Vivir en China', businessSupport: 'Soporte Empresarial',
  },
  fr: {
    contactUs: 'Contactez-nous', heroTitle: 'Contactez-nous', heroSub: 'Nous sommes là pour vous aider à profiter au maximum de votre temps en Chine.',
    backToHome: 'Retour à l\'Accueil', sendMessage: 'Envoyer un Message',
    name: 'Nom', email: 'Email', phone: 'Téléphone', service: 'Service',
    message: 'Message', submit: 'Soumettre', orContact: 'Ou contactez-nous directement',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: 'WeChat',
    officeHours: 'Heures de Bureau', responseTime: 'Temps de Réponse',
    quickContact: 'Contact Rapide', bookService: 'Réserver un Service',
    inquiry: 'Demande Générale', feedback: 'Commentaires',
    extendVisa: 'Extension de Visa', rentApartment: 'Louer Appartement', rentHotels: 'Louer Hôtels',
    rentDriveCars: 'Louer / Conduire Voiture', stayInChina: 'Vivre en Chine', businessSupport: 'Support Commercial',
  },
  ru: {
    contactUs: 'Связаться с нами', heroTitle: 'Свяжитесь с нами', heroSub: 'Мы здесь, чтобы помочь вам максимально использовать ваше время в Китае.',
    backToHome: 'Вернуться домой', sendMessage: 'Отправить сообщение',
    name: 'Имя', email: 'Электронная почта', phone: 'Телефон', service: 'Услуга',
    message: 'Сообщение', submit: 'Отправить', orContact: 'Или свяжитесь с нами напрямую',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: 'WeChat',
    officeHours: 'Часы работы', responseTime: 'Время ответа',
    quickContact: 'Быстрая связь', bookService: 'Забронировать услугу',
    inquiry: 'Общий запрос', feedback: 'Обратная связь',
    extendVisa: 'Продление Визы', rentApartment: 'Аренда Квартиры', rentHotels: 'Аренда Отелей',
    rentDriveCars: 'Аренда/Вождение Авто', stayInChina: 'Жизнь в Китае', businessSupport: 'Бизнес Поддержка',
  },
  de: {
    contactUs: 'Kontaktieren Sie uns', heroTitle: 'Kontaktieren Sie uns', heroSub: 'Wir sind hier, um Ihnen zu helfen, Ihre Zeit in China bestmöglich zu nutzen.',
    backToHome: 'Zurück zur Startseite', sendMessage: 'Nachricht senden',
    name: 'Name', email: 'E-Mail', phone: 'Telefon', service: 'Service',
    message: 'Nachricht', submit: 'Absenden', orContact: 'Oder kontaktieren Sie uns direkt',
    whatsapp: 'WhatsApp', telegram: 'Telegram', wechat: 'WeChat',
    officeHours: 'Bürozeiten', responseTime: 'Antwortzeit',
    quickContact: 'Schneller Kontakt', bookService: 'Service buchen',
    inquiry: 'Allgemeine Anfrage', feedback: 'Feedback',
    extendVisa: 'Visum Verlängern', rentApartment: 'Wohnung Mieten', rentHotels: 'Hotel Buchen',
    rentDriveCars: 'Auto Mieten/Fahren', stayInChina: 'In China Leben', businessSupport: 'Geschäftliche Unterstützung',
  },
  ar: {
    contactUs: 'اتصل بنا', heroTitle: 'تواصل معنا', heroSub: 'نحن هنا لمساعدتك على الاستفادة القصوى من وقتك في الصين.',
    backToHome: 'العودة إلى الرئيسية', sendMessage: 'إرسال رسالة',
    name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الهاتف', service: 'الخدمة',
    message: 'الرسالة', submit: 'إرسال', orContact: 'أو اتصل بنا مباشرة',
    whatsapp: 'واتساب', telegram: 'تيليجرام', wechat: 'وي تشات',
    officeHours: 'ساعات العمل', responseTime: 'وقت الاستجابة',
    quickContact: 'اتصال سريع', bookService: 'احجز خدمة',
    inquiry: 'استفسار عام', feedback: 'ملاحظات',
    extendVisa: 'تمديد التأشيرة', rentApartment: 'استئجار شقة', rentHotels: 'استئجار فنادق',
    rentDriveCars: 'استئجار/قيادة السيارات', stayInChina: 'الإقامة في الصين', businessSupport: 'الدعم التجاري',
  },
  am: {
    contactUs: 'የማርትን አስግክ', heroTitle: 'የማርትን አስግክ', heroSub: 'በጓዋንዞው በጓዋንዞው እና ህይትን በጓዋንዞው አገባትልጥንዎች ህይትንንዋንም.',
    backToHome: 'ወደ ወደ ገጽ', sendMessage: 'መልጽ ላይል',
    name: 'ስም', email: 'ኢሜሜን', phone: 'ስልክ', service: 'አገለት',
    message: 'መልእያ', submit: 'መላአት', orContact: 'ወወ አስግክ በገባትልጥንዎች',
    whatsapp: 'ዋሽአት', telegram: 'ሌግራም', wechat: 'ዊቻት',
    officeHours: 'የሥርትን ሰዓታ', responseTime: 'ምርማ ሰዓታ',
    quickContact: 'ፈስር አስግክ', bookService: 'አገለት መዋምርር',
    inquiry: 'አገለት ጥያም', feedback: 'አርምማ',
    extendVisa: 'ቪራማር መማርርም', rentApartment: 'አፓርት መከማር', rentHotels: 'ሆቴል መከማር',
    rentDriveCars: 'ከማር/መንስር', stayInChina: 'በጓዋንዞው መበልር', businessSupport: 'ንርዛ ደገለት',
  },
}

const SERVICES = [
  'extendVisa', 'rentApartment', 'rentHotels', 'rentDriveCars', 'stayInChina', 'businessSupport'
]

export default function ContactPage() {
  const [lang, setLang] = useState('en')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
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
  const cream = '#FFFFFF'
  const creamDk = '#ECF0F1'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contact = (p: string) => {
    const msg = encodeURIComponent('Hello! I would like to book a service with ForeignersGO. Please assist me.')
    if (p === 'whatsapp') window.open(`https://wa.me/8619584750412?text=${msg}`, '_blank')
    if (p === 'telegram') window.open(`https://t.me/foreignersgo?text=${msg}`, '_blank')
    if (p === 'wechat') alert('WeChat QR code would be shown here')
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
      
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="fg-container" style={{ fontFamily:"'DM Sans',sans-serif", background:cream, color:darkGrey, minHeight:'100vh', paddingTop:'100px', width:'100%', maxWidth:'100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { width:100%; }
        body { width:100%; max-width:100%; }
        .contact-card { transition:transform .3s, box-shadow .3s; max-width:100%; }
        .contact-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); }
        .form-input { transition:border-color .3s; width:100%; box-sizing:border-box; }
        .form-input:focus { border-color:${gold}; outline:none; }
        .submit-btn { transition:all .3s; }
        .submit-btn:hover { background:${red}; transform:translateY(-2px); }
        .contact-method { transition:transform .3s; }
        .contact-method:hover { transform:scale(1.05); }
        @media (max-width:768px) {
          .contact-grid { grid-template-columns:1fr !important; }
          .hero-content { padding:40px 12px !important; }
          .form-grid { grid-template-columns:1fr !important; }
        }
        @media (min-width:769px) and (max-width:1024px) {
          .hero-content { padding:40px 24px !important; }
        }
        @media (min-width:1025px) {
          .hero-content { padding:40px 32px !important; max-width:1200px; margin:0 auto; }
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

      {/* ══════════════ CONTACT FORM ══════════════ */}
      <section style={{ padding:'80px 5%', background:creamDk }}>
        <div style={{ maxWidth:'800px', margin:'0 auto' }}>
          <div style={{ 
            display:'grid', 
            gridTemplateColumns:'1fr 1fr', 
            gap:'60px', 
            alignItems:'start' 
          }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ 
                fontFamily:"'Playfair Display',serif", 
                fontSize:'clamp(28px,4vw,42px)', 
                fontWeight:900, 
                color:darkGrey, 
                marginBottom:'30px' 
              }}>
                {t('sendMessage')}
              </h2>
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                <div className="form-grid" style={{ 
                  display:'grid', 
                  gridTemplateColumns:'1fr 1fr', 
                  gap:'20px' 
                }}>
                  <div>
                    <label style={{ 
                      display:'block', 
                      fontSize:'14px', 
                      fontWeight:600, 
                      marginBottom:'8px', 
                      color:darkGrey 
                    }}>
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input"
                      style={{ 
                        width:'100%', 
                        padding:'12px 16px', 
                        border:`1px solid ${creamDk}`, 
                        borderRadius:'8px', 
                        fontSize:'14px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display:'block', 
                      fontSize:'14px', 
                      fontWeight:600, 
                      marginBottom:'8px', 
                      color:darkGrey 
                    }}>
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                      style={{ 
                        width:'100%', 
                        padding:'12px 16px', 
                        border:`1px solid ${creamDk}`, 
                        borderRadius:'8px', 
                        fontSize:'14px'
                      }}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display:'block', 
                    fontSize:'14px', 
                    fontWeight:600, 
                    marginBottom:'8px', 
                    color:darkGrey 
                  }}>
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="form-input"
                    style={{ 
                      width:'100%', 
                      padding:'12px 16px', 
                      border:`1px solid ${creamDk}`, 
                      borderRadius:'8px', 
                      fontSize:'14px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display:'block', 
                    fontSize:'14px', 
                    fontWeight:600, 
                    marginBottom:'8px', 
                    color:darkGrey 
                  }}>
                    {t('service')}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="form-input"
                    style={{ 
                      width:'100%', 
                      padding:'12px 16px', 
                      border:`1px solid ${creamDk}`, 
                      borderRadius:'8px', 
                      fontSize:'14px',
                      background:cream
                    }}
                  >
                    <option value="">{t('bookService')}</option>
                    {SERVICES.map(service => (
                      <option key={service} value={service}>{t(service)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ 
                    display:'block', 
                    fontSize:'14px', 
                    fontWeight:600, 
                    marginBottom:'8px', 
                    color:darkGrey 
                  }}>
                    {t('message')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="form-input"
                    rows={5}
                    style={{ 
                      width:'100%', 
                      padding:'12px 16px', 
                      border:`1px solid ${creamDk}`, 
                      borderRadius:'8px', 
                      fontSize:'14px',
                      resize:'vertical'
                    }}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="submit-btn"
                  style={{ 
                    padding:'14px 32px', 
                    background:gold, 
                    color:darkGrey, 
                    border:'none', 
                    borderRadius:'8px', 
                    fontSize:'16px', 
                    fontWeight:600, 
                    cursor:'pointer',
                    alignSelf:'start'
                  }}>
                  {t('submit')}
                </button>
              </form>
            </div>

            {/* Quick Contact */}
            <div>
              <h3 style={{ 
                fontSize:'20px', 
                fontWeight:700, 
                color:darkGrey, 
                marginBottom:'20px' 
              }}>
                {t('quickContact')}
              </h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {[
                  { name: 'whatsapp', color: '#25D366', icon: '💬' },
                  { name: 'telegram', color: '#0088CC', icon: '✈️' },
                  { name: 'wechat', color: '#07C160', icon: '📱' }
                ].map(method => (
                  <div
                    key={method.name}
                    onClick={() => contact(method.name)}
                    className="contact-method"
                    style={{ 
                      display:'flex', 
                      alignItems:'center', 
                      gap:'12px', 
                      padding:'16px', 
                      background:cream, 
                      borderRadius:'12px', 
                      cursor:'pointer',
                      border:`1px solid ${creamDk}`
                    }}
                  >
                    <div style={{ 
                      fontSize:'24px', 
                      width:'40px', 
                      height:'40px', 
                      display:'flex', 
                      alignItems:'center', 
                      justifyContent:'center',
                      background:`${method.color}20`,
                      borderRadius:'50%'
                    }}>
                      {method.icon}
                    </div>
                    <div>
                      <div style={{ fontSize:'16px', fontWeight:600, color:darkGrey }}>
                        {t(method.name)}
                      </div>
                      <div style={{ fontSize:'12px', color:'rgba(44,62,80,.6)' }}>
                        {method.name === 'wechat' ? 'Scan QR Code' : 'Click to chat'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                marginTop:'30px', 
                padding:'20px', 
                background:`${gold}10`, 
                borderRadius:'12px',
                border:`1px solid ${gold}30`
              }}>
                <h4 style={{ fontSize:'14px', fontWeight:600, marginBottom:'8px' }}>{t('officeHours')}</h4>
                <p style={{ fontSize:'14px', marginBottom:'16px' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p style={{ fontSize:'14px', marginBottom:'16px' }}>Saturday: 10:00 AM - 4:00 PM</p>
                <p style={{ fontSize:'14px', marginBottom:'8px' }}>Sunday: Closed</p>
                
                <h4 style={{ fontSize:'14px', fontWeight:600, marginBottom:'8px', marginTop:'16px' }}>{t('responseTime')}</h4>
                <p style={{ fontSize:'14px' }}>Within 24 hours for all inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <StickyContact />
      </div>
    </>
  )
}
