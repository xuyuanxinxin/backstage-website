import type { Tab } from '@/models'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    visitedTabs: [
      {
        key: 0,
        name: '主页',
        path: '/dashboard',
      },
      {
        key: 1,
        name: '数据表格',
        path: '/dataView',
      },
    ],
    selectedTab: '主页',
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    latestTabIndex: (state) =>
      state.visitedTabs[state.visitedTabs.length - 1].key,
  },
  actions: {
    increment() {
      this.counter++
    },
    addTab(tab: Tab) {
      this.visitedTabs.push(tab)
      this.selectedTab = tab.name
      console.log(`添加Tab并重新设置selected${tab.name}`)
      console.log(`设置后的selectedTab ${this.selectedTab}`)
    },
    changeSelected(name: string) {
      if (this.visitedTabs.some((a) => a.name === name)) {
        this.selectedTab = name
        return true
      }
      return false
    },
    removeSelectedTab(name: string) {
      const index = this.visitedTabs.findIndex((v, i, o) => v.name === name)
      const nextTab = this.visitedTabs[index - 1 < 0 ? index + 1 : index - 1]
      if (this.selectedTab === name) {
        this.selectedTab = nextTab.name
      }
      this.visitedTabs.splice(index, 1)
    },
  },
})
