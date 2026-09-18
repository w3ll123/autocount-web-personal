<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen bg-slate-100">
    <Sidebar />
    <main class="flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>
