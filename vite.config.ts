import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import ssg from '@hono/vite-ssg'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  // @ts-expect-error - process.env is available at build time
  const isProduction = process.env.NODE_ENV === 'production' || mode === 'production'
  const base = isProduction ? '/cci-static-app/' : '/'
  
  if (mode === 'client') {
    return {
      base,
      plugins: [client()],
    }
  } else {
    return {
      base,
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
