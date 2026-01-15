<template>
  <span class="realtime-indicator">EN VIVO</span>
</template>

<style scoped>
.realtime-indicator {
  background-color: #ef4444;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  animation: pulse 2s infinite;
  display: inline-block;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
