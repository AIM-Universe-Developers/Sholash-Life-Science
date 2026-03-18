import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ThemeContext } from '../../../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesPieChart = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Ensure we have data
    const chartDataRaw = data?.length > 0 ? data : [{ name: 'No Data', value: 1 }];

    const chartData = {
        labels: chartDataRaw.map(d => d.name),
        datasets: [
            {
                data: chartDataRaw.map(d => d.value),
                backgroundColor: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'],
                borderWidth: isDark ? 2 : 0,
                borderColor: isDark ? '#0F172A' : '#ffffff',
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: isDark ? '#94A3B8' : '#64748B',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter, sans-serif',
                        size: 12
                    }
                }
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
        }
    };

    return (
        <div style={{ height: '280px', width: '100%' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default SalesPieChart;
