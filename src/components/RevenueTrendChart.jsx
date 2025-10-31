import React from 'react';
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
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Period',
        data: [10, 15, 8, 20, 12, 25],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
      {
        label: 'Previous Period',
        data: [8, 12, 10, 15, 18, 16],
        borderColor: '#e5e7eb',
        backgroundColor: 'rgba(229, 231, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
        borderDash: [5, 5],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        titleFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: '600'
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.raw}k`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          callback: function(value) {
            return value + 'M';
          },
          maxTicksLimit: 5
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="h-[300px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueTrendChart;