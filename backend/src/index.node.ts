
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('*', cors())

// Home route
app.get('/', (c) => {
  return c.text('CONNECTION ESTABLISHED!')
})

// Invoice route
// Vue -> Hono -> Java -> Database
app.get('/invoices', async (c) => {
  try {
    // Hono sends request to Java API
    const res = await fetch('http://localhost:8081/invoices')

    if (!res.ok) {
      return c.json(
        { error: 'Java API returned an error' },
        502
      )
    }

    // Receive JSON from Java
    const data = await res.json()

    // Send JSON back to Vue
    return c.json(data)

  } catch (error) {
    console.error('Error connecting to Java:', error)

    return c.json(
      { error: 'Failed to fetch from Java API' },
      500
    )
  }
})

// Start Hono server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(
    `Server is running on http://localhost:${info.port}`
  )
})