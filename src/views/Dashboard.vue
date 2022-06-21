<template>
  <div class="container">
    <aside class="menu">
      <div class="logo-label">DashBoard</div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-icon="renderMenuIcon"
        :render-label="renderMenuLabel"
      />
    </aside>
    <aside class="main-box">
      <Toolbar />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NMenu, type MenuOption } from 'naive-ui'
import Toolbar from '@/components/Toolbar.vue'
import { h, ref } from 'vue'

const collapsed = ref(false)
const menuOptions: MenuOption[] = [
  {
    label: '菜单1',
    key: 'menu1',
    href: '/login',
  },
  {
    label: '菜单2',
    key: 'menu2',
    children: [
      {
        label: '菜单2-1',
        key: 'menu2-1',
      },
      {
        label: '菜单2-2',
        key: 'menu2-2',
      },
    ],
  },
  {
    label: '菜单3',
    key: 'menu3',
    children: [
      {
        label: '菜单3-1',
        key: 'menu3-1',
      },
      {
        label: '菜单3-2',
        key: 'menu3-2',
      },
    ],
  },
  {
    label: '菜单4',
    key: 'menu4',
    children: [
      {
        label: '菜单4-1',
        key: 'menu4-1',
      },
      {
        label: '菜单4-2',
        key: 'menu4-2',
      },
    ],
  },
]
const renderMenuIcon = (option: MenuOption) => {
  if (option.icon !== null) {
    return h(NIcon, null)
  }
}
const renderMenuLabel = (option: MenuOption) => {
  if (option.href !== undefined) {
    return h('a', { href: option.href }, option.label as string)
  }
  return option.label as string
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
}
.menu,
.main-box {
  display: inline-block;
  height: 100vh;
}
.menu {
  width: 208px;
  background-color: #ffffff;
}
.main-box {
  width: calc(100vw - 208px);
  background-color: #f5f5f4;
}
.logo-label {
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  text-align: center;
}
</style>
