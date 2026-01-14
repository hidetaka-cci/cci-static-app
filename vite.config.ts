import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import ssg from '@hono/vite-ssg'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      base: '/',
      plugins: [client()],
    }
  } else {
    return {
      base: mode === 'production' ? '/cci-static-app/' : '/',
      build: {
        emptyOutDir: false,
      },
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
  }
})
