import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { BASE_URL, MODEL_ID, COACH_PROMPT, parseResponseToJson } from './shared/coachConfig.js'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function aiCoachDevApi() {
  return {
    name: 'ai-coach-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/analyze', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const apiKey = process.env.DASHSCOPE_API_KEY
        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Missing DASHSCOPE_API_KEY for local dev server.' }))
          return
        }

        try {
          let rawBody = ''
          for await (const chunk of req) {
            rawBody += chunk
          }

          const body = rawBody ? JSON.parse(rawBody) : {}
          const frames = body?.frames
          if (!Array.isArray(frames) || frames.length === 0) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'No frames provided.' }))
            return
          }

          const dashscopeRes = await fetch(`${BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: MODEL_ID,
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: COACH_PROMPT },
                    ...frames.map((frame: string) => ({
                      type: 'image_url',
                      image_url: { url: frame },
                    })),
                  ],
                },
              ],
              response_format: { type: 'json_object' },
            }),
          })

          const result = await dashscopeRes.json()
          if (!dashscopeRes.ok) {
            const message = result?.error?.message || dashscopeRes.statusText
            res.statusCode = dashscopeRes.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: `DashScope API error: ${message}` }))
            return
          }

          const content = result?.choices?.[0]?.message?.content
          const parsed = parseResponseToJson(content)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(parsed))
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown server error'
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    aiCoachDevApi(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: 'build',
  },
})
