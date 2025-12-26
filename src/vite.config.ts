import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        bypass(req) {
          // Don't proxy if the URL ends with a file extension (module files)
          const url = req.url || '';
          if (/\.(tsx?|jsx?|json|css|html|ico|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|map)$/i.test(url)) {
            return url;
          }
          // Don't proxy if it's a query parameter request for a module (like ?t=timestamp)
          if (url.includes('?t=') && /\.(tsx?|jsx?)$/i.test(url.split('?')[0])) {
            return url;
          }
        }
      }
    }
  }
})