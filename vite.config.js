// GNU nano 6.2           vite.config.js
import { defineConfig, loadEnv } from 'vite' // loadEnv를 임포트
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { // defineConfig를 함수 형태로 변경하고 mode 인자를 받도록 합니다.
  // 이 부분에서 env 변수를 정의합니다.
  const env = loadEnv(mode, process.cwd(), 'VITE_APP_');

  // 이 return 문으로 전체 설정을 감싸야 합니다.
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // 외부 접속 허용
      allowedHosts: [env.VITE_APP_ALLOWED_HOST], // env 변수를 따옴표 없이 사용
      hmr: {
        host: env.VITE_APP_ALLOWED_HOST, // env 변수를 따옴표 없이 사용
        clientPort: 443, // Nginx가 443 포트로 프록시하므로, 클라이언트 포트를 443으로 명시
      },
    }
  } // return 문을 여기서 닫습니다.
})
