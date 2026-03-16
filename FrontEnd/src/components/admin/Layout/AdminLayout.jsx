import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    // Basic mobile sidebar toggle state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isAuthenticated, isAdminRehydrated } = useAdminAuth();

    // Prevent flicker while checking token
    if (!isAdminRehydrated) {
        return null; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={styles.layoutContainer}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={styles.mainContent}>
                <Topbar toggleSidebar={toggleSidebar} />
                <main className={styles.pageContainer}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
