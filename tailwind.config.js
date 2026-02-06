/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#0f172a',
                    darker: '#020617',
                    light: '#e2e8f0',
                    primary: '#0ea5e9', // Sky blue
                    secondary: '#6366f1', // Indigo
                    accent: '#10b981', // Emerald
                    danger: '#ef4444', // Red
                    warning: '#f59e0b', // Amber
                }
            },
            fontFamily: {
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
            }
        },
    },
    plugins: [],
}
