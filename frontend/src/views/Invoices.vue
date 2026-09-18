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

async function getInvoices() {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch('https://autocount-hono-backend.w3ll123.workers.dev/invoices')

    if (!res.ok) {
      throw new Error('Failed to fetch invoices')
    }

    invoices.value = await res.json()
  } catch (e) {
    error.value = 'Failed to fetch invoices'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Invoices</h1>

    <button @click="getInvoices" :disabled="loading">
      {{ loading ? 'Loading...' : 'Get Invoices' }}
    </button>

    <p v-if="error" style="color: red">{{ error }}</p>

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
button {
  padding: 0.7rem 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background-color: #2563eb;
  color: rgb(0, 0, 0);
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
  border: 1px solid #000000;
  padding: 0.5rem;
  text-align: left;
}
th {
  background-color: #000000;
}
</style>
