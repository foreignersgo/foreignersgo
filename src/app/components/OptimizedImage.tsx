'use client'

import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  sizes?: string
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  priority = false,
  sizes = '100vw'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div className={className} style={{ ...style, position: 'relative' }}>
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            animation: 'shimmer 2s infinite',
          }}
        />
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}
