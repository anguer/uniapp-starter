<script setup lang="ts">
  import type { ClassValue } from 'clsx';
  import type { VariantProps } from 'class-variance-authority';
  import { buttonVariants } from '.';
  import { cn } from '@/lib/utils';

  type ButtonProps = VariantProps<typeof buttonVariants>;

  interface Props {
    variant?: NonNullable<ButtonProps>['variant'];
    size?: NonNullable<ButtonProps>['size'];
    openType?: string;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'default',
    openType: undefined,
    disabled: false,
  });

  const emits = defineEmits<{
    (event: 'click'): void;
  }>();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }

    emits('click');
  };
</script>

<template>
  <!-- FIXME: Doesn't work in mini programs -->
  <button
    :class="cn(buttonVariants({ variant, size }), ($attrs.class as ClassValue) ?? '')"
    :open-type="openType"
    :disabled="disabled"
    @tap.stop="handleClick"
  >
    <slot />
  </button>
</template>
