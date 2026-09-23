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
const res = await fetch('/invoices')
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

function filteredInvoices() {
  const search = searchText.value.toLowerCase()
  return invoices.value.filter((invoice) =>
    invoice.docNo.toLowerCase().includes(search) ||
    invoice.debtorCode.toLowerCase().includes(search)
  )
}

function formatDate(date: string) {
  return date.split(' ')[0]
}

function formatCurrency(total: number) {
  return `RM ${total.toFixed(2)}`
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <p class="page-label">BUSINESS MANAGEMENT</p>
        <h1 class="page-title">Invoices</h1>
        <p class="page-subtitle">View and manage invoice records from AutoCount.</p>
      </div>

      <button class="btn-primary" @click="getInvoices" :disabled="loading">
        {{ loading ? 'Loading...' : 'Get Invoices' }}
      </button>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <p class="summary-label">Total Invoices</p>
        <p class="summary-value">{{ invoices.length }}</p>
      </div>

      <div class="summary-card">
        <p class="summary-label">Total Amount</p>
        <p class="summary-value accent">
          RM {{ invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Invoice Records</h2>
          <p class="card-subtitle">All invoice records retrieved from AutoCount.</p>
        </div>

        <input
          v-model="searchText"
          type="text"
          placeholder="Search invoice..."
          class="search-input"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <div v-else-if="loading" class="state">Loading invoice records...</div>

      <div v-else-if="!filteredInvoices().length" class="state">
        No invoice records found.
      </div>

      <div v-else>
        <div class="table-wrap desktop-only">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Document No</th>
                <th>Customer</th>
                <th>Date</th>
                <th class="right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(inv, index) in filteredInvoices()" :key="inv.docNo">
                <td class="muted">{{ index + 1 }}</td>
                <td class="doc">{{ inv.docNo }}</td>
                <td>{{ inv.debtorCode }}</td>
                <td class="muted">{{ formatDate(inv.docDate) }}</td>
                <td class="right amount">{{ formatCurrency(inv.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mobile-only mobile-cards">
          <div
            v-for="(inv, index) in filteredInvoices()"
            :key="inv.docNo"
            class="mobile-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-doc">{{ inv.docNo }}</span>
              <span class="mobile-amount">{{ formatCurrency(inv.total) }}</span>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-row">
                <span class="mobile-label">Customer</span>
                <span>{{ inv.debtorCode }}</span>
              </div>
              <div class="mobile-row">
                <span class="mobile-label">Date</span>
                <span>{{ formatDate(inv.docDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  color: #0f172a;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.page-label {
  margin: 0 0 8px;
  color: #0f766e;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.page-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
}

.page-subtitle {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
}

.btn-primary {
  padding: 12px 22px;
  background: #0f766e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #115e59;
}

.btn-primary:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 24px;
}

.summary-label {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}

.summary-value {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
}

.summary-value.accent {
  color: #0f766e;
}

.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
}

.card-subtitle {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 12px;
}

.search-input {
  width: 240px;
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 13px;
  outline: none;
}

.search-input:focus {
  border-color: #0f766e;
}

.state {
  padding: 48px 24px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}

.error-msg {
  padding: 14px 24px;
  margin: 0;
  color: #b91c1c;
  background: #fef2f2;
  font-size: 13px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

thead {
  background: #f8fafc;
}

th {
  text-align: left;
  padding: 12px 24px;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 16px 24px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f8fafc;
}

.doc {
  font-weight: 600;
  color: #0f766e;
}

.muted {
  color: #94a3b8;
}

.right {
  text-align: right;
}

.amount {
  font-weight: 700;
  color: #0f172a;
}

/* Mobile: card view */
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .page-header,
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .search-input {
    width: 100%;
  }

  .mobile-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .mobile-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 16px;
  }

  .mobile-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 12px;
  }

  .mobile-doc {
    font-weight: 600;
    color: #0f766e;
    font-size: 15px;
  }

  .mobile-amount {
    font-weight: 700;
    color: #0f172a;
    font-size: 16px;
  }

  .mobile-card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .mobile-label {
    color: #64748b;
    font-size: 13px;
  }
}
</style>
