<template>
  <aside class="menu">
    <div class="menu-box">
      <div class="logo-label">
        <n-icon>
          <star-of-life />
        </n-icon>
        <span :style="{ marginLeft: '15px' }">DashBoard</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
      />
    </div>
  </aside>
  <aside class="main-box">
    <ToolBar />
    <div :style="{ marginTop: '80px' }">
      <router-view></router-view>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NIcon, NMenu } from 'naive-ui'
import { ToolBar } from '@/components'
import { RouterLink } from 'vue-router'
import { h, ref, resolveComponent } from 'vue'
import {
  Cog,
  Cube,
  Desktop,
  GreaterThanEqual as Terminal,
  StarOfLife,
} from '@vicons/fa'
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
const collapsed = ref(false)
const menuOptions: MenuOption[] = [
  {
    label: '菜单1',
    key: 'menu1',
    href: '/',
    icon: renderMenuIcon(Cube),
  },
  {
    label: '菜单2',
    key: 'menu2',
    icon: renderMenuIcon(Desktop),
    children: [
      {
        label: '菜单2-1',
        key: 'menu2-1',
        href: '/dashboard',
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
    icon: renderMenuIcon(Terminal),
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
    icon: renderMenuIcon(Cog),
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
function renderMenuIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const renderMenuLabel = (option: MenuOption) => {
  if (option.href !== undefined) {
    return h(
      h(resolveComponent('router-link')),
      { to: option.href, style: 'display: block; padding-left:15px' },
      { default: () => option.label as string }
    )
  }
  return h(
    'div',
    { style: 'display: block; padding-left: 16px' },
    option.label as string
  )
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
nav {
  z-index: 998;
}
.menu {
  width: 208px;
  position: fixed;
  z-index: 999;
  background-color: white;
  height: 100%;
  // box-shadow: 2px 0 8px rgba(33, 33, 33, 0.15);
  box-shadow: 2px 0 8px #1d23290d;
}
.menu-box {
  width: 100%;
  height: 100%;
}
.main-box {
  display: inline-block;
  position: relative;
  padding: 0 15px;
  left: 208px;
  min-height: 100%;
  width: calc(100% - 208px);
  background-color: #f5f5f4;
  padding-bottom: 150px;
}
.logo-label {
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
