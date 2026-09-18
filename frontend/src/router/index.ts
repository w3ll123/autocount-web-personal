import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Invoices from '../views/Invoices.vue'
import Customers from '../views/Customers.vue'
import Reports from '../views/Reports.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/invoices', name: 'invoices', component: Invoices },
    { path: '/customers', name: 'customers', component: Customers },
    { path: '/reports', name: 'reports', component: Reports },
  ],
})

export default router
