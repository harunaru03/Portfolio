import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
		port: 3000,
		proxy: {
			// フロントで /api/v1/... と叩けば、自動的に http://backend:8080/api/v1/... に転送される
			"/api": {
				target: "http://backend:8080",
				changeOrigin: true,
			},
		},
	},
})
