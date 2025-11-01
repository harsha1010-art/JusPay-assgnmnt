import React, { useEffect, useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ProjectionsChart = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const updateColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setColors({
        chartBar1: rootStyles.getPropertyValue('--chart-bar-1').trim() || '#A8C5DA',
        chartBar2: rootStyles.getPropertyValue('--chart-bar-2').trim() || 'rgba(168, 197, 218, 0.55)',
        textTertiary: rootStyles.getPropertyValue('--text-tertiary').trim() || '#9ca3af',
        border: rootStyles.getPropertyValue('--border').trim() || '#e5e7eb',
        primary: rootStyles.getPropertyValue('--primary').trim() || '#1f2937',
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

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Projections',
        data: [18, 22, 20, 24, 26, 30],
        backgroundColor: colors.chartBar1 || '#A8C5DA',
        borderRadius: 6,
        barThickness: 18,
        stack: 'stack1',
        barPercentage: 0.8,
      },
      {
        label: 'Actuals',
        data: [15, 20, 18, 22, 24, 28],
        backgroundColor: colors.chartBar2 || 'rgba(168, 197, 218, 0.55)',
        borderRadius: 6,
        barThickness: 18,
        stack: 'stack1',
        categoryPercentage: 0.9,
        barPercentage: 0.8,
      },
    ],
  }), [colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: colors.primary || '#1f2937',
        titleColor: '#000000ff',
        bodyColor: '#000000ff',
        borderColor: colors.border || '#e5e7eb',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { 
          color: colors.textTertiary || '#9ca3af',
          font: { size: 12 }
        },
      },
      y: {
        stacked: true,
        grid: { 
          color: colors.border || '#e5e7eb',
          drawBorder: false
        },
        ticks: { 
          color: colors.textTertiary || '#9ca3af',
          font: { size: 12 }
        },
      },
    },
  }), [colors]);

  return (
    <div className="bg-card rounded-xl  overflow-hidden h-full p-4" role="region" aria-labelledby="projections-heading">
      <div className="flex items-center justify-between mb-2">
        <h3 id="projections-heading" className="text-sm font-medium text-primary">Projections vs Actuals</h3>
      </div>
      <figure className="h-[calc(100%-32px)]" role="img" aria-label="Bar chart comparing projections vs actuals">
        <figcaption className="sr-only">Bar chart comparing projections and actual values across months.</figcaption>
        {colors.chartBar1 && <Bar options={options} data={data} />}
      </figure>
    </div>
  )
}

export default ProjectionsChart