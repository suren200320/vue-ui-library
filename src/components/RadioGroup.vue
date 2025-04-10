<template>
  <div class="group">
    <div v-if="label" class="group-label">{{ label }}</div>
    <div :class="['group-list', orientation]">
      <label v-for="(item, idx) in items" :key="idx"
        :class="['group-list-item', item.value === modelValue && 'checked']">
        <input type="radio" :id="`${id}-${item.key}`" :name="id" class="group-list-item_input"
          :checked="item.value === modelValue" @change="handleChange(item.value)" />
        <div :class="['group-list-item_box', size]">
          <div class="group-list-item_box_circle"></div>
        </div>
        <div class="group-list-item_label">{{ item.label }}</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TBoxSize, TOrientation } from '../types/main'
import type { IRadioItem } from '../types/radio'

interface IProps {
  id: string
  label?: string
  items?: IRadioItem[]
  modelValue?: string
  size?: TBoxSize
  orientation?: TOrientation
}

interface IEmits {
  (event: 'update:modelValue', value: string): void
}

withDefaults(defineProps<IProps>(), {
  orientation: 'horizontal',
  size: 'sm'
})

const emit = defineEmits<IEmits>()

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-list {
    display: flex;
    gap: 8px;

    &-item {
      display: flex;
      gap: 4px;
      align-items: center;

      &_input {
        display: none;
      }

      &_box {
        position: relative;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: 2px solid $color-dark;

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

        &_circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: $color-primary;
          opacity: 0;
        }
      }

      &_label {
        transition: 0.2s;
      }

      &:hover {
        .group-list-item_label {
          color: $color-primary;
        }
      }

      &.checked {
        .group-list-item_box_circle {
          opacity: 1;
        }
      }
    }
  }

  &-list.vertical {
    flex-direction: column;
  }
}
</style>
