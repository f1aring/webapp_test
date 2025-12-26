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
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Don't proxy requests for module files
            if (req.url && /\.(tsx?|jsx?|json|css|html|ico)$/i.test(req.url)) {
              proxyReq.destroy();
            }
          });
        },
        bypass(req, res, options) {
          // Don't proxy requests for TypeScript/JavaScript/module files
          if (req.url && /\.(tsx?|jsx?|json|css|html|ico)$/i.test(req.url)) {
            return req.url;
          }
        }
      }
    }
  }
})