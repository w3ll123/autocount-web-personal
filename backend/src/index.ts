import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

const JAVA_API = 'https://laptop-doci836v.tail2c0f36.ts.net'

app.get('/', (c) => {
  return c.text('CONNECTION ESTABLISHED!')
})

app.get('/invoices', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/invoices`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/customers', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/customers`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/items', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/items`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/sales/monthly', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/sales/monthly`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/sales/summary', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/sales/summary`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/dashboard/summary', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/dashboard/summary`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

app.get('/dashboard/top-customers', async (c) => {
  try {
    const res = await fetch(`${JAVA_API}/dashboard/top-customers`)
    if (!res.ok) return c.json({ error: 'Java API returned an error' }, 502)
    return c.json(await res.json())
  } catch (error) {
    return c.json({ error: 'Failed to fetch from Java API' }, 500)
  }
})

export default app
