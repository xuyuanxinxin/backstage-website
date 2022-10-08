<template>
  <aside :class="['menu', collapsed ? 'collapsed' : '']">
    <n-scrollbar>
      <div class="menu-box">
        <div class="logo-label" v-show="!collapsed">DashBoard</div>
        <div v-show="collapsed"
          :style="{ width: '64px', padding: '15px 0', display: 'flex', justifyContent: 'center' }">
          <n-icon :size="22">
            <star-of-life />
          </n-icon>
        </div>
        <n-menu ref="menuRef" accordion :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
          :render-label="renderMenuLabel" v-model:value="value" :collapsed="collapsed" />
      </div>
    </n-scrollbar>
  </aside>
  <aside :class="['main-box', collapsed ? 'collapsed' : '']">
    <tool-bar :collapsed="collapsed" @toggle-collapsed="collapsed = !collapsed" />
    <div :style="{
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '140px',
      flexWrap: 'wrap'
    }">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <div :style="{ width: '100%' }">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { NIcon, NMenu, NScrollbar, type MenuInst, type MenuOption } from 'naive-ui'
import { StarOfLife } from '@vicons/fa'
import { ToolBar } from '@/components'
import { computed, h, ref, resolveComponent, type Component } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { routes as router } from "@/router"
import { useCounterStore } from "@/stores"
import type { Tab } from '@/models'

const collapsed = ref(false)
const renderMenuIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuRef = ref<MenuInst | null>(null)

const routeInstance = useRouter()

const store = useCounterStore()
const value = computed({
  get() { return store.selectedTab },
  set(v) {
    console.log('menu select ' + v);

    const result = store.changeSelected(v)
    if (!result) {
      const routes = routeInstance.getRoutes()
      const targetRoute = routes.find(r => r.name === v) ?? routes[0]
      console.log('targetRoute: ' + targetRoute.path + " name:" + targetRoute.name?.toString());

      const newTab: Tab = {
        key: store.latestTabIndex + 1,
        name: targetRoute.name!.toString(),
        path: targetRoute.path
      }
      store.addTab(newTab)
    }
  }
})

store.$subscribe((mutations, state) => {
  menuRef.value?.showOption(store.selectedTab)
})

const filteredRoutes = router.filter(a => a.meta?.inMenu === undefined ? true : false)

const menuOptions: MenuOption[] = filteredRoutes.map(r => {
  const route = {
    label: r.name ?? r.path.replace('/', ''),
    key: r.name?.toString(),
  }
  if (r.meta && r.meta.icon) {
    Object.assign(route, {
      icon: renderMenuIcon(r.meta.icon)
    })
  }
  if (r.children && r.children.length !== 0) {
    Object.assign(route, {
      children: r.children.map(x => {
        if (r.children?.length !== 0) {
          console.log('子菜单不为空');

          r.children?.map(a => {
            return {
              label: a.name ?? "子菜单",
              key: a.name?.toString(),
              href: `${r.path}/${x.path}/${a.path}`,
            }
          }
          )
        }
        return {
          label: x.name ?? "子菜单",
          key: x.name?.toString(),
          href: `${r.path}/${x.path}`,
        }
      })
    })
  } else {
    Object.assign(route, {
      href: r.path
    })
  }
  return route
})
const renderMenuLabel = (option: MenuOption) => {
  if (option.href !== undefined) {
    return h(h(resolveComponent('router-link')), { to: option.href }, { default: () => option.label as string })
  }
  return option.label as string
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.main-box {
  min-height: 100%;
  display: inline-block;
  position: relative;
  left: 208px;
  padding: 0 15px;
  width: calc(100vw - 208px);
  background-color: #f5f5f4;

  &.collapsed {
    left: 64px;
    width: calc(100vw - 64px);
  }
}

.menu {
  position: fixed;
  z-index: 999;
  background-color: var(--main-color);
  height: 100%;
  width: 208px;
  box-shadow: 2px 0 8px #1d23290d;

  transition: width .2s ease-in-out;

  &.collapsed {
    width: 64px;
  }
}

.menu-box {
  width: 100%;
  height: 100vh;
  box-shadow: 2px 0 4px rgba(33, 33, 33, 0.2);
}


.logo-label {
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  text-align: center;
  padding: 10px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
