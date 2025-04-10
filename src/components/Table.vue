<template>
  <div class="jk-table_wrapper">
    <table class="jk-table_wrapper-table">
      <thead class="jk-table_wrapper-table_head">
        <tr class="jk-table_wrapper-table_head-tr">
          <th
            v-for="(head, idx) in headers"
            :key="idx"
            :class="['jk-table_wrapper-table_head-tr_th', head.align || 'left']"
          >
            {{ head.title || head.key }}
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
              v-for="(row, idx) in headers"
              :key="idx"
              :class="['jk-table_wrapper-table_body-tr_td', row.align]"
            >
              {{ item[row.key] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { ITableHead } from '@/types/table'

interface IProps<T> {
  items: T[]
  headers: ITableHead<T>[]
  selectable?: boolean
}

withDefaults(defineProps<IProps<T>>(), {
  items: () => [],
  headers: () => []
})
</script>

<style lang="scss">
.jk-table_wrapper {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 4px);
    height: 10%;
    z-index: -2;
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
    }
    &_body {
      tr {
        td {
          padding: 8px;
          border-bottom: 2px solid $color-secondary;
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
      }
      tr {
        td.left {
          text-align: left;
        }
        td.right {
          text-align: right;
        }
      }
    }
  }
}
</style>
