import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Đảm bảo thư mục xuất là 'build'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Địa chỉ backend của bạn
        changeOrigin: true,  // Thay đổi Origin của yêu cầu
        rewrite: (path) => path.replace(/^\/api/, ''),  // Xóa phần "/api" khỏi URL khi gửi yêu cầu đến backend
      },
    }
  },
})
