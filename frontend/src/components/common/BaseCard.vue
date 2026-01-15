<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="base-card">
    <div v-if="title || subtitle" class="base-card__header">
      <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      <p v-if="subtitle" class="base-card__subtitle">{{ subtitle }}</p>
    </div>
    <div class="base-card__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-white-broken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: box-shadow var(--transition-base);
}

.base-card:hover {
  box-shadow: var(--shadow-md);
}

.base-card__header {
  margin-bottom: var(--spacing-md);
}

.base-card__title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-carbon-black);
  margin-bottom: var(--spacing-xs);
}

.base-card__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  opacity: 0.7;
}

.base-card__content {
  width: 100%;
}
</style>
