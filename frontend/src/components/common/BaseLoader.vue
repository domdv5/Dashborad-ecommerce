<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div :class="['base-loader', `base-loader--${size || 'md'}`]">
    <div class="base-loader__spinner"></div>
  </div>
</template>

<style scoped>
.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-loader--sm {
  width: 24px;
  height: 24px;
}

.base-loader--md {
  width: 48px;
  height: 48px;
}

.base-loader--lg {
  width: 72px;
  height: 72px;
}

.base-loader__spinner {
  width: 100%;
  height: 100%;
  border: 3px solid var(--color-gray-pearl);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
