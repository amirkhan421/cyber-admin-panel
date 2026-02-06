// Mock user data
const USERS = [
    {
        id: 1,
        username: 'admin',
        password: 'password', // In a real app, this would be hashed
        role: 'admin',
        name: 'Admin User',
        email: 'admin@cyberpanel.com'
    },
    {
        id: 2,
        username: 'user',
        password: 'password',
        role: 'user',
        name: 'Security Analyst',
        email: 'analyst@cyberpanel.com'
    }
];

const LATENCY = 800; // Simulate network delay

export const authService = {
    login: async (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = USERS.find(u => u.username === username && u.password === password);
                if (user) {
                    // Create a fake JWT token
                    const token = `fake-jwt-token-${user.id}-${Date.now()}`;
                    const { password: _, ...userWithoutPassword } = user;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                    resolve({ user: userWithoutPassword, token });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, LATENCY);
        });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};
