import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    API_BASE_URL: JSON.stringify('https://api.jcsxsistemas.com.br/balanceInquiry')
  }
})
