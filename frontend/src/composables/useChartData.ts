import { computed, type Ref } from 'vue';
import type { CategorySales } from '@/types/sales.types';
import type { ForecastData } from '@/types/api.types';
import type { ChartData } from '@/types/chart.types';

export function useSalesChartData(categorySales: Ref<CategorySales[]>) {
  const translations: Record<string, string> = {
        Electronics: 'Electronica',
        Clothing: 'Ropa',
        Home: 'Hogar',
        Books: 'Libros',
      };
      
  const chartData = computed<ChartData>(() => {
    const labels = categorySales.value.map((item) => translations[item.category]);
    const data = categorySales.value.map((item) => item.total_sales);

    return {
      labels,
      datasets: [
        {
          label: 'Ventas Totales',
          data,
          backgroundColor: ['#D4AF37', '#C4A137', '#B49337', '#A48537'],
          borderColor: '#1A1A1A',
          borderWidth: 1,
        },
      ],
    };
  });

  return { chartData };
}

export function useForecastChartData(forecastData: Ref<ForecastData[]>) {
  console.log(forecastData)
  const chartData = computed<ChartData>(() => {
    const labels = forecastData.value.map((item) => new Date(item.timestamp.value).toLocaleDateString());
    const predicted = forecastData.value.map((item) => item.predicted_sales);
    const lowerBound = forecastData.value.map((item) => item.lower_bound);
    const upperBound = forecastData.value.map((item) => item.upper_bound);

    return {
      labels,
      datasets: [
        {
          label: 'Ventas Previstas',
          data: predicted,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Limite Inferior',
          data: lowerBound,
          borderColor: 'rgba(219, 21, 21, 0.5)',
          backgroundColor: 'rgba(224, 224, 224, 0.05)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Limite Superior',
          data: upperBound,
          borderColor: 'rgba(17, 119, 202, 0.5)',
          backgroundColor: 'rgba(224, 224, 224, 0.05)',
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  });

  return { chartData };
}
