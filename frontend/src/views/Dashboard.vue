<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
)

const API = 'https://autocount-hono-backend.w3ll123.workers.dev'

interface Summary {
  totalInvoices: number
  totalSales: number
  totalCustomers: number
  totalItems: number
}

interface MonthlySales {
  month: string
  totalInvoices: number
  totalSales: number
}

interface TopCustomer {
  code: string
  name: string
  totalSales: number
}

const summary = ref<Summary>({
  totalInvoices: 0,
  totalSales: 0,
  totalCustomers: 0,
  totalItems: 0
})

const monthlySales = ref<MonthlySales[]>([])
const topCustomers = ref<TopCustomer[]>([])
const loading = ref(true)
const error = ref('')

async function loadDashboard() {
  loading.value = true
  error.value = ''
  try {
    const [summaryRes, monthlyRes, topRes] = await Promise.all([
      fetch(`${API}/dashboard/summary`),
      fetch(`${API}/sales/monthly`),
      fetch(`${API}/dashboard/top-customers`)
    ])

    summary.value = await summaryRes.json()
    monthlySales.value = await monthlyRes.json()
    topCustomers.value = await topRes.json()
  } catch (e) {
    error.value = 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)

function formatCurrency(amount: number) {
  return `RM ${amount.toFixed(2)}`
}

const monthlyChartData = computed(() => ({
  labels: monthlySales.value.map(m => m.month),
  datasets: [
    {
      label: 'Sales (RM)',
      data: monthlySales.value.map(m => m.totalSales),
      backgroundColor: '#0f766e',
      borderRadius: 6
    }
  ]
}))

const monthlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
}

const topCustomersChartData = computed(() => ({
  labels: topCustomers.value.map(c => c.name || c.code),
  datasets: [
    {
      data: topCustomers.value.map(c => c.totalSales),
      backgroundColor: ['#0f766e', '#14b8a6', '#5eead4', '#99f6e4', '#ccfbf1'],
      borderWidth: 0
    }
  ]
}))

const topCustomersChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' as const }
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <p class="page-label">OVERVIEW</p>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Summary of your AutoCount business data.</p>
      </div>
      <button class="btn-primary" @click="loadDashboard" :disabled="loading">
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <div class="summary-grid">
      <div class="summary-card">
        <p class="summary-label">Total Sales</p>
        <p class="summary-value accent">{{ formatCurrency(summary.totalSales) }}</p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Total Invoices</p>
        <p class="summary-value">{{ summary.totalInvoices }}</p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Total Customers</p>
        <p class="summary-value">{{ summary.totalCustomers }}</p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Total Items</p>
        <p class="summary-value">{{ summary.totalItems }}</p>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h2 class="chart-title">Sales by Month</h2>
        <p class="chart-subtitle">Monthly sales from invoices</p>
        <div class="chart-container">
          <Bar :data="monthlyChartData" :options="monthlyChartOptions" />
        </div>
      </div>

      <div class="chart-card">
        <h2 class="chart-title">Top 5 Customers</h2>
        <p class="chart-subtitle">By total sales amount</p>
        <div class="chart-container">
          <Doughnut :data="topCustomersChartData" :options="topCustomersChartOptions" />
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.summary-value.accent {
  color: #0f766e;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.chart-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
}

.chart-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.chart-subtitle {
  margin: 4px 0 20px;
  color: #64748b;
  font-size: 12px;
}

.chart-container {
  height: 300px;
}

.error-msg {
  padding: 14px 24px;
  margin: 0 0 24px;
  color: #b91c1c;
  background: #fef2f2;
  font-size: 13px;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
