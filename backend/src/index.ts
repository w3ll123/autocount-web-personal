import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('CONNECTION ESTABLISHED!')
})

app.get('/invoices', async (c) => {
  try {
    const res = await fetch('https://course-lawyer-completion-electricity.trycloudflare.com/invoices')
    if (!res.ok) {
      return c.json({ error: 'Java API returned an error' }, 502)
    }
    const data = await res.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/customers', async (c) => {
  try {
    const res = await fetch('https://course-lawyer-completion-electricity.trycloudflare.com/customers')
    if (!res.ok) {
      return c.json({ error: 'Java API returned an error' }, 502)
    }
    const data = await res.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/items', async (c) => {
  try {
    const res = await fetch('https://course-lawyer-completion-electricity.trycloudflare.com/items')
    if (!res.ok) {
      return c.json({ error: 'Java API returned an error' }, 502)
    }
    const data = await res.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

export default app
