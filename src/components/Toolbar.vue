<template>
  <nav>
    <div class="nav-item">
      <n-input round size="small" placeholder="输入要搜索的内容" />
    </div>
    <div class="nav-item end-group">
      <n-button text @click="fullscreen">
        <n-icon size="20">
          <contract v-if="isFullScreen" />
          <expand v-else />
        </n-icon>
      </n-button>
      <n-avatar
        :size="30"
        round
        src="https://w.wallhaven.cc/full/nm/wallhaven-nmkv81.png"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NInput, NAvatar, NButton, NIcon } from 'naive-ui'
import { Expand, Contract } from '@vicons/ionicons5'
import { ref } from 'vue'
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
const isFullScreen = ref(false)
</script>

<style scoped lang="scss">
.nav-item {
  display: inline-block;
}
.end-group {
  display: flex;
  align-items: center;
  margin: 0 15px 0 auto;
}
nav {
  margin-left: 80px;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>
