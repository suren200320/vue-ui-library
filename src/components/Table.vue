<template>
  <div class="jk-table_wrapper">
    <table class="jk-table_wrapper-table">
      <thead class="jk-table_wrapper-table_head">
        <tr class="jk-table_wrapper-table_head-tr">
          <th
            v-for="(head, idx) in convertedHeaders"
            :key="idx"
            :class="[
              'jk-table_wrapper-table_head-tr_th',
              head.align || 'left',
              head.key === 'select-action' ? 'action' : ''
            ]"
          >
            <div
              @click="() => head.key === 'select-action' && handleSelectAll()"
            >
              {{ head.title || head.key }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="jk-table_wrapper-table_body">
        <template v-if="$slots.item">
          <slot
            v-for="(item, index) in items"
            name="item"
            :item="item"
            :index="index"
            :key="index"
            class="jk-table_wrapper-table_body-tr"
          >
          </slot>
        </template>
        <template v-else>
          <tr
            v-for="(item, idx) in items"
            :key="idx"
            class="jk-table_wrapper-table_body-tr"
          >
            <td
              v-for="(row, idx) in convertedHeaders"
              :key="idx"
              :class="[
                'jk-table_wrapper-table_body-tr_td',
                row.key === 'select-action' ? 'right' : row.align
              ]"
            >
              <div>
                <template v-if="row.key === 'select-action' && uniqueKey">
                  <Checkbox
                    v-model="_selecteds"
                    :value="String(item[uniqueKey])"
                    @update:model-value="handleSelect"
                  />
                </template>
                <template v-else>
                  {{ item[row.key] }}
                </template>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { ITableHead } from '@/types/table'
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'

interface IProps<T> {
  items: T[]
  headers: ITableHead<T>[]
  selectable?: boolean
  uniqueKey?: keyof T
  selecteds?: string[]
}

interface IEmits {
  (event: 'update:selecteds', data: string[]): void
}

const emit = defineEmits<IEmits>()

const props = withDefaults(defineProps<IProps<T>>(), {
  items: () => [],
  headers: () => [],
  modelSelecteds: () => []
})

const _selecteds = computed({
  get: () => props.selecteds || [],
  set: (val: string[]) => emit('update:selecteds', val)
})
const convertedHeaders = computed((): ITableHead<T>[] =>
  props.selectable
    ? [...props.headers, { key: 'select-action' as keyof T, align: 'right' }]
    : props.headers
)

const handleSelect = (data: string[] | boolean) => {
  if (Array.isArray(data)) {
    emit('update:selecteds', data)
  }
}
const handleSelectAll = () => {
  const { uniqueKey } = props
  if (uniqueKey) {
    const data: string[] = props.items.map((item) => String(item[uniqueKey]))
    if (_selecteds.value.length === data.length) emit('update:selecteds', [])
    else emit('update:selecteds', data)
  }
}
</script>

<style lang="scss">
.jk-table_wrapper {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 3px;
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: calc(100% - 4px);
    height: 10%;
    border: 2px solid $color-secondary;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top: 0px;
  }
  &-table {
    font-family: $font-main;
    width: 100%;
    border-collapse: collapse;
    &_head {
      tr {
        th {
          text-transform: capitalize;
          border-bottom: 2px solid $color-primary;
          border-top: 2px solid $color-primary;
          padding: 10px 8px;
          background: $color-primary;
          font-weight: 500;
          font-size: $text-xl;
        }
        th:first-child {
          border-left: 2px solid $color-primary;
        }
        th:last-child {
          border-right: 2px solid $color-primary;
        }
        th.left {
          text-align: left;
        }
        th.right {
          text-align: right;
        }
      }
      th.action {
        & > div {
          width: max-content;
          justify-self: end;
          cursor: pointer;
          transition: color $duration-base;
        }
        & > div:hover {
          color: #fff;
        }
      }
    }
    &_body {
      tr {
        transition: background $duration-base;
        &:hover {
          background: $color-gray-base;
        }
        td {
          padding: 8px;
          position: relative;
          z-index: 10;
          border-bottom: 2px solid $color-secondary;
          & > div {
            display: flex;
          }
        }
        td:first-child {
          border-left: 2px solid $color-secondary;
        }
        td:last-child {
          border-right: 2px solid $color-secondary;
        }
      }
      tr:last-child {
        td {
          border: 0px;
        }
        td:first-child {
          border-bottom-left-radius: 10px;
        }
        td:last-child {
          border-bottom-right-radius: 10px;
        }
      }
      tr {
        td.left {
          & > div {
            justify-content: start;
          }
        }
        td.right {
          & > div {
            justify-content: end;
          }
        }
      }
    }
  }
}
</style>
