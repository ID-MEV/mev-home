import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_APP_');

  // allowedHosts 배열에 두 개의 환경 변수 값을 모두 추가합니다.
  const allowedHosts = [env.VITE_APP_ALLOWED_HOST, env.VITE_APP_ALLOWED_HOST_WWW];

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: allowedHosts, // 정의된 배열 변수를 사용합니다.
      hmr: {
        // HMR은 보통 하나의 호스트로만 연결되므로, 대표 도메인을 선택합니다.
        // 여기서는 www.mev.r-e.kr을 예시로 둡니다.
        host: env.VITE_APP_ALLOWED_HOST_WWW, // www 붙은 도메인으로 HMR 설정
        clientPort: 443,
      },
    }
  };
});