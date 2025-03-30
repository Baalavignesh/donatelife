import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/textbelt": {
            target: "https://textbelt.com",
            changeOrigin: true,
            secure: false,
        },
    },
  },
});
