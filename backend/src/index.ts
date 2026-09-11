import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS untuk semua origin (dev only)
app.use('*', cors())

// Route asas
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Route /invoices — panggil Java API
app.get('/invoices', async (c) => {
  try {
    const res = await fetch('http://localhost:8081/invoices')
    const data = await res.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
