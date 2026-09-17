
<script setup lang="ts">
import { ref } from 'vue'

interface Invoice {
  docNo: string
  debtorCode: string
  docDate: string
  total: number
}

const invoices = ref<Invoice[]>([])
const loading = ref(false)
const error = ref('')

// Get invoices from Hono
async function getInvoices() {
  loading.value = true
  error.value = ''

  try {
    // Vue sends request to Hono
    const res = await fetch('http://localhost:3000/invoices')
    if (!res.ok) {
      throw new Error('Failed to fetch invoices')
    }

    // Receive JSON from Hono
    invoices.value = await res.json()
  } catch (e) {
    error.value = 'Failed to fetch invoices'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>AutoCount Invoices</h1>

    <!-- Button to trigger Hono -->
    <button @click="getInvoices" :disabled="loading">
      {{ loading ? 'Loading...' : 'Get Invoices' }}
    </button>

    <p v-if="error" style="color: red">
      {{ error }}
    </p>

    <table v-if="!loading && invoices.length">
      <thead>
        <tr>
          <th>Doc No</th>
          <th>Debtor Code</th>
          <th>Date</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="inv in invoices" :key="inv.docNo">
          <td>{{ inv.docNo }}</td>
          <td>{{ inv.debtorCode }}</td>
          <td>{{ inv.docDate }}</td>
          <td>{{ inv.total }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !invoices.length && !error">
      Click "Get Invoices" to load invoice data.
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 1rem;
}

button {
  padding: 0.7rem 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #070707;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #080808;
  color: white;
}
</style>
