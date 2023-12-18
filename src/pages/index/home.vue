<template>
  <theme-provider class-name="flex flex-col items-center justify-center gap-y-5 p-5">
    <image class="h-[6.25rem] w-[6.25rem] mt-16 mb-5" src="/static/logo.png" />
    <text class="text-base text-sky-400">Current Count: {{ counter.count }}</text>
    <button :class="cn(buttonVariants({ variant: 'default' }))" @tap.stop="increment">
      <text class="i-lucide-loader-2 mr-2 animate-spin"></text>
      Increment
    </button>
  </theme-provider>
</template>

<script setup lang="ts">
  import { useCounterStore } from '@/stores/counter';
  import { buttonVariants } from '@/components/ui/button';
  import { cn } from '@/lib/utils';
  import ThemeProvider from '@/components/theme-provider/theme-provider.vue';

  const counter = useCounterStore();
  counter.count++;
  counter.$patch({ count: counter.count + 1 });
  counter.increment();

  const { increment } = counter;
</script>
