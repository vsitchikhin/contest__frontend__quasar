import { ref, watch, Ref, UnwrapRef, onMounted, onUnmounted } from 'vue';

export function useLocalStorage<T>(key: string, defaultValue: T | null = null): Ref<T | null> {
  const value = ref(defaultValue);
  const read = () => {
    const v = window.localStorage.getItem(key);

    if (v !== null) {
      value.value = JSON.parse(v) as UnwrapRef<T>;
    }
  };

  read();

  onMounted(() => {
    window.addEventListener('storage', read);
  });

  onUnmounted(() => {
    window.removeEventListener('storage', read);
  });

  const write = () => {
    window.localStorage.setItem(key, JSON.stringify(value.value));
  };

  watch([value], write, { deep: true });

  return value as Ref<T | null>;
}
