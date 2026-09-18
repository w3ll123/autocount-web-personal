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
const searchText = ref('')

async function getInvoices() {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch(
      'https://autocount-hono-backend.w3ll123.workers.dev/invoices'
    )

    if (!res.ok) {
      throw new Error('Failed to fetch invoices')
    }

    invoices.value = await res.json()
  } catch (e) {
    error.value = 'Failed to fetch invoices. Please try again.'
  } finally {
    loading.value = false
  }
}

const filteredInvoices = () => {
  const search = searchText.value.toLowerCase()

  return invoices.value.filter((invoice) => {
    return (
      invoice.docNo.toLowerCase().includes(search) ||
      invoice.debtorCode.toLowerCase().includes(search)
    )
  })
}

function formatDate(date: string) {
  return date.split(' ')[0]
}

function formatCurrency(total: number) {
  return `RM ${total.toFixed(2)}`
}
</script>

<template>
  <div class="invoice-page">
    <div class="page-heading">
      <div>
        <p class="page-label">BUSINESS MANAGEMENT</p>
        <h1>Invoices</h1>
        <p class="page-description">
          View and manage invoice records.
        </p>
      </div>

      <button class="get-button" @click="getInvoices" :disabled="loading">
        {{ loading ? 'Loading...' : 'Get Invoices' }}
      </button>
    </div>

    <div class="summary-card">
      <div>
        <p class="summary-title">Total Invoices</p>
        <h2>{{ invoices.length }}</h2>
      </div>

      <div>
        <p class="summary-title">Total Amount</p>
        <h2>
          RM
          {{
            invoices
              .reduce((sum, invoice) => sum + invoice.total, 0)
              .toFixed(2)
          }}
        </h2>
      </div>
    </div>

    <div class="invoice-card">
      <div class="table-heading">
        <div>
          <h2>Invoice Records</h2>
          <p>All invoice records retrieved from AutoCount.</p>
        </div>

        <input
          v-model="searchText"
          type="text"
          placeholder="Search invoice..."
          class="search-input"
        />
      </div>

      <p v-if="error" class="error-message">
        {{ error }}
      </p>

      <div v-if="loading" class="empty-message">
        Loading invoice records...
      </div>

      <div
        v-else-if="!filteredInvoices().length"
        class="empty-message"
      >
        No invoice records found.
      </div>

      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Document Number</th>
              <th>Customer Code</th>
              <th>Invoice Date</th>
              <th class="amount-column">Total Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(invoice, index) in filteredInvoices()"
              :key="invoice.docNo"
            >
              <td>{{ index + 1 }}</td>
              <td class="document-number">
                {{ invoice.docNo }}
              </td>
              <td>{{ invoice.debtorCode }}</td>
              <td>{{ formatDate(invoice.docDate) }}</td>
              <td class="amount-column">
                {{ formatCurrency(invoice.total) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.invoice-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.page-label {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

h1 {
  margin: 0;
  color: #0f172a;
  font-size: 34px;
}

.page-description {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 15px;
}

.get-button {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 13px 22px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.get-button:hover {
  background: #1d4ed8;
}

.get-button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.summary-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.summary-card > div {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
}

.summary-title {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 14px;
}

.summary-card h2 {
  margin: 0;
  color: #0f172a;
  font-size: 27px;
}

.invoice-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px;
  overflow: hidden;
}

.table-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.table-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: 21px;
}

.table-heading p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 13px;
}

.search-input {
  width: 240px;
  padding: 11px 13px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  outline: none;
  font-size: 14px;
}

.search-input:focus {
  border-color: #2563eb;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;
  table-layout: auto;
}

thead {
  background: #172554;
}

th {
  padding: 15px 16px;
  color: white;
  text-align: left;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  font-size: 14px;
  white-space: nowrap;
}

tbody tr:hover {
  background: #eff6ff;
}

.document-number {
  color: #2563eb;
  font-weight: bold;
}

.amount-column {
  text-align: right;
  font-weight: bold;
}

.error-message {
  padding: 14px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 7px;
}

.empty-message {
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .summary-card {
    grid-template-columns: 1fr;
  }

  .table-heading {
    align-items: stretch;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .invoice-card {
    padding: 16px;
  }
}
</style>