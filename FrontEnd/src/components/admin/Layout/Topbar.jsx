import React, { useContext } from 'react';
import { Menu, Search, Bell, MessageSquare, Moon, Sun, LogOut } from 'lucide-react';
import { ThemeContext } from '../../../context/ThemeContext';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import styles from './Topbar.module.css';

const Topbar = ({ toggleSidebar }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { logoutAdmin, adminUser } = useAdminAuth();

    return (
        <header className={styles.topbar}>
            <div className={styles.leftSection}>
                <button className={styles.menuButton} onClick={toggleSidebar} aria-label="Toggle Sidebar">
                    <Menu size={24} />
                </button>
                <div className={styles.searchBar}>
                    <Search size={18} color="var(--admin-text-muted)" />
                    <input type="text" placeholder="Search orders, products, customers..." />
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.actions}>
                    <button className={styles.iconButton} onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button className={styles.iconButton} aria-label="Notifications">
                        <Bell size={20} />
                        <span className={styles.badge}>4</span>
                    </button>
                    <button className={styles.iconButton} aria-label="Messages">
                        <MessageSquare size={20} />
                        <span className={styles.badge}>2</span>
                    </button>
                </div>

                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        {adminUser?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{adminUser?.name || 'Admin'}</span>
                        <span className={styles.userRole}>{adminUser?.role || 'Superadmin'}</span>
                    </div>
                    <button onClick={logoutAdmin} className={`${styles.iconButton} ${styles.logoutButton}`} aria-label="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
