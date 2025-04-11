<template>
  <div :class="['jk-select', !selected && '_empty']">
    <div
      :class="['jk-select-trigger', isOpen && '_open']"
      @click="handleToggle"
    >
      <span class="jk-select-trigger_label">{{
        selected?.label || placeholder
      }}</span>
      <img
        src="../assets/icons/arrow-down.svg"
        alt=""
        class="jk-select-trigger_icon"
      />
    </div>
    <div
      :class="['jk-select-list', isOpen ? '_open' : '']"
      :style="{
        height: isOpen ? `${(options?.length || 0) * 30}px` : 0
      }"
    >
      <div
        v-for="(option, idx) in options"
        :key="idx"
        :class="[
          'jk-select-list_option',
          selected?.value === option.value && '_selected'
        ]"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISelectOption } from '@/types/select'
import { computed, ref } from 'vue'

interface IProps {
  modelValue?: string | number | null
  options?: ISelectOption[]
  defaultOpen?: boolean
  closeOnSelect?: boolean
  placeholder?: string
  enableSecondNull?: boolean
}

interface IEmits {
  (event: 'update:modelValue', value?: string | number): void
}

const props = withDefaults(defineProps<IProps>(), {
  closeOnSelect: true,
  placeholder: 'Select',
  enableSecondNull: true
})
const emit = defineEmits<IEmits>()

const isOpen = ref(props.defaultOpen)

const selected = computed(() =>
  props.options?.find((option) => option.value === props.modelValue)
)

const handleToggle = () => (isOpen.value = !isOpen.value)

const handleSelect = (value: string) => {
  const isSameValue = props.modelValue === value

  if (props.closeOnSelect && !isSameValue) handleToggle()
  emit(
    'update:modelValue',
    props.enableSecondNull && isSameValue ? undefined : value
  )
}
</script>

<style scoped lang="scss">
.jk-select {
  position: relative;
  max-width: 200px;
  min-width: 200px;
  &._empty {
    .jk-select-trigger {
      &_label {
        color: $color-dark-cc;
      }
    }
  }
  &-trigger {
    width: 100%;
    border: 2px solid $color-secondary;
    padding: 4px 8px;
    font-size: $text-xl;
    background: $color-gray-light;
    color: $color-dark;
    border-radius: $radius-base;
    cursor: pointer;
    min-height: 33px;
    transition: all $duration-min;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_label {
      max-width: 90%;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      border-color: $color-primary;
    }
    &._open {
      border-color: $color-primary;
      & > img {
        transform: rotate(180deg);
      }
    }
    &_icon {
      max-width: 18px;
      transition: all $duration-base;
    }
  }
  &-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: $shadow-box;
    left: 0%;
    top: calc(100% + 4px);
    border-radius: 4px;
    background: $color-gray-light;
    overflow: hidden;
    transition: all $duration-base;
    &_option {
      padding: 6px 8px;
      cursor: pointer;
      transition: all $duration-base;
      &:hover {
        background: $color-primary-cc;
      }
      &._selected {
        background: $color-primary;
      }
    }
  }
}
</style>
