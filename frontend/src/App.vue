<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Invoice {
  docNo: string
  debtorCode: string
  docDate: string
  total: number
}

const invoices = ref<Invoice[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/invoices')
    invoices.value = await res.json()
  } catch (e) {
    error.value = 'Failed to fetch invoices'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <h1>AutoCount Invoices</h1>

    <p v-if="loading">Loading...</p>
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
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  font-family: sans-serif;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
th {
  background-color: #f5f5f5;
}
</style>
