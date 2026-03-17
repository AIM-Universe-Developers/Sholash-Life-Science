import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { ThemeContext } from '../../../context/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DeviceDonutChart = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const chartData = {
        labels: ['Mobile', 'Desktop', 'Tablet'],
        datasets: [
            {
                data: [58, 32, 10],
                backgroundColor: ['#3B82F6', '#7C3AED', '#06B6D4'],
                borderWidth: 0,
                hoverOffset: 8
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: { 
                position: 'bottom',
                labels: { 
                    color: isDark ? '#94A3B8' : '#64748B', 
                    font: { family: 'Outfit, sans-serif', size: 12 },
                    usePointStyle: true,
                    padding: 20
                } 
            },
            tooltip: {
                backgroundColor: isDark ? '#334155' : '#ffffff',
                titleColor: isDark ? '#F8FAFC' : '#0F172A',
                bodyColor: isDark ? '#94A3B8' : '#64748B',
                borderColor: isDark ? '#475569' : '#E2E8F0',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DeviceDonutChart;
