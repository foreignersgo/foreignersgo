'use client'

import Head from 'next/head'
import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  alternateUrls?: Record<string, string>
  structuredData?: Record<string, any>
}

export default function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  canonical, 
  alternateUrls = {},
  structuredData 
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title
    }

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (metaDesc) {
      metaDesc.content = description || ''
    } else {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      metaDesc.content = description || ''
      document.head.appendChild(metaDesc)
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement
    if (metaKeywords) {
      metaKeywords.content = keywords.join(', ')
    } else {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      metaKeywords.content = keywords.join(', ')
      document.head.appendChild(metaKeywords)
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonicalLink) {
      canonicalLink.href = canonical || window.location.href
    } else {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      canonicalLink.href = canonical || window.location.href
      document.head.appendChild(canonicalLink)
    }

    // Add hreflang tags for multilingual SEO
    Object.entries(alternateUrls).forEach(([lang, url]) => {
      let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement
      if (hreflangLink) {
        hreflangLink.href = url
      } else {
        hreflangLink = document.createElement('link')
        hreflangLink.rel = 'alternate'
        hreflangLink.hreflang = lang
        hreflangLink.href = url
        document.head.appendChild(hreflangLink)
      }
    })

    // Add structured data
    if (structuredData) {
      let structuredScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
      if (structuredScript) {
        structuredScript.textContent = JSON.stringify(structuredData, null, 2)
      } else {
        structuredScript = document.createElement('script')
        structuredScript.type = 'application/ld+json'
        structuredScript.textContent = JSON.stringify(structuredData, null, 2)
        document.head.appendChild(structuredScript)
      }
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical || window.location.href },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
    ]

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`) as HTMLMetaElement
      if (metaTag) {
        metaTag.setAttribute('content', tag.content || '')
      } else if (tag.content) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', tag.property)
        metaTag.setAttribute('content', tag.content)
        document.head.appendChild(metaTag)
      }
    })

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ]

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement
      if (metaTag) {
        metaTag.content = tag.content || ''
      } else if (tag.content) {
        metaTag = document.createElement('meta')
        metaTag.name = tag.name
        metaTag.content = tag.content
        document.head.appendChild(metaTag)
      }
    })

  }, [title, description, keywords, canonical, alternateUrls, structuredData])

  return null
}
