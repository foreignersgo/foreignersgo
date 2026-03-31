'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'Event'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data if any
    const existingScript = document.querySelector('script[data-structured-data="true"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    }

    // Add to document head
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-structured-data', 'true')
    script.textContent = JSON.stringify(structuredData, null, 2)
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[data-structured-data="true"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [type, data])

  return null
}
