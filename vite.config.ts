import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import ssg from '@hono/vite-ssg'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/cci-static-app/' : '/',
    plugins: [
      honox({
        client: { input: ['/app/client.ts', '/app/style.css'] }
      }),
      tailwindcss(),
      ssg({
        entry: './app/server.ts'
      })
    ]
  }
})
