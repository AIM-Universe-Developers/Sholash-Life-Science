import React, { useContext } from 'react';
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
import { ThemeContext } from '../../../context/ThemeContext';

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

const RevenueChart = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Mock data fallback if none provided
    const defaultData = [
        { name: 'Sep', Revenue: 32000 },
        { name: 'Oct', Revenue: 41000 },
        { name: 'Nov', Revenue: 38000 },
        { name: 'Dec', Revenue: 55000 },
        { name: 'Jan', Revenue: 49000 },
        { name: 'Feb', Revenue: 68000 }
    ];

    const actualData = data?.length > 0 ? data : defaultData;

    const chartData = {
        labels: actualData.map(d => d.name),
        datasets: [
            {
                label: 'Revenue',
                data: actualData.map(d => d.Revenue),
                borderColor: '#0EA5E9',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, isDark ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.2)');
                    gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
                    return gradient;
                },
                borderWidth: 3,
                pointBackgroundColor: '#0EA5E9',
                pointBorderColor: isDark ? '#1E293B' : '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4 // Creates smooth curves
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: isDark ? '#334155' : '#ffffff',
                titleColor: isDark ? '#F8FAFC' : '#0F172A',
                bodyColor: isDark ? '#94A3B8' : '#64748B',
                borderColor: isDark ? '#475569' : '#E2E8F0',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return `₹${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: isDark ? '#334155' : '#F1F5F9',
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#94A3B8' : '#64748B',
                    font: { family: 'Outfit, sans-serif' },
                    callback: function(value) {
                        return value >= 1000 ? `${value / 1000}k` : value;
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#94A3B8' : '#64748B',
                    font: { family: 'Inter, sans-serif' }
                }
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;
