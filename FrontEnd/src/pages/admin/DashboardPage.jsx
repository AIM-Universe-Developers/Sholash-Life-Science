import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './DashboardPage.module.css';

// Components
import KPICard from '../../components/Admin/Dashboard/KPICard';
import ChartCard from '../../components/Admin/Dashboard/ChartCard';
import RevenueChart from '../../components/Admin/Dashboard/RevenueChart';
import OrdersChart from '../../components/Admin/Dashboard/OrdersChart';
import SalesPieChart from '../../components/Admin/Dashboard/SalesPieChart';

// Icons
import { IndianRupee, ShoppingCart, Package, Users, Calendar, Download } from 'lucide-react';

const DashboardPage = () => {
    const { token } = useAdminAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // If token exists, use it. Otherwise, assume local dev / open endpoint
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get('/api/admin/dashboard', { headers });
                
                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h2>Dashboard</h2>
                    <p>Welcome back, Admin. Here's what's happening.</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.btnGroup}>
                        <Calendar size={16} />
                        <span>Feb 2026</span>
                    </div>
                    <button className={styles.btnPrimary}>
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className={styles.kpiGrid}>
                <KPICard 
                    title="Total Revenue" 
                    value={formatCurrency(stats?.totalRevenue)} 
                    icon={<IndianRupee size={24} />} 
                    colorClass="primary"
                    trend="up"
                    trendValue="+12.5%"
                />
                <KPICard 
                    title="Total Orders" 
                    value={stats?.totalOrders || 0} 
                    icon={<ShoppingCart size={24} />} 
                    colorClass="purple"
                    trend="up"
                    trendValue="+8.1%"
                />
                <KPICard 
                    title="Total Products" 
                    value={stats?.totalProducts || 0} 
                    icon={<Package size={24} />} 
                    colorClass="primary"
                    trend="down"
                    trendValue="-2.3%"
                />
                <KPICard 
                    title="Total Customers" 
                    value={stats?.totalUsers || 0} 
                    icon={<Users size={24} />} 
                    colorClass="success"
                    trend="up"
                    trendValue="+5.7%"
                />
            </div>

            <div className={styles.chartsGrid}>
                <ChartCard title="Revenue Overview">
                    <RevenueChart data={stats?.charts?.revenueOverview} />
                </ChartCard>
                <ChartCard title="Sales by Category">
                    <SalesPieChart data={stats?.charts?.salesByCategory} />
                </ChartCard>
            </div>

            <div className={styles.bottomGrid}>
                <ChartCard title="Orders Volume">
                    <OrdersChart /> {/* Mocked inside component intentionally or pass data */}
                </ChartCard>
                
                <ChartCard title="Recent Orders">
                    <div style={{ padding: '0.5rem 0' }}>
                        {stats?.recentOrders?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)' }}>
                                        <th style={{ padding: '12px 0', fontWeight: 500 }}>Order ID</th>
                                        <th style={{ padding: '12px 0', fontWeight: 500 }}>Customer</th>
                                        <th style={{ padding: '12px 0', fontWeight: 500 }}>Status</th>
                                        <th style={{ padding: '12px 0', fontWeight: 500 }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentOrders.map((order, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                            <td style={{ padding: '12px 0', fontWeight: 500, color: 'var(--admin-text-main)' }}>#{order._id?.substring(0,8)}</td>
                                            <td style={{ padding: '12px 0', color: 'var(--admin-text-muted)' }}>{order.user?.name || 'Guest'}</td>
                                            <td style={{ padding: '12px 0' }}>
                                                <span style={{ 
                                                    backgroundColor: order.status === 'delivered' ? 'var(--admin-success-light)' : 'var(--admin-warning-light)',
                                                    color: order.status === 'delivered' ? 'var(--admin-success)' : 'var(--admin-warning)',
                                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' 
                                                }}>{order.status}</span>
                                            </td>
                                            <td style={{ padding: '12px 0', fontWeight: 600, color: 'var(--admin-text-main)' }}>{formatCurrency(order.totalPrice)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ color: 'var(--admin-text-muted)', textAlign: 'center', padding: '2rem' }}>No recent orders</div>
                        )}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
};

export default DashboardPage;
