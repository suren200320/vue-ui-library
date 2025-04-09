<template>
  <div class="checkbox">
    <input type="checkbox" :class="['checkbox-default',]" v-model="checked">
    <div :class="['checkbox-custom', checked && 'checked', size]" @click="handleCheck">
      <img src="../assets/icons/check.svg" v-if="checked" class="checkbox-custom-checkmark">
    </div>
    <label for="" class="checkbox-label">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import type { ICheckBoxProps } from '../types/checkbox';

const checked = ref(false);

withDefaults(defineProps<ICheckBoxProps>(), {
  size: 'sm'
})

const handleCheck = () => {
  checked.value = !checked.value;
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;

  &-default {
    display: none;
  }

  &-custom {
    border: 1px solid $color-primary;
    border-radius: 2px;
    position: relative;

    &.sm{
      width: $box-sm;
      height: $box-sm;
    }

    &.base{
      width: $box-base;
      height: $box-base;
    }

    &.xl{
      width: $box-xl;
      height: $box-xl;
    }

    &.checked {
      background: $color-primary;
    }

    &-checkmark {
      position: absolute;
      top: -1px;
      left: -2px;
      color: $color-light;
    }
  }

  &-label {
    font-family: $font-main;
    font-size: $text-sm;
    font-weight: 400;
  }
}
</style>