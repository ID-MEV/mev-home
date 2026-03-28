import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_APP_');

  // filter(Boolean)을 추가하여 undefined나 빈 문자열을 배열에서 제거합니다.
  const allowedHosts = [
    env.VITE_APP_ALLOWED_HOST, 
    env.VITE_APP_ALLOWED_HOST_WWW
  ].filter(Boolean);

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      // 만약 배열이 비어있다면 true를 주어 모든 호스트를 허용하거나, 
      // 명시된 호스트만 허용하도록 설정합니다.
      allowedHosts: allowedHosts.length > 0 ? allowedHosts : true, 
      hmr: {
        host: 'mev.o-r.kr',
        port: 5173,
      },
    }
  };
});