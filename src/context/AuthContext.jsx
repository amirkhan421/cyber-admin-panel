import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            const storedToken = localStorage.getItem('token');

            if (currentUser && storedToken) {
                setUser(currentUser);
                setToken(storedToken);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        setUser(data.user);
        setToken(data.token);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
