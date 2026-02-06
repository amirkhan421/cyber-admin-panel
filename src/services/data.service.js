import { MOCK_STATS, MOCK_THREATS, MOCK_USERS, LATENCY } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
    getStats: async () => {
        await delay(LATENCY);
        return [...MOCK_STATS];
    },

    getThreats: async () => {
        await delay(LATENCY);
        return [...MOCK_THREATS];
    },

    getUsers: async () => {
        await delay(LATENCY);
        return [...MOCK_USERS];
    },

    deleteUser: async (userId) => {
        await delay(LATENCY);
        // In a real app, we'd call the API here
        return { success: true, id: userId };
    },

    updateUserStatus: async (userId, status) => {
        await delay(LATENCY);
        return { success: true, id: userId, status };
    }
};
