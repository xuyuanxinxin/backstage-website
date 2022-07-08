<template>
  <nav>
    <div class="nav-item">
      <n-input size="small" placeholder="输入要搜索的内容" />
    </div>
    <div class="end-group">
      <div class="tool-item">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="" @click="fullscreen">
              <n-icon size="20">
                <expand-arrows-alt v-if="isFullScreen" />
                <expand v-else />
              </n-icon>
            </div>
          </template>
          {{ fullScreenTooltip }}
        </n-tooltip>
      </div>
      <div class="tool-item">
        <n-dropdown :options="options">
          <n-avatar
            :size="30"
            round
            src="https://w.wallhaven.cc/full/nm/wallhaven-nmkv81.png"
          />
        </n-dropdown>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NInput, NAvatar, NIcon, NTooltip, NDropdown } from 'naive-ui'
import { Expand, ExpandArrowsAlt, User, SignOutAlt } from '@vicons/fa'
import { computed, ref, h, type Component } from 'vue'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
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
const fullScreenTooltip = computed(() =>
  isFullScreen.value ? '取消全屏' : '全屏显示'
)
</script>

<style scoped lang="scss">
.nav-item {
  height: 100%;
  display: flex;
  align-items: center;
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
  background-color: #fff;
  padding: 0 15px;
  width: calc(100% - 208px);
  position: fixed;
  top: 0;
  left: 208px;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>
