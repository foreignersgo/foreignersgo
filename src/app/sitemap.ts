import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://foreignersgo.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          zh: `${baseUrl}/zh`,
          es: `${baseUrl}/es`,
          fr: `${baseUrl}/fr`,
          ru: `${baseUrl}/ru`,
          de: `${baseUrl}/de`,
          ar: `${baseUrl}/ar`,
          am: `${baseUrl}/am`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about/en`,
          zh: `${baseUrl}/about/zh`,
          es: `${baseUrl}/about/es`,
          fr: `${baseUrl}/about/fr`,
          ru: `${baseUrl}/about/ru`,
          de: `${baseUrl}/about/de`,
          ar: `${baseUrl}/about/ar`,
          am: `${baseUrl}/about/am`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/services/en`,
          zh: `${baseUrl}/services/zh`,
          es: `${baseUrl}/services/es`,
          fr: `${baseUrl}/services/fr`,
          ru: `${baseUrl}/services/ru`,
          de: `${baseUrl}/services/de`,
          ar: `${baseUrl}/services/ar`,
          am: `${baseUrl}/services/am`,
        },
      },
    },
    {
      url: `${baseUrl}/canton-fair`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/canton-fair/en`,
          zh: `${baseUrl}/canton-fair/zh`,
          es: `${baseUrl}/canton-fair/es`,
          fr: `${baseUrl}/canton-fair/fr`,
          ru: `${baseUrl}/canton-fair/ru`,
          de: `${baseUrl}/canton-fair/de`,
          ar: `${baseUrl}/canton-fair/ar`,
          am: `${baseUrl}/canton-fair/am`,
        },
      },
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/destinations/en`,
          zh: `${baseUrl}/destinations/zh`,
          es: `${baseUrl}/destinations/es`,
          fr: `${baseUrl}/destinations/fr`,
          ru: `${baseUrl}/destinations/ru`,
          de: `${baseUrl}/destinations/de`,
          ar: `${baseUrl}/destinations/ar`,
          am: `${baseUrl}/destinations/am`,
        },
      },
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/resources/en`,
          zh: `${baseUrl}/resources/zh`,
          es: `${baseUrl}/resources/es`,
          fr: `${baseUrl}/resources/fr`,
          ru: `${baseUrl}/resources/ru`,
          de: `${baseUrl}/resources/de`,
          ar: `${baseUrl}/resources/ar`,
          am: `${baseUrl}/resources/am`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/contact/en`,
          zh: `${baseUrl}/contact/zh`,
          es: `${baseUrl}/contact/es`,
          fr: `${baseUrl}/contact/fr`,
          ru: `${baseUrl}/contact/ru`,
          de: `${baseUrl}/contact/de`,
          ar: `${baseUrl}/contact/ar`,
          am: `${baseUrl}/contact/am`,
        },
      },
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/booking/en`,
          zh: `${baseUrl}/booking/zh`,
          es: `${baseUrl}/booking/es`,
          fr: `${baseUrl}/booking/fr`,
          ru: `${baseUrl}/booking/ru`,
          de: `${baseUrl}/booking/de`,
          ar: `${baseUrl}/booking/ar`,
          am: `${baseUrl}/booking/am`,
        },
      },
    },
  ]
}
