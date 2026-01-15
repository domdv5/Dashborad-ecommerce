<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}>();

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant || 'primary'}`,
      { 'base-button--disabled': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__loader">Loading...</span>
    <span v-else class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: 1px solid transparent;
}

.base-button--primary {
  background-color: var(--color-primary);
  color: var(--color-carbon-black);
}

.base-button--primary:hover:not(.base-button--disabled) {
  background-color: #c4a137;
  box-shadow: var(--shadow-sm);
}

.base-button--secondary {
  background-color: transparent;
  color: var(--color-carbon-black);
  border-color: var(--color-border);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background-color: var(--color-gray-pearl);
}

.base-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button__loader {
  font-size: var(--font-size-sm);
}

.base-button__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
