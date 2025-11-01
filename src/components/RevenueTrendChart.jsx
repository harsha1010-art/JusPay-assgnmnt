import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueTrendChart = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setColors({
        chartBar1: rootStyles.getPropertyValue('--chart-bar-1').trim() || '#A8C5DA',
        foreground: rootStyles.getPropertyValue('--foreground').trim() || '#111827',
        muted: rootStyles.getPropertyValue('--muted').trim() || '#f3f4f6',
        primary: rootStyles.getPropertyValue('--primary').trim() || '#1f2937',
        primaryForeground: rootStyles.getPropertyValue('--primary-foreground').trim() || '#f9fafb',
        border: rootStyles.getPropertyValue('--border').trim() || '#e5e7eb',
        textTertiary: rootStyles.getPropertyValue('--text-tertiary').trim() || '#9ca3af',
        secondary: rootStyles.getPropertyValue('--secondary').trim() || '#f3f4f6',
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

  const data = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Period',
        data: [10, 15, 8, 20, 12, 25],
        borderColor: colors.chartBar1 || '#A8C5DA',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
      {
        label: 'Previous Period',
        data: [8, 12, 10, 15, 18, 16],
        borderColor: colors.foreground || '#111827',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  }), [colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: colors.primary || '#1f2937',
        titleColor: colors.primaryForeground || '#f9fafb',
        bodyColor: colors.primaryForeground || '#f9fafb',
        borderColor: colors.border || '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw}k`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: colors.textTertiary || '#9ca3af',
          font: { size: 12, family: "'Inter', sans-serif" },
        },
      },
      y: {
        grid: { 
          color: colors.border ? `${colors.border}40` : '#e5e7eb40',
          drawBorder: false 
        },
        ticks: {
          color: colors.textTertiary || '#9ca3af',
          callback: (value) => `${value}M`,
          maxTicksLimit: 5,
        },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  }), [colors]);

  return (
    <figure className="h-[300px] w-full" role="img" aria-label="Revenue trend line chart">
      <figcaption className="sr-only">Line chart showing revenue trend over months</figcaption>
      {colors.chartBar1 && <Line data={data} options={options} />}
    </figure>
  );
};

export default RevenueTrendChart;