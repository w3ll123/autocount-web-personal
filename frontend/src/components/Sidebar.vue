<template>
  <aside class="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
        AC
      </div>
      <h2 class="text-xl font-bold">AutoCount</h2>
    </div>

    <nav class="flex flex-col gap-1 flex-1">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        active-class="bg-blue-600 text-white"
      >
        <span>📊</span> Dashboard
      </RouterLink>
      <RouterLink
        to="/invoices"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        active-class="bg-blue-600 text-white"
      >
        <span>🧾</span> Invoices
      </RouterLink>
      <RouterLink
        to="/customers"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        active-class="bg-blue-600 text-white"
      >
        <span>👥</span> Customers
      </RouterLink>
      <RouterLink
        to="/reports"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
        active-class="bg-blue-600 text-white"
      >
        <span>📈</span> Reports
      </RouterLink>
    </nav>

    <div class="text-xs text-slate-500 mt-4">
      © 2026 AutoCount
    </div>
  </aside>
</template>
