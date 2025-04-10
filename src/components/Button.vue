<template>
  <button :class="['button', btnClassNames[variant]]">
    <div class="button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { TButtonVariant } from '../types/button'
import { btnClassNames } from '../utils/constants/button'

interface IProps {
  variant?: TButtonVariant
}

withDefaults(defineProps<IProps>(), {
  variant: 'filled'
})
</script>

<style scoped lang="scss">
.button {
  cursor: pointer;
  color: $color-dark;
  position: relative;
  font-family: $font-main;
  font-size: $text-xl;
  transition: transform 0.1s ease, background $duration-base,
    border-color $duration-base, color $duration-base;

  &-content {
    position: relative;
    z-index: 2;
  }

  &.spacings {
    padding: 4px 8px;
  }

  &.filled,
  &.outlined {
    border-radius: $radius-base;
    border: 2px solid $color-primary;
  }

  &:active {
    transform: scale(0.9);
  }

  &.filled {
    background: $color-primary;
  }

  &.text {
    position: relative;
    font-weight: 500;
    &::after {
      content: '';
      position: absolute;
      top: 130%;
      left: 0;
      width: 100%;
      height: 2px;
      background: $color-primary;
      transition: all $duration-base ease;
      opacity: 0;
    }
    &:hover::after {
      top: 100%;
      opacity: 1;
    }
  }

  &.filled:hover {
    background: $color-secondary;
    border-color: $color-secondary;
    color: $color-light;
  }

  &.outlined:hover {
    background: $color-primary;
  }
}
</style>
