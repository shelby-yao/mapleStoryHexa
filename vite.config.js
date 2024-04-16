import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({ 
  base: '/mapleStoryHexa',
  plugins: [vue()],
  build: {
    rollupOptions: {
        input: {
            hexaSkill: resolve(__dirname, 'hexaSkill.html'),
        }
    },
},
})
