'use client'

import { useEffect } from 'react'

interface HiddenSEOProps {
  lang: string
}

export default function HiddenSEO({ lang }: HiddenSEOProps) {
  useEffect(() => {
    // Create hidden SEO content for ride hailing and taxi services
    const hiddenSEOContent = document.createElement('div')
    hiddenSEOContent.style.display = 'none'
    hiddenSEOContent.setAttribute('aria-hidden', 'true')
    
    // Mobile-specific SEO keywords and content
    const mobileSEOKeywords = {
      en: `
        mobile taxi app Guangzhou, taxi booking mobile, smartphone taxi Guangzhou,
        iPhone taxi app Guangzhou, Android taxi app Guangzhou, mobile ride hailing,
        Guangzhou taxi app download, mobile taxi booking China, taxi app for foreigners,
        mobile payment taxi Guangzhou, QR code taxi payment, WeChat taxi booking,
        Alipay taxi payment, mobile taxi rates, on-demand taxi app,
        real-time taxi tracking mobile, GPS taxi app Guangzhou, mobile taxi dispatch,
        smartphone airport transfer, mobile Canton Fair taxi, app-based taxi service,
        mobile-friendly taxi booking, English taxi app China, expat mobile taxi app,
        mobile taxi customer service, 24/7 mobile taxi support, instant taxi booking mobile,
        mobile taxi fare calculator, taxi app promotions mobile, discount taxi mobile app,
        Guangzhou mobile transportation, ride sharing mobile app, taxi mobile payment options,
        mobile taxi reviews, taxi app ratings mobile, reliable mobile taxi service
      `,
      zh: `
        手机打车广州, 手机出租车应用, 广州移动打车, 微信打车广州,
        支付宝打车, 手机预约出租车, 广州打车软件下载, 外国人手机打车,
        手机支付车费, 手机二维码打车, 实时打车追踪, 手机叫车应用,
        手机机场接送, 手机广交会打车, 手机打车优惠, 移动支付出租车,
        手机打车客服, 24小时手机打车, 即时手机叫车, 手机打车计价器,
        手机打车评价, 打车软件评分, 可靠手机打车服务
      `,
      es: `
        aplicación móvil taxi Guangzhou, reserva taxi móvil, smartphone taxi Guangzhou,
        app taxi iPhone Guangzhou, app taxi Android Guangzhou, ride hailing móvil,
        descarga app taxi Guangzhou, reserva taxi móvil China, app taxi para extranjeros,
        pago móvil taxi Guangzhou, código QR taxi, WeChat taxi móvil, Alipay taxi móvil,
        tarifas taxi móvil, taxi app bajo demanda, seguimiento GPS taxi móvil,
        transporte móvil aeropuerto, taxi móvil Feria de Cantón, app-based taxi móvil,
        servicio taxi móvil amigable, app taxi inglés China, app móvil taxi expat,
        servicio cliente taxi móvil, soporte taxi móvil 24/7, reserva instantánea taxi móvil
      `,
      fr: `
        application mobile taxi Guangzhou, réservation taxi mobile, smartphone taxi Guangzhou,
        app taxi iPhone Guangzhou, app taxi Android Guangzhou, ride hailing mobile,
        téléchargement app taxi Guangzhou, réservation taxi mobile Chine, app taxi étrangers,
        paiement mobile taxi Guangzhou, code QR taxi, WeChat taxi mobile, Alipay taxi mobile,
        tarifs taxi mobile, taxi app à la demande, suivi GPS taxi mobile,
        transport mobile aéroport, taxi mobile Foire de Canton, app-based taxi mobile,
        service taxi mobile convivial, app taxi anglais Chine, app mobile taxi expat
      `,
      ru: `
        мобильное приложение такси Гуанчжоу, заказ такси мобильный, смартфон такси Гуанчжоу,
        приложение такси iPhone Гуанчжоу, приложение такси Android Гуанчжоу, ride hailing мобильный,
        скачать приложение такси Гуанчжоу, заказ такси мобильный Китай, приложение такси для иностранцев,
        мобильная оплата такси Гуанчжоу, QR-код такси, WeChat такси мобильный, Alipay такси мобильный,
        тарифы такси мобильный, такси приложение по требованию, отслеживание GPS такси мобильный,
        мобильный транспорт аэропорт, такси мобильный Кантонская ярмарка, приложение такси мобильный
      `,
      de: `
        mobile Taxi App Guangzhou, Taxi Buchung mobil, Smartphone Taxi Guangzhou,
        Taxi App iPhone Guangzhou, Taxi App Android Guangzhou, Ride Hailing mobil,
        Taxi App Download Guangzhou, Taxi Buchung mobil China, Taxi App für Ausländer,
        mobile Taxizahlung Guangzhou, QR-Code Taxi, WeChat Taxi mobil, Alipay Taxi mobil,
        Taxitarife mobil, Taxi App auf Anfrage, GPS-Tracking Taxi mobil,
        mobiler Flughafentransfer, Taxi mobil Kanton Messe, App-basierter Taxi mobil
      `,
      ar: `
        تطبيق تاكسي محمول غوانزو, حجز تاكسي محمول, هاتف ذكي تاكسي غوانزو,
        تطبيق تاكسي آيفون غوانزو, تطبيق تاكسي أندرويد غوانزو, استدعاء سيارة محمول,
        تحميل تطبيق تاكسي غوانزو, حجز تاكسي محمول الصين, تطبيق تاكسي للأجانب,
        دفع محمول تاكسي غوانزو, رمز QR تاكسي, WeChat تاكسي محمول, Alipay تاكسي محمول,
        أسعار تاكسي محمول, تطبيق تاكسي عند الطلب, تتبع GPS تاكسي محمول,
        نقل محمول مطار, تاكسي محمول معرض كانتون, تطبيق تاكسي محمول
      `,
      am: `
        ሞልተሎን ታክሲ ጓዋንዞው, ሞልተሎን ታክሲ መያዣ, ስማርትፎን ታክሲ ጓዋንዞው,
        iPhone ታክሲ አፕሊኬሽን ጓዋንዞው, Android ታክሲ አፕሊኬሽን ጓዋንዞው, ሞልተሎን ስማርትፎን,
        ሞልተሎን ታክሲ ዳውንሎድ ጓዋንዞው, ሞልተሎን ታክሲ መያዣ ቻይና, ሞልተሎን ታክሲ ለውጅዎች,
        ሞልተሎን ታክሲ ክፍውን ጓዋንዞው, QR ኮድ ታክሲ, WeChat ሞልተሎን ታክሲ, Alipay ሞልተሎን ታክሲ,
        ሞልተሎን ታክሲ ዋጋር, በጥይታ ሞልተሎን ታክሲ, GPS ትራንስፖርት ሞልተሎን ታክሲ
      `
    }

    // Taxi and ride hailing keywords in multiple languages
    const taxiKeywords = {
      en: `
        taxi Guangzhou airport, Guangzhou taxi service, airport taxi Guangzhou, 
        taxi from Guangzhou airport to city, Guangzhou airport taxi booking,
        ride hailing Guangzhou, Didi Guangzhou, Uber Guangzhou, 
        Guangzhou taxi app, Chinese taxi service, airport transfer Guangzhou,
        Guangzhou cab service, taxi fare Guangzhou, cheap taxi Guangzhou,
        Guangzhou airport transportation, taxi to Canton Fair, Canton Fair taxi,
        Guangzhou hotel taxi, taxi from hotel to airport, reliable taxi Guangzhou,
        English speaking taxi Guangzhou, foreigner taxi Guangzhou, expat taxi service,
        Guangzhou taxi number, call taxi Guangzhou, book taxi online Guangzhou,
        Guangzhou taxi rates, airport pickup taxi, drop off taxi Guangzhou,
        taxi to Guangzhou city center, taxi to Tianhe, taxi to Baiyun,
        Guangzhou night taxi, 24/7 taxi Guangzhou, emergency taxi Guangzhou,
        taxi for business travelers, corporate taxi Guangzhou, group taxi Guangzhou,
        luxury taxi Guangzhou, VIP taxi service, professional taxi driver,
        Guangzhou taxi guide, how to take taxi in Guangzhou, taxi payment methods,
        taxi tips Guangzhou, safe taxi Guangzhou, licensed taxi Guangzhou
      `,
      zh: `
        广州出租车, 广州机场出租车, 广州打车服务, 机场到市区出租车,
        滴滴出行广州, 广州网约车, 广州出租车预约, 广州机场接送,
        广交会出租车, 广州酒店出租车, 广州出租车电话, 广州叫车,
        广州出租车价格, 广州夜班出租车, 广州24小时出租车,
        外国人打车广州, 英语司机广州, 广州商务出租车,
        广州豪华出租车, 广州VIP出租车, 广州出租车指南,
        如何在广州打车, 广州出租车支付方式, 广州安全出租车
      `,
      es: `
        taxi Guangzhou, servicio taxi Guangzhou, taxi aeropuerto Guangzhou,
        ride hailing Guangzhou, Didi Guangzhou, reserva taxi Guangzhou,
        transporte aeropuerto Guangzhou, taxi a Feria de Cantón, taxi hotel Guangzhou,
        taxi nocturno Guangzhou, taxi 24 horas Guangzhou, taxi extranjeros Guangzhou,
        taxi VIP Guangzhou, taxi negocios Guangzhou, guía taxi Guangzhou,
        cómo tomar taxi Guangzhou, métodos pago taxi Guangzhou
      `,
      fr: `
        taxi Guangzhou, service taxi Guangzhou, taxi aéroport Guangzhou,
        ride hailing Guangzhou, réservation taxi Guangzhou, transport aéroport Guangzhou,
        taxi Foire de Canton, taxi hôtel Guangzhou, taxi nuit Guangzhou,
        taxi 24h Guangzhou, taxi étrangers Guangzhou, taxi VIP Guangzhou,
        guide taxi Guangzhou, comment prendre taxi Guangzhou
      `,
      ru: `
        такси Гуанчжоу, служба такси Гуанчжоу, такси аэропорт Гуанчжоу,
        вызов такси Гуанчжоу, Didi Гуанчжоу, бронирование такси Гуанчжоу,
        транспорт аэропорт Гуанчжоу, такси Кантонская ярмарка, такси отель Гуанчжоу,
        ночное такси Гуанчжоу, такси 24 часа Гуанчжоу, такси для иностранцев,
        VIP такси Гуанчжоу, бизнес такси Гуанчжоу, гид по такси Гуанчжоу
      `,
      de: `
        Taxi Guangzhou, Taxidienst Guangzhou, Flughafen Taxi Guangzhou,
        Taxi bestellen Guangzhou, Didi Guangzhou, Flughafentransfer Guangzhou,
        Taxi Kanton Messe, Taxi Hotel Guangzhou, Nacht Taxi Guangzhou,
        24/7 Taxi Guangzhou, Taxi für Ausländer, VIP Taxi Guangzhou,
        Geschäftstaxi Guangzhou, Taxi Guide Guangzhou
      `,
      ar: `
        تاكسي غوانزو, خدمة تاكسي غوانزو, تاكسي مطار غوانزو,
        استدعاء تاكسي غوانزو, حجز تاكسي غوانزو, نقل مطار غوانزو,
        تاكسي معرض كانتون, تاكسي فندق غوانزو, تاكسي ليلي غوانزو,
        تاكسي 24 ساعة غوانزو, تاكسي للأجانب, تاكسي VIP غوانزو,
        تاكسي أعمال غوانزو, دليل تاكسي غوانزو
      `,
      am: `
        ታክሲ ጓዋንዞው, የታክሲ አገልግሎት ጓዋንዞው, የአየርማሽ ታክሲ ጓዋንዞው,
        ታክሲ መጥራት ጓዋንዞው, ዲዲ ጓዋንዞው, ታክሲ መያዣ ጓዋንዞው,
        የአየርማሽ ትራንስፖርት ጓዋንዞው, ታክሲ ካንቶን ፈር, ታክሲ ሆቴል ጓዋንዞው,
        የሌሊት ታክሲ ጓዋንዞው, 24 ሰዓት ታክሲ ጓዋንዞው, ለውጅዎች ታክሲ ጓዋንዞው,
        VIP ታክሲ ጓዋንዞው, የንጋዜ ታክሲ ጓዋንዞው, መርማር ታክሲ ጓዋንዞው
      `
    }

    hiddenSEOContent.innerHTML = `
      <div id="hidden-seo-content" lang="${lang}">
        <h1>Taxi and Ride Hailing Services Guangzhou</h1>
        <h2>Professional Airport Transfer Services</h2>
        <h3>Guangzhou Taxi Services for Foreigners</h3>
        <h4>Ride Hailing Apps in China</h4>
        <h5>Airport Pickup and Drop-off</h5>
        <h6>Business Travel Transportation</h6>
        <p>${taxiKeywords[lang as keyof typeof taxiKeywords] || taxiKeywords.en}</p>
        
        <h1>Mobile Taxi App Guangzhou - Smartphone Booking</h1>
        <h2>Mobile Taxi Booking Services</h2>
        <h3>iPhone and Android Taxi Apps</h3>
        <h4>Mobile Payment and QR Code Taxi</h4>
        <h5>Real-time Taxi Tracking Mobile</h5>
        <h6>24/7 Mobile Taxi Support</h6>
        <p>${mobileSEOKeywords[lang as keyof typeof mobileSEOKeywords] || mobileSEOKeywords.en}</p>
        
        <h2>How to Book Taxi in Guangzhou</h2>
        <p>Book reliable taxi services in Guangzhou for airport transfers, Canton Fair visits, hotel pickups, and business travel. English-speaking drivers available, 24/7 service, competitive rates, and professional transportation solutions for foreigners and expats in Guangzhou, China. Mobile booking apps available for instant taxi reservations with real-time tracking and secure payment options.</p>
        
        <h2>Mobile Taxi App Features</h2>
        <p>Download our mobile taxi app for Guangzhou with features including real-time GPS tracking, secure mobile payments via WeChat Pay and Alipay, QR code scanning for quick payments, English language support for foreigners, instant booking confirmation, fare estimation, driver ratings, and 24/7 customer support. Available for both iPhone and Android devices with optimized mobile experience for seamless taxi booking in Guangzhou.</p>
        
        <h2>Guangzhou Airport Taxi Services</h2>
        <p>Premier taxi and ride hailing services from Guangzhou Baiyun International Airport to city center, hotels, Canton Fair venue, and business districts. Professional drivers, fixed rates, luggage assistance, and comfortable vehicles for international travelers and business visitors to Guangzhou. Mobile app booking available for instant airport pickup with real-time flight tracking and driver communication.</p>
        
        <h2>Canton Fair Transportation</h2>
        <p>Specialized taxi and transportation services for Canton Fair attendees. Reliable airport pickup, hotel to fair venue transfers, daily transportation, and business meeting travel. Multi-lingual drivers, VIP service, and group transportation options for international buyers and exhibitors. Mobile booking platform for convenient scheduling and real-time updates during Canton Fair periods.</p>
        
        <h2>Ride Hailing Apps China</h2>
        <p>Complete guide to using ride hailing apps in China including Didi Chuxing, local taxi booking, payment methods, and tips for foreigners. Setup assistance, app installation, and reliable transportation solutions for expats and visitors in Guangzhou. Mobile-friendly interfaces with English language support and international payment options for seamless ride hailing experience.</p>
        
        <h2>Business Travel Taxi Services</h2>
        <p>Professional taxi and transportation services for business travelers in Guangzhou. Corporate accounts, priority service, luxury vehicles, English-speaking drivers, and reliable transportation for meetings, conferences, and business engagements throughout Guangzhou and surrounding areas. Mobile booking platform with corporate dashboard for expense tracking and management.</p>
        
        <h2>24/7 Emergency Taxi Services</h2>
        <p>Round-the-clock taxi services for emergencies, late-night travel, and urgent transportation needs in Guangzhou. Reliable service, quick response times, professional drivers, and safe transportation solutions for foreigners and expats in Guangzhou, China. Mobile app emergency booking feature with priority dispatch and real-time tracking for urgent situations.</p>
        
        <h2>Mobile Payment Solutions</h2>
        <p>Comprehensive mobile payment options for taxi services in Guangzhou including WeChat Pay, Alipay, international credit cards, and cash alternatives. QR code payment systems, digital wallet integration, and secure mobile transactions for foreign visitors. Easy setup process with English instructions and 24/7 payment support for international customers.</p>
        
        <h2>Taxi App for Foreigners</h2>
        <p>Specialized taxi booking application designed for foreigners and expats in Guangzhou with English language interface, international payment support, multilingual customer service, and location-based services. Features include destination translation, fare estimation in multiple currencies, and cultural tips for taxi travel in China. Optimized for international travelers with VPN-compatible functionality.</p>
      </div>
    `

    // Add to document body
    document.body.appendChild(hiddenSEOContent)

    return () => {
      // Cleanup on unmount
      if (document.body.contains(hiddenSEOContent)) {
        document.body.removeChild(hiddenSEOContent)
      }
    }
  }, [lang])

  return null
}
