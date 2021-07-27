import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'public'),
  },
  plugins: [reactRefresh()],
  root: path.resolve(__dirname, 'src'),
})
