<template>
  <view :class="cn(theme, (props.className as ClassValue) ?? '')" :style="styleObj" :data-theme="theme">
    <slot />
  </view>
</template>
<script setup lang="ts">
  import type { ClassValue } from 'clsx';
  import { cn } from '@/lib/utils';
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore();

  const { theme } = storeToRefs(appStore);

  interface Props {
    // mode: string;
    vars: Record<any, any>;
    className: ClassValue;
  }

  const props = withDefaults(defineProps<Props>(), {
    // mode: 'dark',
    vars: undefined,
    className: '',
  });

  const styleObj = computed(() => {
    return Object.assign({}, props.vars);
  });
</script>
