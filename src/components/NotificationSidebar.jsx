import React, { useEffect, useState } from 'react'
import { useNotifications } from '../context/NotificationContext'
import { X, Bug, UserPlus, Radio } from 'lucide-react'
import data from '../data/orders.json'

const NotificationSidebar = () => {
  const { isOpen, toggleNotifications } = useNotifications()
  const [colors, setColors] = useState({})

  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      setColors({
        background: rootStyles.getPropertyValue('--background').trim() || '#ffffff',
        foreground: rootStyles.getPropertyValue('--card-foreground').trim() || '#111827',
        border: rootStyles.getPropertyValue('--border').trim() || '#e5e7eb',
        textSecondary: rootStyles.getPropertyValue('--text-secondary').trim() || '#6b7280',
        textTertiary: rootStyles.getPropertyValue('--text-tertiary').trim() || '#9ca3af',
        hoverBg: rootStyles.getPropertyValue('--hover-bg').trim() || '#f3f4f6',
        muted: rootStyles.getPropertyValue('--muted').trim() || '#f3f4f6',
      })
    }

    updateColors()

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <aside
      className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out border-l ${
        isOpen ? 'w-80' : 'w-0'
      }`}
      style={{
        borderColor: colors.border,
        backgroundColor: colors.background,
      }}
      aria-hidden={!isOpen}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: colors.border }}
        >
          <h2 
            className="text-lg font-semibold"
            style={{ color: colors.foreground }}
          >
            Notifications
          </h2>
          <button
            onClick={toggleNotifications}
            className="transition-colors"
            style={{ color: colors.textSecondary }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.foreground}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
            aria-label="Close notifications"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable sections */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)]" style={{scrollbarWidth:'none'}}>
          {/* 🔔 Notifications */}
          <section>
            <h3 
              className="text-sm font-semibold mb-3"
              style={{ color: colors.textSecondary }}
            >
              Notifications
            </h3>
            <div className="space-y-3">
              {data.notifications.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-xl"
                    style={{ backgroundColor: colors.muted }}
                  >
                    {item.icon === 'bug' && <Bug size={16} style={{ color: colors.foreground }} />}
                    {item.icon === 'user' && <UserPlus size={16} style={{ color: colors.foreground }} />}
                    {item.icon === 'radio' && <Radio size={16} style={{ color: colors.foreground }} />}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: colors.foreground }}
                    >
                      {item.title}
                    </p>
                    <span 
                      className="text-xs"
                      style={{ color: colors.textTertiary }}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ⚡ Activities */}
          <section>
            <h3 
              className="text-sm font-semibold mb-3"
              style={{ color: colors.textSecondary }}
            >
              Activities
            </h3>
            <div 
              className="relative ml-4 space-y-4"
              style={{ borderLeft: `1px solid ${colors.border}` }}
            >
              {data.activities.map((act, idx) => (
                <div key={idx} className="flex gap-3 items-start relative left-[-16px]">
                  <img
                    src={act.avatar}
                    alt={act.title}
                    className="w-8 h-8 rounded-full border"
                    style={{ 
                      borderColor: colors.border,
                      backgroundColor: colors.muted 
                    }}
                  />
                  <div>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: colors.foreground }}
                    >
                      {act.title}
                    </p>
                    <span 
                      className="text-xs"
                      style={{ color: colors.textTertiary }}
                    >
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 👥 Contacts */}
          <section>
            <h3 
              className="text-sm font-semibold mb-3"
              style={{ color: colors.textSecondary }}
            >
              Contacts
            </h3>
            <div className="space-y-2">
              {data.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: colors.foreground }}
                  >
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  )
}

export default NotificationSidebar