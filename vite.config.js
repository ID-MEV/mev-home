import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {        // <--- 이 부분을 추가합니다.
    host: true,    // <--- 이 부분을 추가합니다.
    allowedHosts: ['mev.o-r.kr'] // <--- 이 부분을 추가합니다.
  }
})