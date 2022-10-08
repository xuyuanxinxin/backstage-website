import type { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'

export declare global {
  interface Window {
    loading: LoadingBarInst
  }
}

export interface TabOption {
  key: string
  label: string
  callback: (v: string) => void
}
