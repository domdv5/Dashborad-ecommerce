<script setup lang="ts">
import { ref } from 'vue';
import { useSalesStore } from '@/stores/sales.store';
import { getDateRangePreset } from '@/utils/date.utils';
import BaseButton from '@/components/common/BaseButton.vue';

const salesStore = useSalesStore();
const fromDate = ref('');
const toDate = ref('');

function applyDateRange() {
  salesStore.setDateRange({
    from: fromDate.value || null,
    to: toDate.value || null,
  });
  salesStore.fetchSalesByCategory();
}

function applyPreset(preset: 'today' | 'week' | 'month' | 'year') {
  const range = getDateRangePreset(preset);
  fromDate.value = range.from;
  toDate.value = range.to;
  applyDateRange();
}
</script>

<template>
  <div class="date-range-picker">
    <div class="date-range-picker__inputs">
      <div class="date-range-picker__field">
        <label for="from-date">Desde:</label>
        <input id="from-date" v-model="fromDate" type="date" />
      </div>
      <div class="date-range-picker__field">
        <label for="to-date">Hasta:</label>
        <input id="to-date" v-model="toDate" type="date" />
      </div>
      <BaseButton @click="applyDateRange">Aplicar</BaseButton>
    </div>
    <div class="date-range-picker__presets">
      <BaseButton variant="secondary" @click="applyPreset('today')">Hoy</BaseButton>
      <BaseButton variant="secondary" @click="applyPreset('week')">Ultima Semana</BaseButton>
      <BaseButton variant="secondary" @click="applyPreset('month')">Ultimo Mes</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.date-range-picker {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.date-range-picker__inputs {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-end;
  flex-wrap: wrap;
}

.date-range-picker__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.date-range-picker__field label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-carbon-black);
}

.date-range-picker__field input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
}

.date-range-picker__presets {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .date-range-picker__inputs {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
