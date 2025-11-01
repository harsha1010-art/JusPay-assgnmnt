import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip)

const TotalSalesDonut = () => {
  const [colors, setColors] = useState({})

  useEffect(() => {
    const root = getComputedStyle(document.documentElement)
    setColors({
      card: root.getPropertyValue('--card').trim(),
      donut1: root.getPropertyValue('--donut-1').trim() || '#111827',
      donut2: root.getPropertyValue('--donut-2').trim() || '#BAEDBD',
      donut3: root.getPropertyValue('--donut-3').trim() || '#95A4FC',
      donut4: root.getPropertyValue('--donut-4').trim() || '#B1E3FF',
      cardForeground: root.getPropertyValue('--card-foreground').trim() ,
    })
  }, [])

  const labels = ['Direct', 'Affiliate', 'Sponsored', 'E-mail']
  const values = [300.56, 135.18, 154.02, 48.96]

  // Use colors from state instead of hardcoded values
  const segmentColors = [
    colors.donut1 || '#111827',
    colors.donut2 || '#BAEDBD',
    colors.donut3 || '#95A4FC',
    colors.donut4 || '#B1E3FF',
  ]

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: segmentColors,
        borderWidth: 4,
        borderRadius: 6,
        spacing: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.donut1 || '#ecf0faff',
        titleColor:  '#ffffffff',
        bodyColor:  '#edeff1ff',
        displayColors: true,
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.formattedValue}`,
        },
      },
    },
  }

  const total = values.reduce((a, b) => a + b, 0)
  const mainValue = values[0]
  const percentage = ((mainValue / total) * 100).toFixed(1)

  return (
    <div className="bg-card rounded-2xl p-6 w-full" role="region" aria-labelledby="total-sales-heading">
      <h3 id="total-sales-heading" className="text-base font-semibold text-primary mb-4">Total Sales</h3>

      {/* Chart - wrap in figure with accessible label/description */}
      <figure className="relative flex justify-center items-center h-48 mb-6" role="img" aria-label={`Total sales donut chart showing ${percentage}% from ${labels[0]}`}>
        {colors.card && <Doughnut data={data} options={options} />}
        <figcaption className="sr-only">Donut chart representing sales split by channel.</figcaption>

        <div className="absolute flex flex-col items-center">
          <div
            className="text-white text-xs font-medium rounded-md px-2 py-1"
            style={{ backgroundColor: colors.donut1 }}
          >
            {percentage}%
          </div>
        </div>
      </figure>

      <ul className="space-y-2" role="list" aria-label="Sales breakdown">
        {labels.map((label, index) => (
          <li key={label} className="flex justify-between text-sm" role="listitem">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segmentColors[index] }}
                aria-hidden="true"
              />
              <span className="text-secondary">{label}</span>
            </div>
            <span className="text-primary font-medium">${values[index]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TotalSalesDonut