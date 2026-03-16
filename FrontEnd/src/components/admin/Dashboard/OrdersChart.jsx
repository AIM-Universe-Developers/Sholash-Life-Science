import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ThemeContext } from '../../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersChart = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Mock data for weekly orders volume fallback
    const defaultData = [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 60 },
        { name: 'Wed', value: 50 },
        { name: 'Thu', value: 75 },
        { name: 'Fri', value: 90 },
        { name: 'Sat', value: 105 },
        { name: 'Sun', value: 70 },
    ];

    const actualData = data?.length > 0 ? data : defaultData;

    const chartData = {
        labels: actualData.map(d => d.name),
        datasets: [
            {
                label: 'Orders',
                data: actualData.map(d => d.value),
                backgroundColor: '#8B5CF6',
                borderRadius: 4, // rounded tops on bars
                barThickness: 'flex',
                maxBarThickness: 20
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
                    font: { family: 'Outfit, sans-serif' }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#94A3B8' : '#64748B',
                    font: { family: 'Outfit, sans-serif' }
                }
            }
        }
    };

    return (
        <div style={{ height: '280px', width: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default OrdersChart;
