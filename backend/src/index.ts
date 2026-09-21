import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('CONNECTION ESTABLISHED!')
})

app.get('/invoices', async (c) => {
  try {
    const res = await fetch('https://laptop-doci836v.tail2c0f36.ts.net/invoices')
    const data = await res.text()
    return c.body(data, 200, { 'Content-Type': 'application/json' })
  } catch (error) {
    return c.json({ error: 'Failed: ' + error.message }, 500)
  }
})

app.get('/customers', async (c) => {
  try {
    const res = await fetch('https://laptop-doci836v.tail2c0f36.ts.net/customers')
    const data = await res.text()
    return c.body(data, 200, { 'Content-Type': 'application/json' })
  } catch (error) {
    return c.json({ error: 'Failed: ' + error.message }, 500)
  }
})

app.get('/items', async (c) => {
  try {
    const res = await fetch('https://laptop-doci836v.tail2c0f36.ts.net/items')
    const data = await res.text()
    return c.body(data, 200, { 'Content-Type': 'application/json' })
  } catch (error) {
    return c.json({ error: 'Failed: ' + error.message }, 500)
  }
})

export default app
