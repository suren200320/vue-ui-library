<template>
  <div class="checkbox" @click="handleCheck">
    <input type="checkbox" class="checkbox-default hidden" :checked="isChecked" @change="handleCheck">
    <div :class="['checkbox-custom', isChecked && 'checked', size, side]">
      <img src="../assets/icons/check.svg" v-if="modelValue" class="checkbox-custom-checkmark">
    </div>
    <label :class="['checkbox-label', side]">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import type { TBoxSize, TSide } from '../types/main';

interface IProps {
  value: string | boolean;
  modelValue: string[] | boolean;
  size?: TBoxSize;
  side?: TSide;
  label?: string;
}

interface IEmits {
  (event: 'update:modelValue', value: boolean | string[]): void
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();


const isChecked = computed(() => Array.isArray(props.modelValue) && typeof props.value === 'string' ? props.modelValue.includes(props.value) : props.modelValue)

const handleCheck = () => {
  if(Array.isArray(props.modelValue) && typeof props.value === 'string') {
    
    const updated = props.modelValue.includes(props.value) ? props.modelValue.filter(item => item !== props.value) : [...props.modelValue, props.value] 
    emit('update:modelValue', updated);
  } else {
    emit('update:modelValue', !props.modelValue);
    
  }
};
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

    &.sm {
      width: $box-sm;
      height: $box-sm;
    }

    &.base {
      width: $box-base;
      height: $box-base;
    }

    &.xl {
      width: $box-xl;
      height: $box-xl;
    }

    &.left {
      order: 2;
    }

    &.right {
      order: 1;
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
    cursor: pointer;

    &.left {
      order: 1;
    }

    &.right {
      order: 2;
    }
  }
}
</style>