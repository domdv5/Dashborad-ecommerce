<script setup lang="ts">
import DateRangePicker from './DateRangePicker.vue';
</script>

<template>
  <div class="dashboard-header">
    <div class="dashboard-header__title">
      <h1>Dashboard</h1>
    </div>
    <div class="dashboard-header__filters">
      <DateRangePicker />
    </div>
  </div>
</template>

<style scoped>
.dashboard-header {
  margin-bottom: var(--spacing-xl);
}

.dashboard-header__title {
  margin-bottom: var(--spacing-lg);
}

.dashboard-header__title h1 {
  font-size: var(--font-size-3xl);
  color: var(--color-carbon-black);
  margin-bottom: var(--spacing-xs);
}

.dashboard-header__title p {
  font-size: var(--font-size-base);
  color: var(--color-text);
  opacity: 0.7;
}

.dashboard-header__filters {
  padding: var(--spacing-lg);
  background-color: var(--color-white-broken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
</style>
