import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// 部署到 GitHub Pages 時使用相對路徑，避免 manifest / 靜態資源 404
export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 3003,
    open: true
  }
})

