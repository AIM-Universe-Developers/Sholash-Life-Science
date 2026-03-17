import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [isAdminRehydrated, setIsAdminRehydrated] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('sholash_admin_token');
        const savedUser = localStorage.getItem('sholash_admin_user');
        
        if (savedToken && savedUser) {
            setToken(savedToken);
            setAdminUser(JSON.parse(savedUser));
        }
        setIsAdminRehydrated(true);
    }, []);

    const loginAdmin = async (email, password) => {
        try {
            const res = await axios.post('/api/admin/login', { email, password });
            if (res.data.success) {
                const { token, ...userData } = res.data.data;
                setToken(token);
                setAdminUser(userData);
                localStorage.setItem('sholash_admin_token', token);
                localStorage.setItem('sholash_admin_user', JSON.stringify(userData));
                return { success: true };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const logoutAdmin = () => {
        setToken(null);
        setAdminUser(null);
        localStorage.removeItem('sholash_admin_token');
        localStorage.removeItem('sholash_admin_user');
    };

    return (
        <AdminAuthContext.Provider value={{
            adminUser,
            token,
            isAdminRehydrated,
            loginAdmin,
            logoutAdmin,
            isAuthenticated: !!token
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
