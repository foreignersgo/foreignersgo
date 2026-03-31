'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'

interface StickyContactProps {
  showStickyWidget?: boolean
  menuOpen?: boolean
  showWeChatModal?: boolean
  setShowWeChatModal?: (show: boolean) => void
  contact?: (method: string) => void
}

export default function StickyContact({ 
  showStickyWidget = true, 
  menuOpen = false, 
  showWeChatModal = false,
  setShowWeChatModal = () => {},
  contact = () => {}
}: StickyContactProps) {
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setPortalReady(true)
  }, [])

 const handleContact = (p: string) => {
  const msg = encodeURIComponent('Hello! I would like to book a service with ForeignersGO. Please assist me with my travel needs to China.')
  
  if (p === 'whatsapp') {
    window.open(`https://wa.me/8619584750412?text=${msg}`, '_blank')
  } else if (p === 'telegram') {
    // For Telegram, use ?text= parameter for message
    window.open(`https://t.me/+8619584750412?text=${msg}`, '_blank')
  } else if (p === 'wechat') {
    setShowWeChatModal(true)
  }
}

  return (
    <>
      {portalReady && showStickyWidget && !menuOpen && !showWeChatModal && createPortal(
        <div
          className="fg-sticky-widget"
          style={{
            position:'fixed',
            left:'auto',
            right:'max(18px, env(safe-area-inset-right, 0px))',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            flexWrap:'nowrap',
            zIndex:2147482647,
          }}>
          <div className="fg-sticky-orbits" style={{ display:'flex', flexDirection:'column', alignItems:'center', flexWrap:'nowrap', gap:'8px' }}>
            {[
              { p:'whatsapp', bg:'#25D366', icon:'/foreignersgo_whatsapp.png' },
              { p:'telegram', bg:'#0088CC', icon:'/foreignersgo_telegram.png' },
              { p:'wechat',   bg:'#07C160', icon:'/foreignersgo_wechat.png' },
            ].map(({ p, bg, icon }) => (
              <div
                key={p}
                role="button"
                tabIndex={0}
                className="fg-sticky-orbit"
                onClick={() => handleContact(p)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleContact(p) } }}
                style={{
                  background:bg,
                  color:'#fff',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  cursor:'pointer',
                  fontSize:'10px',
                  fontWeight:700,
                  transition:'all .3s',
                  border:'2px solid rgba(255,255,255,0.3)',
                  padding:'0',
                  width:'48px',
                  height:'48px',
                  borderRadius:'50%',
                }}
                onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.transform='translateY(-3px) scale(1.05)'; 
                  (e.currentTarget as HTMLElement).style.boxShadow=`0 8px 24px ${bg}60`;
                  (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.6)';
                  (e.currentTarget as HTMLElement).style.background=bg;
                }}
                onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.transform='translateY(0) scale(1)'; 
                  (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 12px ${bg}40`;
                  (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.background=bg;
                }}>
                <img 
                  src={icon} 
                  alt={p}
                  style={{
                    width:'24px',
                    height:'24px',
                    filter:'brightness(0) invert(1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
