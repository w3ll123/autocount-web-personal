<script setup lang="ts">
import { ref } from 'vue'

const API = 'https://autocount-hono-backend.w3ll123.workers.dev'

interface Item {
  code: string
  description: string
  group: string | null
}

const items = ref<Item[]>([])
const loading = ref(false)
const error = ref('')
const searchText = ref('')

async function getItems() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API}/items`)
    if (!res.ok) throw new Error('Failed')
    items.value = await res.json()
  } catch (e) {
    error.value = 'Failed to fetch items.'
  } finally {
    loading.value = false
  }
}

function filteredItems() {
  const search = searchText.value.toLowerCase()
  return items.value.filter((i) =>
    i.code.toLowerCase().includes(search) ||
    i.description.toLowerCase().includes(search)
  )
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <p class="page-label">MASTER DATA</p>
        <h1 class="page-title">Items</h1>
        <p class="page-subtitle">List of all items in AutoCount.</p>
      </div>
      <button class="btn-primary" @click="getItems" :disabled="loading">
        {{ loading ? 'Loading...' : 'Get Items' }}
      </button>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <p class="summary-label">Total Items</p>
        <p class="summary-value">{{ items.length }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Item Records</h2>
          <p class="card-subtitle">All items retrieved from AutoCount.</p>
        </div>
        <input v-model="searchText" type="text" placeholder="Search item..." class="search-input" />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
      <div v-else-if="loading" class="state">Loading items...</div>
      <div v-else-if="!filteredItems().length" class="state">No item records found.</div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Item Code</th>
              <th>Description</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredItems()" :key="item.code">
              <td class="muted">{{ index + 1 }}</td>
              <td class="code">{{ item.code }}</td>
              <td>{{ item.description }}</td>
              <td class="muted">{{ item.group || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; color: #0f172a; }
.page-header { display: flex; justify-content: space-between; align-items: center; gap: 24px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
.page-label { margin: 0 0 8px; color: #0f766e; font-size: 11px; font-weight: 700; letter-spacing: 2px; }
.page-title { margin: 0; font-size: 32px; font-weight: 700; color: #0f172a; }
.page-subtitle { margin: 6px 0 0; color: #64748b; font-size: 14px; }
.btn-primary { padding: 12px 22px; background: #0f766e; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.btn-primary:hover { background: #115e59; }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
.summary-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.summary-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; }
.summary-label { margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 500; }
.summary-value { margin: 0; font-size: 26px; font-weight: 700; color: #0f172a; }
.card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.card-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 20px 24px; border-bottom: 1px solid #e2e8f0; }
.card-title { margin: 0; font-size: 17px; font-weight: 600; color: #0f172a; }
.card-subtitle { margin: 4px 0 0; color: #64748b; font-size: 12px; }
.search-input { width: 240px; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 13px; outline: none; }
.search-input:focus { border-color: #0f766e; }
.state { padding: 48px 24px; text-align: center; color: #64748b; font-size: 14px; }
.error-msg { padding: 14px 24px; margin: 0; color: #b91c1c; background: #fef2f2; font-size: 13px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: #f8fafc; }
th { text-align: left; padding: 12px 24px; font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
td { padding: 16px 24px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }
tbody tr:hover { background: #f8fafc; }
.code { font-weight: 600; color: #0f766e; }
.muted { color: #94a3b8; }
@media (max-width: 768px) {
  .page-header, .card-header { flex-direction: column; align-items: flex-start; }
  .summary-grid { grid-template-columns: 1fr; }
  .search-input { width: 100%; }
}
</style>
