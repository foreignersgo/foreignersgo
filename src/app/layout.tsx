import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

// SEO Keywords for China, Canton Fair, Guangzhou services
const SEO_KEYWORDS = [
  // Core Keywords
  "China travel services", "Guangzhou airport pickup", "Canton Fair 2026", "business in China",
  "halal food in China", "China tour guide", "foreigner services China", "Guangzhou concierge",
  
  // Canton Fair Specific
  "Canton Fair 2026 dates", "139th Canton Fair", "Canton Fair accommodation", "Canton Fair transport",
  "Canton Fair translation", "Canton Fair visa", "Canton Fair hotel booking", "Canton Fair guide",
  
  // Guangzhou Services
  "Guangzhou airport transfer", "Guangzhou SIM card", "Guangzhou hotel booking", "Guangzhou tour",
  "Guangzhou business services", "Guangzhou visa assistance", "Guangzhou halal restaurants",
  
  // China Travel
  "China travel guide", "China airport pickup", "China visa services", "China accommodation",
  "China business travel", "China expat services", "China tourism", "China digital services",
  
  // International Keywords
  "foreigner China", "expat China", "international travel China", "China business support",
  "China arrival services", "China landing services", "China travel assistance"
];

export const metadata: Metadata = {
  title: {
    default: "ForeignersGo - Premium Travel Concierge Guangzhou | Canton Fair 2026 Services",
    template: "%s | ForeignersGo - China Travel & Business Services"
  },
  description: "Premium travel concierge services in Guangzhou, China. Specializing in Canton Fair 2026, airport pickup, halal food tours, visa assistance, and business support. VIP transport, 5G SIM setup, and digital landing services for foreigners visiting China.",
  keywords: SEO_KEYWORDS.join(", "),
  authors: [{ name: "ForeignersGo Team" }],
  creator: "ForeignersGo",
  publisher: "ForeignersGo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://foreignersgo.com',
    title: 'ForeignersGo - Premium China Travel & Canton Fair Services',
    description: 'Complete travel and business services in Guangzhou, China. Canton Fair 2026 specialists, airport pickup, halal food tours, visa assistance, and more.',
    siteName: 'ForeignersGo',
    images: [
      {
        url: '/foreignersgologo.png',
        width: 1200,
        height: 630,
        alt: 'ForeignersGo - China Travel Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForeignersGo - China Travel & Canton Fair Services',
    description: 'Premium concierge services in Guangzhou, China. Canton Fair 2026 specialists, airport pickup, halal tours, visa assistance.',
    images: ['/foreignersgologo.png'],
  },
  icons: {
    icon: "/foreignersgologo.png",
    shortcut: "/foreignersgologo.png",
    apple: "/foreignersgologo.png",
  },
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://foreignersgo.com',
    languages: {
      'en': 'https://foreignersgo.com/en',
      'zh': 'https://foreignersgo.com/zh',
      'es': 'https://foreignersgo.com/es',
      'fr': 'https://foreignersgo.com/fr',
      'ru': 'https://foreignersgo.com/ru',
      'de': 'https://foreignersgo.com/de',
      'ar': 'https://foreignersgo.com/ar',
      'am': 'https://foreignersgo.com/am',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
