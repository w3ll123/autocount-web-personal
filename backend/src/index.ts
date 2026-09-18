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
const res = await fetch('https://course-lawyer-completion-electricity.trycloudflare.com/invoices')  
    if (!res.ok) {
      return c.json({ error: 'Java API returned an error' }, 502)
    }

    const data = await res.json()
    return c.json(data)
  } catch (error) {
    console.error('Error connecting to Java:', error)
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

export default app
