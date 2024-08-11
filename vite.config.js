import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 5172
	},
	preview: {
		port: 3001, // 프리뷰 서버 포트
		strictPort: false
	}
});
