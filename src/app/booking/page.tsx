'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import StickyContact from '../components/StickyContact'
import HiddenSEO from '../components/HiddenSEO'
import '../components/StickyContact.css'
import BookingEngine from "@/components/booking/BookingEngine";

// ── TRANSLATION DATA ──────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  en: {
    bookNow: 'Book Now', backToHome: 'Back to Home',
  },
  zh: {
    bookNow: '立即预订', backToHome: '返回首页',
  },
  es: {
    bookNow: 'Reservar Ahora', backToHome: 'Volver al Inicio',
  },
  fr: {
    bookNow: 'Réserver Maintenant', backToHome: 'Retour à l\'Accueil',
  },
  ru: {
    bookNow: 'Забронировать Сейчас', backToHome: 'Вернуться на главную',
  },
  de: {
    bookNow: 'Jetzt Buchen', backToHome: 'Zurück zur Startseite',
  },
  ar: {
    bookNow: 'احجز الآن', backToHome: 'العودة إلى الصفحة الرئيسية',
  },
  am: {
    bookNow: 'አሁዝን', backToHome: 'ወደ ወደ ገጽ',
  },
}

export default function BookingPage() {
  const [lang, setLang] = useState('en')
  
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

  const t = (k: string) => T[lang]?.[k] ?? T['en'][k] ?? k

  return (
    <>
      <HiddenSEO lang={lang} />
      <Navigation 
        lang={lang} 
        isScrolled={false}
        onLanguageChange={handleLanguageChange}
        onContact={handleContact}
      />
      <BookingEngine />
      <Footer lang={lang} />
      <StickyContact />
    </>
  );
}
