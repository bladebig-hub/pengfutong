import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  preview: {
    host: true, // 监听 0.0.0.0，这是 Docker/Zeabur 环境必需的
    port: Number(process.env.PORT) || 4173, // 优先使用 Zeabur 提供的 PORT，否则使用默认 4173
    allowedHosts: true // 允许所有 host 访问，避免反向代理导致的 host 检查失败
  }
});