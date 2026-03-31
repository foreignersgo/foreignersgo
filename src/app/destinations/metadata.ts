import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Guangzhou | Best Destinations & Attractions | ForeignersGO',
  description: 'Discover the best destinations in Guangzhou: Canton Fair, cultural sites, dining, shopping, nightlife, and nature spots. Complete guide for foreigners and expats in Guangzhou, China.',
  keywords: [
    'Guangzhou destinations', 'Guangzhou attractions', 'Canton Fair Guangzhou',
    'Guangzhou cultural sites', 'Guangzhou dining', 'Guangzhou shopping',
    'Guangzhou nightlife', 'Guangzhou nature spots', 'Guangzhou tourism',
    'expat Guangzhou guide', 'foreigner Guangzhou attractions', 'Guangzhou travel guide',
    'Guangzhou Canton Fair district', 'Guangzhou Baiyun Mountain', 'Guangzhou Tianhe CBD',
    'Guangzhou Pearl River', 'Guangzhou old town', 'Guangzhou markets',
    'Guangzhou museums', 'Guangzhou temples', 'Guangzhou parks'
  ].join(', '),
  openGraph: {
    title: 'Explore Guangzhou - Best Destinations & Attractions | ForeignersGO',
    description: 'Discover the best destinations in Guangzhou: Canton Fair, cultural sites, dining, shopping, nightlife, and nature spots. Complete guide for foreigners.',
    url: 'https://foreignersgo.com/destinations',
    images: [
      {
        url: 'https://foreignersgo.com/destinations-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Guangzhou Destinations by ForeignersGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Guangzhou - Best Destinations | ForeignersGO',
    description: 'Discover the best destinations in Guangzhou: Canton Fair, cultural sites, dining, shopping, nightlife, and nature spots for foreigners.',
    images: ['https://foreignersgo.com/destinations-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://foreignersgo.com/destinations',
    languages: {
      'en': 'https://foreignersgo.com/destinations/en',
      'zh': 'https://foreignersgo.com/destinations/zh',
      'es': 'https://foreignersgo.com/destinations/es',
      'fr': 'https://foreignersgo.com/destinations/fr',
      'ru': 'https://foreignersgo.com/destinations/ru',
      'de': 'https://foreignersgo.com/destinations/de',
      'ar': 'https://foreignersgo.com/destinations/ar',
      'am': 'https://foreignersgo.com/destinations/am',
    },
  },
}
