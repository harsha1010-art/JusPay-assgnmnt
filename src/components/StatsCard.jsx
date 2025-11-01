import React, { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsCard = ({ title, value, change, isPositive }) => {
  const [colors, setColors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setColors({
        statOrdersBg: rootStyles.getPropertyValue('--card').trim() || '#F7F9FB',
        statRevenueBg: rootStyles.getPropertyValue('--card').trim() || '#F7F9FB',
        statGrowthBg: rootStyles.getPropertyValue('--stat-growth-bg').trim() || '#E5ECF6',
        statDefaultBg: rootStyles.getPropertyValue('--stat-default-bg').trim() || '#E3F5FF',
        textSecondary: rootStyles.getPropertyValue('--text-secondary').trim() || '#6b7280',
        foreground: rootStyles.getPropertyValue('--foreground').trim() || '#111827',
        success: rootStyles.getPropertyValue('--success').trim() || '#10b981',
        ortext: rootStyles.getPropertyValue('--stat-or-tc-bg').trim() || '#000000ff',
        cgtext: rootStyles.getPropertyValue('--stat-cg-tc-bg').trim() || '#000000ff',
        error: rootStyles.getPropertyValue('--error').trim() || '#ef4444',
        border: '#000000',
      });
    };

    updateColors();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // 🎨 Set background color dynamically based on title
  let bgColor;
  let tcolor;

  if (title === 'Orders') {
    bgColor = colors.statOrdersBg;
    tcolor = colors.ortext;
  } else if (title === 'Revenue') {
    bgColor = colors.statRevenueBg;
    tcolor = colors.ortext;
  } else if (title === 'Growth') {
    bgColor = colors.statGrowthBg;
    tcolor = colors.cgtext;
  } else {
    bgColor = colors.statDefaultBg;
    tcolor = colors.cgtext;
  }

  const handleClick = () => {
    if (title === 'Orders') {
      navigate('/orders');
    }
  };

  const isClickable = title === 'Orders';

  return (
    <div
      className="rounded-xl border p-6 hover:shadow-sm transition-shadow"
      style={{ 
        backgroundColor: bgColor,
        borderColor: '#00000010',
        cursor: isClickable ? 'pointer' : 'default'
      }}
      onClick={handleClick}
      role={isClickable ? 'button' : 'region'}
      aria-label={isClickable ? `${title} stats - open orders` : `${title} stats`}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={e => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <span 
          className="text-sm font-medium"
          style={{ color: tcolor }}
        >
          {title}
        </span>
      </div>

      <div className="flex justify-between items-center text-2xl font-semibold">
        <div 
          className="value"
          style={{ color: tcolor }}
        >
          {value}
        </div>
        <div
          className="flex items-center gap-1 text-sm font-medium"
          style={{ color: isPositive ? colors.success : colors.error }}
        >
          {change}
          {isPositive ? (
            <TrendingUp size={16} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <TrendingDown size={16} strokeWidth={2.5} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;