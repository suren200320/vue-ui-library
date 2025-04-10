import type { TSide } from './main'

export interface ITableHead<T> {
  title?: string
  align?: TSide
  key: keyof T
}
