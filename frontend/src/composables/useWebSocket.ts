import { onMounted, onUnmounted, ref } from 'vue';
import { initializeSocket, disconnectSocket, getSocket } from '@/services/websocket/socket.client';
import { useKpiStore } from '@/stores/kpi.store';
import type { SaleEvent } from '@/types/sales.types';

export function useWebSocket() {
  const isConnected = ref(false);
  const kpiStore = useKpiStore();

  function handleNewSale(saleData: SaleEvent) {
    kpiStore.addSale(saleData);
  }

  function handleConnect() {
    isConnected.value = true;
    console.log('WebSocket connected');
  }

  function handleDisconnect() {
    isConnected.value = false;
    console.log('WebSocket disconnected');
  }

  function handleError(error: Error) {
    console.error('WebSocket error:', error);
  }

  onMounted(() => {
    const socket = initializeSocket();

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);
    socket.on('new-sale', handleNewSale);
  });

  onUnmounted(() => {
    const socket = getSocket();
    if (socket) {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('new-sale', handleNewSale);
    }
    disconnectSocket();
  });

  return {
    isConnected,
  };
}
