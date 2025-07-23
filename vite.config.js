import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.cjs'
    },
    server: {
        proxy: {
            '/api': 'http://localhost:5000'
        },
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..']
        }
    },
    publicDir: 'public'
});
