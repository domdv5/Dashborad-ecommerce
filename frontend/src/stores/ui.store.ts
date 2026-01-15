import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useUiStore = defineStore('ui', () => {
  const globalLoading = ref(false);
  const notifications = ref<Notification[]>([]);

  function setGlobalLoading(value: boolean) {
    globalLoading.value = value;
  }

  function addNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = `notif-${Date.now()}`;
    notifications.value.push({ id, message, type });

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }

  return {
    globalLoading,
    notifications,
    setGlobalLoading,
    addNotification,
    removeNotification,
  };
});
