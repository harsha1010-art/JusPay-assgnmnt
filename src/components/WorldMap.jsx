import React, { useEffect, useState } from "react";

const RevenueByLocation = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setColors({
        foreground: rootStyles.getPropertyValue('--foreground').trim() || '#111827',
        background: rootStyles.getPropertyValue('--background').trim() || '#f9fafb',
        border: rootStyles.getPropertyValue('--border').trim() || '#e5e7eb',
        chartBar1: rootStyles.getPropertyValue('--chart-bar-1').trim() || '#A8C5DA',
        textSecondary: rootStyles.getPropertyValue('--text-secondary').trim() || '#6b7280',
        textPrimary: rootStyles.getPropertyValue('--text-primary').trim() || '#111827',
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

  const locations = [
    { city: "New York", value: 72 },
    { city: "San Francisco", value: 39 },
    { city: "Sydney", value: 25 },
    { city: "Singapore", value: 61 },
  ];

  // Positions of dots (approximate % based on map image)
  const dots = [
    { top: "38%", left: "32%" }, // New York
    { top: "40%", left: "26%" }, // San Francisco
    { top: "75%", left: "83%" }, // Sydney
    { top: "52%", left: "78%" }, // Singapore
  ];

  return (
    <div className="bg-card rounded-2xl  p-6 w-[100%]" role="region" aria-labelledby="revenue-location-heading">
      <h3 id="revenue-location-heading" className="text-base font-semibold text-primary mb-4">
        Revenue by Location
      </h3>

      {/* 🌍 World Map */}
      <div className="relative w-full h-40 mb-6">
        <img
          src="/world-map.svg"
          alt="World map showing revenue hotspots"
          className="w-full h-full object-contain opacity-80"
        />
        {dots.map((dot, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="absolute w-3 h-3 rounded-full shadow-sm"
            style={{
              top: dot.top,
              left: dot.left,
              transform: "translate(-50%, -50%)",
              backgroundColor: colors.foreground || '#111827',
              border: `3px solid ${colors.background || '#f9fafb'}`
            }}
          ></div>
        ))}
        <div className="sr-only">Map visualization showing revenue hotspots by city.</div>
      </div>

      {/* 📊 City List */}
      <div className="space-y-4">
        {locations.map((loc) => (
          <div key={loc.city}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm" style={{ color: colors.textSecondary || '#6b7280' }}>
                {loc.city}
              </span>
              <span className="text-sm font-medium" style={{ color: colors.textPrimary || '#111827' }}>
                {loc.value}K
              </span>
            </div>
            <div 
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: colors.border || '#e5e7eb' }}
            >
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(loc.value / 80) * 100}%`, 
                  backgroundColor: colors.chartBar1 || '#A8C5DA'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByLocation;