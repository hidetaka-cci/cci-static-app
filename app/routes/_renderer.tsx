import { jsxRenderer } from 'hono/jsx-renderer'
import { HasIslands, Script } from 'honox/server'

const ensureTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`)

const getManifest = (): Record<string, any> | undefined => {
  const MANIFEST = import.meta.glob('/dist/.vite/manifest.json', { eager: true })
  for (const manifestFile of Object.values(MANIFEST)) {
    const m = (manifestFile as any)?.default
    if (m) return m as Record<string, any>
  }
  return undefined
}

export default jsxRenderer(({ children }) => {
  // GitHub Pages 配下でのアセット解決を安定させるため、prod時は base を自前で前置する
  const prodBase =
    process.env.GITHUB_PAGES_BASE ??
    (process.env.NODE_ENV === 'production' ? '/cci-static-app/' : '/')

  const base = ensureTrailingSlash(prodBase)
  const manifest = import.meta.env.PROD ? getManifest() : undefined
  const clientEntry = manifest?.['app/client.ts']

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${base}favicon.ico`} />
        {import.meta.env.PROD ? (
          <>
            {clientEntry?.css?.map((css: string) => (
              <link rel="stylesheet" href={`${base}${css}`} />
            ))}
            <HasIslands>
              <script
                type="module"
                async
                src={clientEntry?.file ? `${base}${clientEntry.file}` : `${base}static/client.js`}
              />
            </HasIslands>
          </>
        ) : (
          <Script src="/app/client.ts" async />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
})
