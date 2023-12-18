import { defineStore } from 'pinia';
import type { Ref } from 'vue';

interface State {
  theme: Ref<string>;
}

export const useAppStore = defineStore('counter', (): State => {
  const theme = ref(uni.getSystemInfoSync().theme || 'light');

  const onThemeChange = (res: UniNamespace.OnThemeChangeCallbackResult) => {
    console.log('[onThemeChange]', res.theme);
    theme.value = res.theme;
  };

  onMounted(() => {
    uni.onThemeChange(onThemeChange);
  });

  return { theme };
});
