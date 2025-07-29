<script setup lang="ts">
import type { ButtonVariants } from '../../ui';
import type { KrisButtonProps } from './button';

import { computed, useSlots } from 'vue';

import { cn } from '@kris-core/shared/utils';

import { KrisTooltip } from '../tooltip';
import KrisButton from './button.vue';

interface Props extends KrisButtonProps {
  class?: any;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
});

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <KrisButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </KrisButton>

  <KrisTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <template #trigger>
      <KrisButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </KrisButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"> </slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </KrisTooltip>
</template>
