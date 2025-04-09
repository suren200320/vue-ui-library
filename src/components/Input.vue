<template>
  <label :class="['input', error && 'error']">
    <div v-if="label">{{ label }}</div>
    <div class="input-wrapper">
      <input
        :type="convertedType"
        class="input-wrapper_base"
        @input="handleChange"
      />
      <button
        v-if="type === 'password'"
        class="input-wrapper-show"
        @click="handleToggleShow"
      >
        <img
          :src="isPassShow ? EyeIcon : EyeHideIcon"
          class="input-wrapper-show_icon"
        />
      </button>
    </div>
    <span v-if="error && errorMessage" class="input-base_errorMessage">{{
      errorMessage
    }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EyeIcon from '../assets/icons/eye.svg'
import EyeHideIcon from '../assets/icons/eye-hide.svg'
import type { TInputType } from '../types/input'

interface IProps {
  type?: TInputType
  label?: string
  errorMessage?: string
  error?: boolean
  modelValue?: string
}

interface IEmits {
  (event: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text'
})
const emit = defineEmits<IEmits>()

const isPassShow = ref(false)

const convertedType = computed(() =>
  props.type !== 'password'
    ? props.type
    : isPassShow.value
    ? 'text'
    : 'password'
)

const handleChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

const handleToggleShow = () => (isPassShow.value = !isPassShow.value)
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.error {
    .input-wrapper_base {
      border-color: $color-red;
    }

    .input-base_errorMessage {
      color: $color-red;
    }
  }

  .input-wrapper {
    position: relative;

    &_base {
      width: 100%;
      border: 2px solid $color-dark;
      border-radius: $radius-base;
      padding: 5.6px 8px;
      font-size: $text-base;

      &:focus {
        border-color: $color-primary;
      }
    }

    &-show {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      cursor: pointer;
      padding: 3px;
      transition: all 0.2s ease;
      :hover {
        border-radius: 50%;
        background: $color-light;
      }
      &_icon {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
  }

  .input-base_errorMessage {
    font-size: $text-sm;
    margin-top: 4px;
  }
}
</style>
