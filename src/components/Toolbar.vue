<template>
  <nav v-once>
    <div class="nav-item">
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="tool-item" @click="$emit('toggle-collapsed')">
            <n-icon :size="25" class="collapsed-btn">
              <menu-fold-outlined v-show="!collapsed" />
              <menu-unfold-outlined v-show="collapsed" />
            </n-icon>
          </div>
        </template>
        {{  collapsedTooltip  }}
      </n-tooltip>
    </div>
    <div class="end-group" @click="fullscreen">
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="tool-item">
            <n-icon size="20">
              <expand-arrows-alt v-if="isFullScreen" />
              <expand v-else />
            </n-icon>
          </div>
        </template>
        {{  fullScreenTooltip  }}
      </n-tooltip>

      <n-dropdown :options="options" :on-select="dropDownSelect">
        <div class="tool-item">
          <n-avatar :size="30" round src="/src/assets/avatar-gd78f147b3_1280.png" />
        </div>
      </n-dropdown>
    </div>
  </nav>
  <div class="tab-box">
    <n-tabs type="card" :default-value="panels[0].name" :value="currentValue" @update:value="updateTab" :closable="true"
      @close="closeTab">
      <n-tab v-for="panel in panels" :key="panel.key" :name="panel.name" v-context-menu="mOptions">
        {{  panel.name  }}
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NIcon, NTooltip, NDropdown, useMessage, NTabs, NTab } from 'naive-ui'
import { Expand, ExpandArrowsAlt, User, SignOutAlt } from '@vicons/fa'
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@vicons/antd"
import { computed, ref, h, type Component, reactive } from 'vue'
import type { DropdownMixedOption, DropdownOption } from 'naive-ui/es/dropdown/src/interface'
import { useRouter } from 'vue-router';
import type { Tab } from '@/models';
import { useCounterStore } from '@/stores/counter';
import type { TabOption } from '@/global'
const router = useRouter()
const msg = useMessage()
const store = useCounterStore()
const props = defineProps({
  collapsed: Boolean
})
defineEmits(['toggle-collapsed'])

const callback = (v: string) => {
  console.log(v)
  msg.success(`${v} clicked`)
}
const mOptions: TabOption[] =
  [
    {
      key: 'close-one',
      label: '关闭',
      callback: (v: string) => {
      }
    }, {
      key: 'close-all',
      label: '关闭所有',
      callback
    }
  ]
const dropDownOptions = ref([
  {
    label: 'test1',
    key: 'test1',
  },
  {
    label: 'test2',
    key: 'test2'
  },
  {
    label: 'test3',
    key: 'test3'
  }
])
const panels = reactive<Array<Tab>>(store.visitedTabs)
const currentValue = computed(() => {
  if (panels.length > 1) {
    const path = panels.find(x => x.name === store.selectedTab)!.path
    router.push(path)
  }
  return store.selectedTab
})

store.$subscribe((mutations, state) => {
  const path = router.getRoutes().find(v => v.name === state.selectedTab)!.path
  router.push(path)
})

const updateTab = (v: string) => {
  const selectedTab = panels.find((x: Tab) => x.name === v)
  store.changeSelected(selectedTab!.name)
  router.push(selectedTab!.path)
}

const closeTab = (name: string) => {
  if (panels.length === 1) {
    return
  }
  store.removeSelectedTab(name)
}
const fullscreen = () => {
  if (!document.fullscreenElement) {
    isFullScreen.value = true
    document.documentElement.requestFullscreen()
  } else {
    isFullScreen.value = false
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const options: DropdownMixedOption[] = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(User),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(SignOutAlt),
  },
]
const isFullScreen = ref(false)
const collapsedTooltip = computed(() => props.collapsed ? '展开' : '收起')
const fullScreenTooltip = computed(() =>
  isFullScreen.value ? '取消全屏' : '全屏显示'
)
const dropDownSelect = (key: string, option: DropdownOption) => {
  console.log(key, option);
  if (key === 'logout') {
    msg.success(
      '登出成功',
      {
        duration: 1000
      }
    )
    setTimeout(() => {
      router.push('/login')
    }, 500);
  }
}
</script>

<style scoped lang="scss">
.nav-item {
  height: 100%;
  display: flex;
  align-items: center;

  div:first-child {
    margin-right: 15px;
  }
}

.end-group {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 15px 0 auto;
}

.tool-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;

  &:hover {
    background-color: rgb(246, 246, 246);
    cursor: pointer;
  }
}

nav {
  background-color: var(--main-color);
  padding: 0 15px;
  box-shadow: 0 1px 5px -3px #8f8f8f;
  top: 0;
  height: 60px;
  z-index: 998;
  align-items: center;
  display: flex;
}

nav,
.tab-box {
  width: inherit;
  left: inherit;
  position: fixed;
}

.tab-box {
  margin-top: 60px;
  background-color: #fff;
  z-index: 2;
  padding: 10px 0 0 10px;
}

.collapsed-btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
