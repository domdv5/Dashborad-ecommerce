<script setup lang="ts">
import DashboardView from '@/views/DashboardView.vue';
</script>

<template>
  <div id="app">
    <DashboardView />
  </div>
</template>

<style>
@import '@/assets/styles/main.css';

#app {
  min-height: 100vh;
  background-color: var(--color-background);
}
</style>
