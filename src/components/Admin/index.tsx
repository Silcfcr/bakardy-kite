import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const savedAuth = localStorage.getItem('admin_auth');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = (password: string) => {
        // Simple authentication (in production, use proper auth)
        if (password === 'bakardykite2024') {
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </>
    );
};

export default Admin;
