import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
//   server: {
//     proxy: {
//         '/api': {
//             target: 'https://cauvery-production.up.railway.app',
//             changeOrigin: true,
//             secure: false,
//         }
//     }
// },
  plugins: [react()],
})
